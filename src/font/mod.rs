// SPDX-License-Identifier: MIT OR Apache-2.0
pub(crate) mod fallback;

use core::fmt;

use alloc::collections::BTreeMap;
use alloc::sync::Arc;
#[cfg(not(feature = "std"))]
use alloc::vec::Vec;

use rustybuzz::Face as RustybuzzFace;
use self_cell::self_cell;

pub use self::system::*;
mod system;

self_cell!(
    struct OwnedFace {
        owner: Arc<dyn AsRef<[u8]> + Send + Sync>,

        #[covariant]
        dependent: RustybuzzFace,
    }
);

/// A font
pub struct Font {
    #[cfg(feature = "swash")]
    swash: (u32, swash::CacheKey),
    rustybuzz: OwnedFace,
    data: Arc<dyn AsRef<[u8]> + Send + Sync>,
    id: fontdb::ID,
    monospace_em_width: Option<f32>,
    // Populated for Monospace fonts only
    scripts: Vec<[u8; 4]>,
    // Populated for Monospace fonts only
    unicode_codepoints: Vec<u32>,
    // Populated for Monospace fonts only
    box_mirror_glyph_ids: BTreeMap<u16, u16>,
}

impl fmt::Debug for Font {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("Font")
            .field("id", &self.id)
            .finish_non_exhaustive()
    }
}

impl Font {
    pub fn id(&self) -> fontdb::ID {
        self.id
    }

    pub fn monospace_em_width(&self) -> Option<f32> {
        self.monospace_em_width
    }

    pub fn scripts(&self) -> &[[u8; 4]] {
        &self.scripts
    }

    pub fn unicode_codepoints(&self) -> &[u32] {
        &self.unicode_codepoints
    }

    pub fn box_mirror_glyph_id(&self, box_glyph_id: u16) -> Option<u16> {
        self.box_mirror_glyph_ids.get(&box_glyph_id).copied()
    }

    pub fn data(&self) -> &[u8] {
        (*self.data).as_ref()
    }

    pub fn rustybuzz(&self) -> &RustybuzzFace<'_> {
        self.rustybuzz.borrow_dependent()
    }

    #[cfg(feature = "swash")]
    pub fn as_swash(&self) -> swash::FontRef<'_> {
        let swash = &self.swash;
        swash::FontRef {
            data: self.data(),
            offset: swash.0,
            key: swash.1,
        }
    }
}

impl Font {
    pub fn new(db: &fontdb::Database, id: fontdb::ID) -> Option<Self> {
        const MIRRORABLE_BOX_PAIRS: &[(u32, u32)] = &[
            (0x250c, 0x2510),
            (0x250d, 0x2511),
            (0x250e, 0x2512),
            (0x250f, 0x2513),
            (0x2514, 0x2518),
            (0x2515, 0x2519),
            (0x2516, 0x251a),
            (0x2517, 0x251b),
            (0x251c, 0x2524),
            (0x251d, 0x2525),
            (0x251e, 0x2526),
            (0x251f, 0x2527),
            (0x2520, 0x2528),
            (0x2521, 0x2529),
            (0x2522, 0x252a),
            (0x2523, 0x252b),
            (0x252d, 0x252e),
            (0x2531, 0x2532),
            (0x2535, 0x2536),
            (0x2539, 0x253a),
            (0x253d, 0x253e),
            (0x2543, 0x2544),
            (0x2545, 0x2546),
            (0x2549, 0x254a),
            (0x2552, 0x2555),
            (0x2553, 0x2556),
            (0x2554, 0x2557),
            (0x2558, 0x255b),
            (0x2559, 0x255c),
            (0x255a, 0x255d),
            (0x255e, 0x2561),
            (0x255f, 0x2562),
            (0x2560, 0x2563),
            (0x256d, 0x256e),
            (0x256f, 0x2570),
            (0x2571, 0x2572),
            (0x2574, 0x2576),
            (0x2578, 0x257a),
            (0x257c, 0x257e),
        ];

        let info = db.face(id)?;

        let (monospace_em_width, scripts, unicode_codepoints, box_mirror_glyph_ids) = {
            db.with_face_data(id, |font_data, face_index| {
                let face = ttf_parser::Face::parse(font_data, face_index).ok()?;

                if !info.monospaced {
                    None?;
                }

                let monospace_em_width = {
                    let hor_advance = face.glyph_hor_advance(face.glyph_index(' ')?)? as f32;
                    let upem = face.units_per_em() as f32;
                    Some(hor_advance / upem)
                };

                let box_mirror_glyph_ids = MIRRORABLE_BOX_PAIRS
                    .iter()
                    .filter_map(|(ch1, ch2)| {
                        let ch1 = char::from_u32(*ch1)?;
                        let ch1_g_idx = face.glyph_index(ch1)?;
                        let ch2 = char::from_u32(*ch2)?;
                        let ch2_g_idx = face.glyph_index(ch2)?;
                        Some([(ch1_g_idx.0, ch2_g_idx.0), (ch2_g_idx.0, ch1_g_idx.0)])
                    })
                    .flatten()
                    .collect::<BTreeMap<u16, u16>>();

                let scripts = face
                    .tables()
                    .gpos
                    .into_iter()
                    .chain(face.tables().gsub)
                    .flat_map(|table| table.scripts)
                    .map(|script| script.tag.to_bytes())
                    .collect();

                let mut unicode_codepoints = Vec::new();

                face.tables()
                    .cmap?
                    .subtables
                    .into_iter()
                    .filter(|subtable| subtable.is_unicode())
                    .for_each(|subtable| {
                        unicode_codepoints.reserve(1024);
                        subtable.codepoints(|code_point| {
                            if subtable.glyph_index(code_point).is_some() {
                                unicode_codepoints.push(code_point);
                            }
                        });
                    });

                unicode_codepoints.shrink_to_fit();

                Some((
                    monospace_em_width,
                    scripts,
                    unicode_codepoints,
                    box_mirror_glyph_ids,
                ))
            })?
            .unwrap_or_default()
        };

        let data = match &info.source {
            fontdb::Source::Binary(data) => Arc::clone(data),
            #[cfg(feature = "std")]
            fontdb::Source::File(path) => {
                log::warn!("Unsupported fontdb Source::File('{}')", path.display());
                return None;
            }
            #[cfg(feature = "std")]
            fontdb::Source::SharedFile(_path, data) => Arc::clone(data),
        };

        Some(Self {
            id: info.id,
            monospace_em_width,
            scripts,
            unicode_codepoints,
            box_mirror_glyph_ids,
            #[cfg(feature = "swash")]
            swash: {
                let swash = swash::FontRef::from_index((*data).as_ref(), info.index as usize)?;
                (swash.offset, swash.key)
            },
            rustybuzz: OwnedFace::try_new(Arc::clone(&data), |data| {
                RustybuzzFace::from_slice((**data).as_ref(), info.index).ok_or(())
            })
            .ok()?,
            data,
        })
    }
}
