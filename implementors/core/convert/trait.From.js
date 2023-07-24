(function() {var implementors = {
"aliasable":[["impl&lt;T: ?<a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"aliasable/boxed/struct.UniqueBox.html\" title=\"struct aliasable::boxed::UniqueBox\">Box</a>&lt;T, <a class=\"struct\" href=\"https://doc.rust-lang.org/1.71.0/alloc/alloc/struct.Global.html\" title=\"struct alloc::alloc::Global\">Global</a>&gt;&gt; for <a class=\"struct\" href=\"aliasable/boxed/struct.AliasableBox.html\" title=\"struct aliasable::boxed::AliasableBox\">AliasableBox</a>&lt;T&gt;"],["impl&lt;T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"aliasable/vec/struct.AliasableVec.html\" title=\"struct aliasable::vec::AliasableVec\">AliasableVec</a>&lt;T&gt;&gt; for <a class=\"struct\" href=\"aliasable/vec/struct.UniqueVec.html\" title=\"struct aliasable::vec::UniqueVec\">UniqueVec</a>&lt;T&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"aliasable/string/struct.AliasableString.html\" title=\"struct aliasable::string::AliasableString\">AliasableString</a>&gt; for <a class=\"struct\" href=\"aliasable/string/struct.UniqueString.html\" title=\"struct aliasable::string::UniqueString\">UniqueString</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"aliasable/string/struct.UniqueString.html\" title=\"struct aliasable::string::UniqueString\">String</a>&gt; for <a class=\"struct\" href=\"aliasable/string/struct.AliasableString.html\" title=\"struct aliasable::string::AliasableString\">AliasableString</a>"],["impl&lt;T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"aliasable/vec/struct.UniqueVec.html\" title=\"struct aliasable::vec::UniqueVec\">Vec</a>&lt;T, <a class=\"struct\" href=\"https://doc.rust-lang.org/1.71.0/alloc/alloc/struct.Global.html\" title=\"struct alloc::alloc::Global\">Global</a>&gt;&gt; for <a class=\"struct\" href=\"aliasable/vec/struct.AliasableVec.html\" title=\"struct aliasable::vec::AliasableVec\">AliasableVec</a>&lt;T&gt;"],["impl&lt;'a, T: ?<a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/core/primitive.reference.html\">&amp;'a mut T</a>&gt; for <a class=\"struct\" href=\"aliasable/prelude/struct.AliasableMut.html\" title=\"struct aliasable::prelude::AliasableMut\">AliasableMut</a>&lt;'a, T&gt;"]],
"bytemuck":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"enum\" href=\"bytemuck/enum.PodCastError.html\" title=\"enum bytemuck::PodCastError\">PodCastError</a>&gt; for <a class=\"enum\" href=\"bytemuck/checked/enum.CheckedCastError.html\" title=\"enum bytemuck::checked::CheckedCastError\">CheckedCastError</a>"]],
"memmap2":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"memmap2/struct.MmapMut.html\" title=\"struct memmap2::MmapMut\">MmapMut</a>&gt; for <a class=\"struct\" href=\"memmap2/struct.MmapRaw.html\" title=\"struct memmap2::MmapRaw\">MmapRaw</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"memmap2/struct.Mmap.html\" title=\"struct memmap2::Mmap\">Mmap</a>&gt; for <a class=\"struct\" href=\"memmap2/struct.MmapRaw.html\" title=\"struct memmap2::MmapRaw\">MmapRaw</a>"]],
"slotmap":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"slotmap/struct.KeyData.html\" title=\"struct slotmap::KeyData\">KeyData</a>&gt; for <a class=\"struct\" href=\"slotmap/struct.DefaultKey.html\" title=\"struct slotmap::DefaultKey\">DefaultKey</a>"]],
"smallvec":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.71.0/core/alloc/layout/struct.LayoutError.html\" title=\"struct core::alloc::layout::LayoutError\">LayoutError</a>&gt; for <a class=\"enum\" href=\"smallvec/enum.CollectionAllocErr.html\" title=\"enum smallvec::CollectionAllocErr\">CollectionAllocErr</a>"],["impl&lt;A: <a class=\"trait\" href=\"smallvec/trait.Array.html\" title=\"trait smallvec::Array\">Array</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;A&gt; for <a class=\"struct\" href=\"smallvec/struct.SmallVec.html\" title=\"struct smallvec::SmallVec\">SmallVec</a>&lt;A&gt;"],["impl&lt;A: <a class=\"trait\" href=\"smallvec/trait.Array.html\" title=\"trait smallvec::Array\">Array</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.71.0/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;&lt;A as <a class=\"trait\" href=\"smallvec/trait.Array.html\" title=\"trait smallvec::Array\">Array</a>&gt;::<a class=\"associatedtype\" href=\"smallvec/trait.Array.html#associatedtype.Item\" title=\"type smallvec::Array::Item\">Item</a>, <a class=\"struct\" href=\"https://doc.rust-lang.org/1.71.0/alloc/alloc/struct.Global.html\" title=\"struct alloc::alloc::Global\">Global</a>&gt;&gt; for <a class=\"struct\" href=\"smallvec/struct.SmallVec.html\" title=\"struct smallvec::SmallVec\">SmallVec</a>&lt;A&gt;"],["impl&lt;'a, A: <a class=\"trait\" href=\"smallvec/trait.Array.html\" title=\"trait smallvec::Array\">Array</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;&amp;'a [&lt;A as <a class=\"trait\" href=\"smallvec/trait.Array.html\" title=\"trait smallvec::Array\">Array</a>&gt;::<a class=\"associatedtype\" href=\"smallvec/trait.Array.html#associatedtype.Item\" title=\"type smallvec::Array::Item\">Item</a>]&gt; for <a class=\"struct\" href=\"smallvec/struct.SmallVec.html\" title=\"struct smallvec::SmallVec\">SmallVec</a>&lt;A&gt;<span class=\"where fmt-newline\">where\n    A::<a class=\"associatedtype\" href=\"smallvec/trait.Array.html#associatedtype.Item\" title=\"type smallvec::Array::Item\">Item</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a>,</span>"]],
"swash":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.unit.html\">()</a>&gt; for <a class=\"struct\" href=\"swash/struct.Attributes.html\" title=\"struct swash::Attributes\">Attributes</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"swash/struct.Stretch.html\" title=\"struct swash::Stretch\">Stretch</a>&gt; for <a class=\"struct\" href=\"swash/struct.Attributes.html\" title=\"struct swash::Attributes\">Attributes</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.char.html\">char</a>&gt; for <a class=\"struct\" href=\"swash/text/cluster/struct.CharInfo.html\" title=\"struct swash::text::cluster::CharInfo\">CharInfo</a>"],["impl&lt;T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/marker/trait.Copy.html\" title=\"trait core::marker::Copy\">Copy</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;&amp;(<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.u32.html\">u32</a>, T)&gt; for <a class=\"struct\" href=\"swash/struct.Setting.html\" title=\"struct swash::Setting\">Setting</a>&lt;T&gt;"],["impl&lt;T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/marker/trait.Copy.html\" title=\"trait core::marker::Copy\">Copy</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;&amp;(&amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.str.html\">str</a>, T)&gt; for <a class=\"struct\" href=\"swash/struct.Setting.html\" title=\"struct swash::Setting\">Setting</a>&lt;T&gt;"],["impl&lt;T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/marker/trait.Copy.html\" title=\"trait core::marker::Copy\">Copy</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;(<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.u32.html\">u32</a>, T)&gt; for <a class=\"struct\" href=\"swash/struct.Setting.html\" title=\"struct swash::Setting\">Setting</a>&lt;T&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;&amp;<a class=\"struct\" href=\"swash/text/struct.Properties.html\" title=\"struct swash::text::Properties\">Properties</a>&gt; for <a class=\"struct\" href=\"swash/text/cluster/struct.CharInfo.html\" title=\"struct swash::text::cluster::CharInfo\">CharInfo</a>"],["impl&lt;T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/marker/trait.Copy.html\" title=\"trait core::marker::Copy\">Copy</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;&amp;([<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.u8.html\">u8</a>; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.array.html\">4</a>], T)&gt; for <a class=\"struct\" href=\"swash/struct.Setting.html\" title=\"struct swash::Setting\">Setting</a>&lt;T&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.char.html\">char</a>&gt; for <a class=\"struct\" href=\"swash/text/struct.Properties.html\" title=\"struct swash::text::Properties\">Properties</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.u32.html\">u32</a>&gt; for <a class=\"struct\" href=\"swash/text/struct.Properties.html\" title=\"struct swash::text::Properties\">Properties</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"swash/text/cluster/struct.SourceRange.html\" title=\"struct swash::text::cluster::SourceRange\">SourceRange</a>&gt; for <a class=\"struct\" href=\"https://doc.rust-lang.org/1.71.0/core/ops/range/struct.Range.html\" title=\"struct core::ops::range::Range\">Range</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.usize.html\">usize</a>&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;&amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.char.html\">char</a>&gt; for <a class=\"struct\" href=\"swash/text/struct.Properties.html\" title=\"struct swash::text::Properties\">Properties</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"swash/struct.Weight.html\" title=\"struct swash::Weight\">Weight</a>&gt; for <a class=\"struct\" href=\"swash/struct.Attributes.html\" title=\"struct swash::Attributes\">Attributes</a>"],["impl&lt;T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/marker/trait.Copy.html\" title=\"trait core::marker::Copy\">Copy</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;(&amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.str.html\">str</a>, T)&gt; for <a class=\"struct\" href=\"swash/struct.Setting.html\" title=\"struct swash::Setting\">Setting</a>&lt;T&gt;"],["impl&lt;T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/marker/trait.Copy.html\" title=\"trait core::marker::Copy\">Copy</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;&amp;(&amp;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.u8.html\">u8</a>; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.array.html\">4</a>], T)&gt; for <a class=\"struct\" href=\"swash/struct.Setting.html\" title=\"struct swash::Setting\">Setting</a>&lt;T&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"swash/text/struct.Properties.html\" title=\"struct swash::text::Properties\">Properties</a>&gt; for <a class=\"struct\" href=\"swash/text/cluster/struct.CharInfo.html\" title=\"struct swash::text::cluster::CharInfo\">CharInfo</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"enum\" href=\"swash/enum.Style.html\" title=\"enum swash::Style\">Style</a>&gt; for <a class=\"struct\" href=\"swash/struct.Attributes.html\" title=\"struct swash::Attributes\">Attributes</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;&amp;<a class=\"struct\" href=\"swash/text/cluster/struct.CharInfo.html\" title=\"struct swash::text::cluster::CharInfo\">CharInfo</a>&gt; for <a class=\"struct\" href=\"swash/text/struct.Properties.html\" title=\"struct swash::text::Properties\">Properties</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"swash/text/cluster/struct.CharInfo.html\" title=\"struct swash::text::cluster::CharInfo\">CharInfo</a>&gt; for <a class=\"struct\" href=\"swash/text/struct.Properties.html\" title=\"struct swash::text::Properties\">Properties</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;&amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.u32.html\">u32</a>&gt; for <a class=\"struct\" href=\"swash/text/struct.Properties.html\" title=\"struct swash::text::Properties\">Properties</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;(<a class=\"struct\" href=\"swash/struct.Stretch.html\" title=\"struct swash::Stretch\">Stretch</a>, <a class=\"struct\" href=\"swash/struct.Weight.html\" title=\"struct swash::Weight\">Weight</a>, <a class=\"enum\" href=\"swash/enum.Style.html\" title=\"enum swash::Style\">Style</a>)&gt; for <a class=\"struct\" href=\"swash/struct.Attributes.html\" title=\"struct swash::Attributes\">Attributes</a>"]],
"tinyvec":[["impl&lt;A: <a class=\"trait\" href=\"tinyvec/trait.Array.html\" title=\"trait tinyvec::Array\">Array</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;A&gt; for <a class=\"enum\" href=\"tinyvec/enum.TinyVec.html\" title=\"enum tinyvec::TinyVec\">TinyVec</a>&lt;A&gt;"],["impl&lt;A: <a class=\"trait\" href=\"tinyvec/trait.Array.html\" title=\"trait tinyvec::Array\">Array</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;A&gt; for <a class=\"struct\" href=\"tinyvec/struct.ArrayVec.html\" title=\"struct tinyvec::ArrayVec\">ArrayVec</a>&lt;A&gt;"],["impl&lt;'s, T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;&amp;'s mut <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/core/primitive.slice.html\">[T]</a>&gt; for <a class=\"struct\" href=\"tinyvec/struct.SliceVec.html\" title=\"struct tinyvec::SliceVec\">SliceVec</a>&lt;'s, T&gt;"],["impl&lt;'s, T, A&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/core/primitive.reference.html\">&amp;'s mut A</a>&gt; for <a class=\"struct\" href=\"tinyvec/struct.SliceVec.html\" title=\"struct tinyvec::SliceVec\">SliceVec</a>&lt;'s, T&gt;<span class=\"where fmt-newline\">where\n    A: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.AsMut.html\" title=\"trait core::convert::AsMut\">AsMut</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/core/primitive.slice.html\">[T]</a>&gt;,</span>"],["impl&lt;T, A&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;&amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/core/primitive.slice.html\">[T]</a>&gt; for <a class=\"enum\" href=\"tinyvec/enum.TinyVec.html\" title=\"enum tinyvec::TinyVec\">TinyVec</a>&lt;A&gt;<span class=\"where fmt-newline\">where\n    T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a>,\n    A: <a class=\"trait\" href=\"tinyvec/trait.Array.html\" title=\"trait tinyvec::Array\">Array</a>&lt;Item = T&gt;,</span>"],["impl&lt;A: <a class=\"trait\" href=\"tinyvec/trait.Array.html\" title=\"trait tinyvec::Array\">Array</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"tinyvec/struct.ArrayVec.html\" title=\"struct tinyvec::ArrayVec\">ArrayVec</a>&lt;A&gt;&gt; for <a class=\"enum\" href=\"tinyvec/enum.TinyVec.html\" title=\"enum tinyvec::TinyVec\">TinyVec</a>&lt;A&gt;"],["impl&lt;T, A&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;&amp;mut <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/core/primitive.slice.html\">[T]</a>&gt; for <a class=\"enum\" href=\"tinyvec/enum.TinyVec.html\" title=\"enum tinyvec::TinyVec\">TinyVec</a>&lt;A&gt;<span class=\"where fmt-newline\">where\n    T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a>,\n    A: <a class=\"trait\" href=\"tinyvec/trait.Array.html\" title=\"trait tinyvec::Array\">Array</a>&lt;Item = T&gt;,</span>"]],
"ttf_parser":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.i16.html\">i16</a>&gt; for <a class=\"struct\" href=\"ttf_parser/struct.NormalizedCoordinate.html\" title=\"struct ttf_parser::NormalizedCoordinate\">NormalizedCoordinate</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.u16.html\">u16</a>&gt; for <a class=\"enum\" href=\"ttf_parser/os2/enum.Weight.html\" title=\"enum ttf_parser::os2::Weight\">Weight</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.f32.html\">f32</a>&gt; for <a class=\"struct\" href=\"ttf_parser/struct.NormalizedCoordinate.html\" title=\"struct ttf_parser::NormalizedCoordinate\">NormalizedCoordinate</a>"]],
"unicode_bidi":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.u8.html\">u8</a>&gt; for <a class=\"struct\" href=\"unicode_bidi/level/struct.Level.html\" title=\"struct unicode_bidi::level::Level\">Level</a>"]],
"unicode_script":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"enum\" href=\"unicode_script/enum.Script.html\" title=\"enum unicode_script::Script\">Script</a>&gt; for <a class=\"struct\" href=\"unicode_script/struct.ScriptExtension.html\" title=\"struct unicode_script::ScriptExtension\">ScriptExtension</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/core/primitive.char.html\">char</a>&gt; for <a class=\"struct\" href=\"unicode_script/struct.ScriptExtension.html\" title=\"struct unicode_script::ScriptExtension\">ScriptExtension</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;&amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/core/primitive.str.html\">str</a>&gt; for <a class=\"struct\" href=\"unicode_script/struct.ScriptExtension.html\" title=\"struct unicode_script::ScriptExtension\">ScriptExtension</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/core/primitive.char.html\">char</a>&gt; for <a class=\"enum\" href=\"unicode_script/enum.Script.html\" title=\"enum unicode_script::Script\">Script</a>"]],
"yazi":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.71.0/std/io/error/struct.Error.html\" title=\"struct std::io::error::Error\">Error</a>&gt; for <a class=\"enum\" href=\"yazi/enum.Error.html\" title=\"enum yazi::Error\">Error</a>"]],
"zeno":[["impl&lt;'a&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;&amp;'a mut <a class=\"struct\" href=\"zeno/struct.Stroke.html\" title=\"struct zeno::Stroke\">Stroke</a>&lt;'a&gt;&gt; for <a class=\"enum\" href=\"zeno/enum.Style.html\" title=\"enum zeno::Style\">Style</a>&lt;'a&gt;"],["impl&lt;'a&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;&amp;'a <a class=\"struct\" href=\"zeno/struct.Stroke.html\" title=\"struct zeno::Stroke\">Stroke</a>&lt;'a&gt;&gt; for <a class=\"enum\" href=\"zeno/enum.Style.html\" title=\"enum zeno::Style\">Style</a>&lt;'a&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;(<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.i32.html\">i32</a>, <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.i32.html\">i32</a>)&gt; for <a class=\"struct\" href=\"zeno/struct.Vector.html\" title=\"struct zeno::Vector\">Vector</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;(<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.f32.html\">f32</a>, <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.i32.html\">i32</a>)&gt; for <a class=\"struct\" href=\"zeno/struct.Vector.html\" title=\"struct zeno::Vector\">Vector</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.f32.html\">f32</a>; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.array.html\">2</a>]&gt; for <a class=\"struct\" href=\"zeno/struct.Vector.html\" title=\"struct zeno::Vector\">Vector</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"zeno/struct.Vector.html\" title=\"struct zeno::Vector\">Vector</a>&gt; for [<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.f32.html\">f32</a>; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.array.html\">2</a>]"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;(<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.i32.html\">i32</a>, <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.f32.html\">f32</a>)&gt; for <a class=\"struct\" href=\"zeno/struct.Vector.html\" title=\"struct zeno::Vector\">Vector</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;(<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.f32.html\">f32</a>, <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.f32.html\">f32</a>)&gt; for <a class=\"struct\" href=\"zeno/struct.Vector.html\" title=\"struct zeno::Vector\">Vector</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.i32.html\">i32</a>&gt; for <a class=\"struct\" href=\"zeno/struct.Vector.html\" title=\"struct zeno::Vector\">Vector</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"zeno/struct.Vector.html\" title=\"struct zeno::Vector\">Vector</a>&gt; for (<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.f32.html\">f32</a>, <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.f32.html\">f32</a>)"],["impl&lt;'a&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"zeno/struct.Stroke.html\" title=\"struct zeno::Stroke\">Stroke</a>&lt;'a&gt;&gt; for <a class=\"enum\" href=\"zeno/enum.Style.html\" title=\"enum zeno::Style\">Style</a>&lt;'a&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.i32.html\">i32</a>; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.array.html\">2</a>]&gt; for <a class=\"struct\" href=\"zeno/struct.Vector.html\" title=\"struct zeno::Vector\">Vector</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.71.0/std/primitive.f32.html\">f32</a>&gt; for <a class=\"struct\" href=\"zeno/struct.Vector.html\" title=\"struct zeno::Vector\">Vector</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.71.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"enum\" href=\"zeno/enum.Fill.html\" title=\"enum zeno::Fill\">Fill</a>&gt; for <a class=\"enum\" href=\"zeno/enum.Style.html\" title=\"enum zeno::Style\">Style</a>&lt;'_&gt;"]]
};if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()