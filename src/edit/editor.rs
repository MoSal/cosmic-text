// SPDX-License-Identifier: MIT OR Apache-2.0

#[cfg(not(feature = "std"))]
use alloc::string::{String, ToString};
use core::{cmp, iter::once};
use unicode_segmentation::UnicodeSegmentation;

#[cfg(feature = "swash")]
use crate::Color;
use crate::{
    Action, AttrsList, BorrowedWithFontSystem, Buffer, BufferLine, Change, ChangeItem, Cursor,
    Edit, FontSystem, Selection, Shaping,
};

/// A wrapper of [`Buffer`] for easy editing
#[derive(Debug)]
pub struct Editor {
    buffer: Buffer,
    cursor: Cursor,
    cursor_x_opt: Option<i32>,
    selection: Selection,
    cursor_moved: bool,
    auto_indent: bool,
    tab_width: u16,
    change: Option<Change>,
}

impl Editor {
    /// Create a new [`Editor`] with the provided [`Buffer`]
    pub fn new(buffer: Buffer) -> Self {
        Self {
            buffer,
            cursor: Cursor::default(),
            cursor_x_opt: None,
            selection: Selection::None,
            cursor_moved: false,
            auto_indent: false,
            tab_width: 4,
            change: None,
        }
    }

    /// Draw the editor
    #[cfg(feature = "swash")]
    pub fn draw<F>(
        &self,
        font_system: &mut FontSystem,
        cache: &mut crate::SwashCache,
        text_color: Color,
        cursor_color: Color,
        selection_color: Color,
        mut f: F,
    ) where
        F: FnMut(i32, i32, u32, u32, Color),
    {
        let line_height = self.buffer.metrics().line_height;

        for run in self.buffer.layout_runs() {
            let line_i = run.line_i;
            let line_y = run.line_y;
            let line_top = run.line_top;

            let cursor_glyph_opt = |cursor: &Cursor| -> Option<(usize, f32)> {
                if cursor.line == line_i {
                    for (glyph_i, glyph) in run.glyphs.iter().enumerate() {
                        if cursor.index == glyph.start {
                            return Some((glyph_i, 0.0));
                        } else if cursor.index > glyph.start && cursor.index < glyph.end {
                            // Guess x offset based on characters
                            let mut before = 0;
                            let mut total = 0;

                            let cluster = &run.text[glyph.start..glyph.end];
                            for (i, _) in cluster.grapheme_indices(true) {
                                if glyph.start + i < cursor.index {
                                    before += 1;
                                }
                                total += 1;
                            }

                            let offset = glyph.w * (before as f32) / (total as f32);
                            return Some((glyph_i, offset));
                        }
                    }
                    match run.glyphs.last() {
                        Some(glyph) => {
                            if cursor.index == glyph.end {
                                return Some((run.glyphs.len(), 0.0));
                            }
                        }
                        None => {
                            return Some((0, 0.0));
                        }
                    }
                }
                None
            };

            // Highlight selection (TODO: HIGHLIGHT COLOR!)
            if let Some((start, end)) = self.selection_bounds() {
                if line_i >= start.line && line_i <= end.line {
                    let mut range_opt = None;
                    for glyph in run.glyphs.iter() {
                        // Guess x offset based on characters
                        let cluster = &run.text[glyph.start..glyph.end];
                        let total = cluster.grapheme_indices(true).count();
                        let mut c_x = glyph.x;
                        let c_w = glyph.w / total as f32;
                        for (i, c) in cluster.grapheme_indices(true) {
                            let c_start = glyph.start + i;
                            let c_end = glyph.start + i + c.len();
                            if (start.line != line_i || c_end > start.index)
                                && (end.line != line_i || c_start < end.index)
                            {
                                range_opt = match range_opt.take() {
                                    Some((min, max)) => Some((
                                        cmp::min(min, c_x as i32),
                                        cmp::max(max, (c_x + c_w) as i32),
                                    )),
                                    None => Some((c_x as i32, (c_x + c_w) as i32)),
                                };
                            } else if let Some((min, max)) = range_opt.take() {
                                f(
                                    min,
                                    line_top as i32,
                                    cmp::max(0, max - min) as u32,
                                    line_height as u32,
                                    selection_color,
                                );
                            }
                            c_x += c_w;
                        }
                    }

                    if run.glyphs.is_empty() && end.line > line_i {
                        // Highlight all of internal empty lines
                        range_opt = Some((0, self.buffer.size().0 as i32));
                    }

                    if let Some((mut min, mut max)) = range_opt.take() {
                        if end.line > line_i {
                            // Draw to end of line
                            if run.rtl {
                                min = 0;
                            } else {
                                max = self.buffer.size().0 as i32;
                            }
                        }
                        f(
                            min,
                            line_top as i32,
                            cmp::max(0, max - min) as u32,
                            line_height as u32,
                            selection_color,
                        );
                    }
                }
            }

            // Draw cursor
            if let Some((cursor_glyph, cursor_glyph_offset)) = cursor_glyph_opt(&self.cursor) {
                let x = match run.glyphs.get(cursor_glyph) {
                    Some(glyph) => {
                        // Start of detected glyph
                        if glyph.level.is_rtl() {
                            (glyph.x + glyph.w - cursor_glyph_offset) as i32
                        } else {
                            (glyph.x + cursor_glyph_offset) as i32
                        }
                    }
                    None => match run.glyphs.last() {
                        Some(glyph) => {
                            // End of last glyph
                            if glyph.level.is_rtl() {
                                glyph.x as i32
                            } else {
                                (glyph.x + glyph.w) as i32
                            }
                        }
                        None => {
                            // Start of empty line
                            0
                        }
                    },
                };

                f(x, line_top as i32, 1, line_height as u32, cursor_color);
            }

            for glyph in run.glyphs.iter() {
                let physical_glyph = glyph.physical((0., 0.), 1.0);

                let glyph_color = match glyph.color_opt {
                    Some(some) => some,
                    None => text_color,
                };

                cache.with_pixels(
                    font_system,
                    physical_glyph.cache_key,
                    glyph_color,
                    |x, y, color| {
                        f(
                            physical_glyph.x + x,
                            line_y as i32 + physical_glyph.y + y,
                            1,
                            1,
                            color,
                        );
                    },
                );
            }
        }
    }
}

impl Edit for Editor {
    fn buffer(&self) -> &Buffer {
        &self.buffer
    }

    fn buffer_mut(&mut self) -> &mut Buffer {
        &mut self.buffer
    }

    fn cursor(&self) -> Cursor {
        self.cursor
    }

    fn set_cursor(&mut self, cursor: Cursor) {
        if self.cursor != cursor {
            self.cursor = cursor;
            self.cursor_moved = true;
            self.buffer.set_redraw(true);
        }
    }

    fn selection(&self) -> Selection {
        self.selection
    }

    fn set_selection(&mut self, selection: Selection) {
        if self.selection != selection {
            self.selection = selection;
            self.buffer.set_redraw(true);
        }
    }

    fn auto_indent(&self) -> bool {
        self.auto_indent
    }

    fn set_auto_indent(&mut self, auto_indent: bool) {
        self.auto_indent = auto_indent;
    }

    fn tab_width(&self) -> u16 {
        self.tab_width
    }

    fn set_tab_width(&mut self, tab_width: u16) {
        // A tab width of 0 is not allowed
        if tab_width == 0 {
            return;
        }
        if self.tab_width != tab_width {
            self.tab_width = tab_width;
            self.buffer.set_redraw(true);
        }
    }

    fn shape_as_needed(&mut self, font_system: &mut FontSystem, prune: bool) {
        if self.cursor_moved {
            self.buffer
                .shape_until_cursor(font_system, self.cursor, prune);
            self.cursor_moved = false;
        } else {
            self.buffer.shape_until_scroll(font_system, prune);
        }
    }

    fn delete_range(&mut self, start: Cursor, end: Cursor) {
        // Collect removed data for change tracking
        let mut change_text = String::new();

        // Delete the selection from the last line
        let end_line_opt = if end.line > start.line {
            // Get part of line after selection
            let after = self.buffer.lines[end.line].split_off(end.index);

            // Remove end line
            let removed = self.buffer.lines.remove(end.line);
            change_text.insert_str(0, removed.text());

            Some(after)
        } else {
            None
        };

        // Delete interior lines (in reverse for safety)
        for line_i in (start.line + 1..end.line).rev() {
            let removed = self.buffer.lines.remove(line_i);
            change_text.insert_str(0, removed.text());
        }

        // Delete the selection from the first line
        {
            // Get part after selection if start line is also end line
            let after_opt = if start.line == end.line {
                Some(self.buffer.lines[start.line].split_off(end.index))
            } else {
                None
            };

            // Delete selected part of line
            let removed = self.buffer.lines[start.line].split_off(start.index);
            change_text.insert_str(0, removed.text());

            // Re-add part of line after selection
            if let Some(after) = after_opt {
                self.buffer.lines[start.line].append(after);
            }

            // Re-add valid parts of end line
            if let Some(end_line) = end_line_opt {
                self.buffer.lines[start.line].append(end_line);
            }
        }

        if let Some(ref mut change) = self.change {
            let item = ChangeItem {
                start,
                end,
                text: change_text,
                insert: false,
            };
            change.items.push(item);
        }
    }

    fn insert_at(
        &mut self,
        mut cursor: Cursor,
        data: &str,
        attrs_list: Option<AttrsList>,
    ) -> Cursor {
        let mut remaining_split_len = data.len();
        if remaining_split_len == 0 {
            return cursor;
        }

        // Save cursor for change tracking
        let start = cursor;

        let line: &mut BufferLine = &mut self.buffer.lines[cursor.line];
        let insert_line = cursor.line + 1;

        // Collect text after insertion as a line
        let after: BufferLine = line.split_off(cursor.index);
        let after_len = after.text().len();

        // Collect attributes
        let mut final_attrs = attrs_list.unwrap_or_else(|| {
            AttrsList::new(line.attrs_list().get_span(cursor.index.saturating_sub(1)))
        });

        // Append the inserted text, line by line
        // we want to see a blank entry if the string ends with a newline
        let addendum = once("").filter(|_| data.ends_with('\n'));
        let mut lines_iter = data.split_inclusive('\n').chain(addendum);
        if let Some(data_line) = lines_iter.next() {
            let mut these_attrs = final_attrs.split_off(data_line.len());
            remaining_split_len -= data_line.len();
            core::mem::swap(&mut these_attrs, &mut final_attrs);
            line.append(BufferLine::new(
                data_line
                    .strip_suffix(char::is_control)
                    .unwrap_or(data_line),
                these_attrs,
                Shaping::Advanced,
            ));
        } else {
            panic!("str::lines() did not yield any elements");
        }
        if let Some(data_line) = lines_iter.next_back() {
            remaining_split_len -= data_line.len();
            let mut tmp = BufferLine::new(
                data_line
                    .strip_suffix(char::is_control)
                    .unwrap_or(data_line),
                final_attrs.split_off(remaining_split_len),
                Shaping::Advanced,
            );
            tmp.append(after);
            self.buffer.lines.insert(insert_line, tmp);
            cursor.line += 1;
        } else {
            line.append(after);
        }
        for data_line in lines_iter.rev() {
            remaining_split_len -= data_line.len();
            let tmp = BufferLine::new(
                data_line
                    .strip_suffix(char::is_control)
                    .unwrap_or(data_line),
                final_attrs.split_off(remaining_split_len),
                Shaping::Advanced,
            );
            self.buffer.lines.insert(insert_line, tmp);
            cursor.line += 1;
        }

        assert_eq!(remaining_split_len, 0);

        // Append the text after insertion
        cursor.index = self.buffer.lines[cursor.line].text().len() - after_len;

        if let Some(ref mut change) = self.change {
            let item = ChangeItem {
                start,
                end: cursor,
                text: data.to_string(),
                insert: true,
            };
            change.items.push(item);
        }

        cursor
    }

    fn copy_selection(&self) -> Option<String> {
        let (start, end) = self.selection_bounds()?;

        let mut selection = String::new();
        // Take the selection from the first line
        {
            // Add selected part of line to string
            if start.line == end.line {
                selection.push_str(&self.buffer.lines[start.line].text()[start.index..end.index]);
            } else {
                selection.push_str(&self.buffer.lines[start.line].text()[start.index..]);
                selection.push('\n');
            }
        }

        // Take the selection from all interior lines (if they exist)
        for line_i in start.line + 1..end.line {
            selection.push_str(self.buffer.lines[line_i].text());
            selection.push('\n');
        }

        // Take the selection from the last line
        if end.line > start.line {
            // Add selected part of line to string
            selection.push_str(&self.buffer.lines[end.line].text()[..end.index]);
        }

        Some(selection)
    }

    fn delete_selection(&mut self) -> bool {
        let (start, end) = match self.selection_bounds() {
            Some(some) => some,
            None => return false,
        };

        // Reset cursor to start of selection
        self.cursor = start;

        // Reset selection to None
        self.selection = Selection::None;

        // Delete from start to end of selection
        self.delete_range(start, end);

        true
    }

    fn apply_change(&mut self, change: &Change) -> bool {
        // Cannot apply changes if there is a pending change
        match self.change.take() {
            Some(pending) => {
                if !pending.items.is_empty() {
                    //TODO: is this a good idea?
                    log::warn!("pending change caused apply_change to be ignored!");
                    self.change = Some(pending);
                    return false;
                }
            }
            None => {}
        }

        for item in change.items.iter() {
            //TODO: edit cursor if needed?
            if item.insert {
                self.cursor = self.insert_at(item.start, &item.text, None);
            } else {
                self.cursor = item.start;
                self.delete_range(item.start, item.end);
            }
        }
        true
    }

    fn start_change(&mut self) {
        if self.change.is_none() {
            self.change = Some(Change::default());
        }
    }

    fn finish_change(&mut self) -> Option<Change> {
        self.change.take()
    }

    fn action(&mut self, font_system: &mut FontSystem, action: Action) {
        let old_cursor = self.cursor;

        match action {
            Action::Motion(motion) => {
                if let Some((cursor, cursor_x_opt)) =
                    self.buffer
                        .cursor_motion(font_system, self.cursor, self.cursor_x_opt, motion)
                {
                    self.cursor = cursor;
                    self.cursor_x_opt = cursor_x_opt;
                }
            }
            Action::Escape => {
                match self.selection {
                    Selection::None => {}
                    _ => self.buffer.set_redraw(true),
                }
                self.selection = Selection::None;
            }
            Action::Insert(character) => {
                if character.is_control() && !['\t', '\n', '\u{92}'].contains(&character) {
                    // Filter out special chars (except for tab), use Action instead
                    log::debug!("Refusing to insert control character {:?}", character);
                } else if character == '\n' {
                    self.action(font_system, Action::Enter);
                } else {
                    let mut str_buf = [0u8; 8];
                    let str_ref = character.encode_utf8(&mut str_buf);
                    self.insert_string(str_ref, None);
                }
            }
            Action::Enter => {
                //TODO: what about indenting more after opening brackets or parentheses?
                if self.auto_indent {
                    let mut string = String::from("\n");
                    {
                        let line = &self.buffer.lines[self.cursor.line];
                        let text = line.text();
                        for c in text.chars() {
                            if c.is_whitespace() {
                                string.push(c);
                            } else {
                                break;
                            }
                        }
                    }
                    self.insert_string(&string, None);
                } else {
                    self.insert_string("\n", None);
                }

                // Ensure line is properly shaped and laid out (for potential immediate commands)
                self.buffer.line_layout(font_system, self.cursor.line);
            }
            Action::Backspace => {
                if self.delete_selection() {
                    // Deleted selection
                } else {
                    // Save current cursor as end
                    let end = self.cursor;

                    if self.cursor.index > 0 {
                        // Move cursor to previous character index
                        let line = &self.buffer.lines[self.cursor.line];
                        self.cursor.index = line.text()[..self.cursor.index]
                            .char_indices()
                            .next_back()
                            .map_or(0, |(i, _)| i);
                    } else if self.cursor.line > 0 {
                        // Move cursor to previous line
                        self.cursor.line -= 1;
                        let line = &self.buffer.lines[self.cursor.line];
                        self.cursor.index = line.text().len();
                    }

                    if self.cursor != end {
                        // Delete range
                        self.delete_range(self.cursor, end);
                    }
                }
            }
            Action::Delete => {
                if self.delete_selection() {
                    // Deleted selection
                } else {
                    // Save current cursor as end
                    let mut end = self.cursor;

                    if self.cursor.index < self.buffer.lines[self.cursor.line].text().len() {
                        let line = &self.buffer.lines[self.cursor.line];

                        let range_opt = line
                            .text()
                            .grapheme_indices(true)
                            .take_while(|(i, _)| *i <= self.cursor.index)
                            .last()
                            .map(|(i, c)| i..(i + c.len()));

                        if let Some(range) = range_opt {
                            self.cursor.index = range.start;
                            end.index = range.end;
                        }
                    } else if self.cursor.line + 1 < self.buffer.lines.len() {
                        end.line += 1;
                        end.index = 0;
                    }

                    if self.cursor != end {
                        self.delete_range(self.cursor, end);
                    }
                }
            }
            Action::Indent => {
                // Get start and end of selection
                let (start, end) = match self.selection_bounds() {
                    Some(some) => some,
                    None => (self.cursor, self.cursor),
                };

                // For every line in selection
                let tab_width: usize = self.tab_width.into();
                for line_i in start.line..=end.line {
                    // Determine indexes of last indent and first character after whitespace
                    let mut after_whitespace;
                    let mut required_indent = 0;
                    {
                        let line = &self.buffer.lines[line_i];
                        let text = line.text();
                        // Default to end of line if no non-whitespace found
                        after_whitespace = text.len();
                        for (count, (index, c)) in text.char_indices().enumerate() {
                            if !c.is_whitespace() {
                                after_whitespace = index;
                                required_indent = tab_width - (count % tab_width);
                                break;
                            }
                        }
                    }

                    // No indent required (not possible?)
                    if required_indent == 0 {
                        required_indent = tab_width;
                    }

                    self.insert_at(
                        Cursor::new(line_i, after_whitespace),
                        &" ".repeat(required_indent),
                        None,
                    );

                    // Adjust cursor
                    if self.cursor.line == line_i {
                        //TODO: should we be forcing cursor index to current indent location?
                        if self.cursor.index < after_whitespace {
                            self.cursor.index = after_whitespace;
                        }
                        self.cursor.index += required_indent;
                    }

                    // Adjust selection
                    match self.selection {
                        Selection::None => {}
                        Selection::Normal(ref mut select)
                        | Selection::Line(ref mut select)
                        | Selection::Word(ref mut select) => {
                            if select.line == line_i && select.index >= after_whitespace {
                                select.index += required_indent;
                            }
                        }
                    }

                    // Request redraw
                    self.buffer.set_redraw(true);
                }
            }
            Action::Unindent => {
                // Get start and end of selection
                let (start, end) = match self.selection_bounds() {
                    Some(some) => some,
                    None => (self.cursor, self.cursor),
                };

                // For every line in selection
                let tab_width: usize = self.tab_width.into();
                for line_i in start.line..=end.line {
                    // Determine indexes of last indent and first character after whitespace
                    let mut last_indent = 0;
                    let mut after_whitespace;
                    {
                        let line = &self.buffer.lines[line_i];
                        let text = line.text();
                        // Default to end of line if no non-whitespace found
                        after_whitespace = text.len();
                        for (count, (index, c)) in text.char_indices().enumerate() {
                            if !c.is_whitespace() {
                                after_whitespace = index;
                                break;
                            }
                            if count % tab_width == 0 {
                                last_indent = index;
                            }
                        }
                    }

                    // No de-indent required
                    if last_indent == after_whitespace {
                        continue;
                    }

                    // Delete one indent
                    self.delete_range(
                        Cursor::new(line_i, last_indent),
                        Cursor::new(line_i, after_whitespace),
                    );

                    // Adjust cursor
                    if self.cursor.line == line_i && self.cursor.index > last_indent {
                        self.cursor.index -= after_whitespace - last_indent;
                    }

                    // Adjust selection
                    match self.selection {
                        Selection::None => {}
                        Selection::Normal(ref mut select)
                        | Selection::Line(ref mut select)
                        | Selection::Word(ref mut select) => {
                            if select.line == line_i && select.index > last_indent {
                                select.index -= after_whitespace - last_indent;
                            }
                        }
                    }

                    // Request redraw
                    self.buffer.set_redraw(true);
                }
            }
            Action::Click { x, y } => {
                self.set_selection(Selection::None);

                if let Some(new_cursor) = self.buffer.hit(x as f32, y as f32) {
                    if new_cursor != self.cursor {
                        self.cursor = new_cursor;
                        self.buffer.set_redraw(true);
                    }
                }
            }
            Action::DoubleClick { x, y } => {
                self.set_selection(Selection::None);

                if let Some(new_cursor) = self.buffer.hit(x as f32, y as f32) {
                    if new_cursor != self.cursor {
                        self.cursor = new_cursor;
                        self.buffer.set_redraw(true);
                    }
                    self.selection = Selection::Word(self.cursor);
                    self.buffer.set_redraw(true);
                }
            }
            Action::TripleClick { x, y } => {
                self.set_selection(Selection::None);

                if let Some(new_cursor) = self.buffer.hit(x as f32, y as f32) {
                    if new_cursor != self.cursor {
                        self.cursor = new_cursor;
                    }
                    self.selection = Selection::Line(self.cursor);
                    self.buffer.set_redraw(true);
                }
            }
            Action::Drag { x, y } => {
                if self.selection == Selection::None {
                    self.selection = Selection::Normal(self.cursor);
                    self.buffer.set_redraw(true);
                }

                if let Some(new_cursor) = self.buffer.hit(x as f32, y as f32) {
                    if new_cursor != self.cursor {
                        self.cursor = new_cursor;
                        self.buffer.set_redraw(true);
                    }
                }
            }
            Action::Scroll { lines } => {
                let mut scroll = self.buffer.scroll();
                scroll.layout += lines;
                self.buffer.set_scroll(scroll);
            }
        }

        if old_cursor != self.cursor {
            self.cursor_moved = true;
            self.buffer.set_redraw(true);

            /*TODO
            if let Some(glyph) = run.glyphs.get(new_cursor_glyph) {
                let font_opt = self.buffer.font_system().get_font(glyph.cache_key.font_id);
                let text_glyph = &run.text[glyph.start..glyph.end];
                log::debug!(
                    "{}, {}: '{}' ('{}'): '{}' ({:?})",
                    self.cursor.line,
                    self.cursor.index,
                    font_opt.as_ref().map_or("?", |font| font.info.family.as_str()),
                    font_opt.as_ref().map_or("?", |font| font.info.post_script_name.as_str()),
                    text_glyph,
                    text_glyph
                );
            }
            */
        }
    }
}

impl<'a> BorrowedWithFontSystem<'a, Editor> {
    #[cfg(feature = "swash")]
    pub fn draw<F>(
        &mut self,
        cache: &mut crate::SwashCache,
        text_color: Color,
        cursor_color: Color,
        selection_color: Color,
        f: F,
    ) where
        F: FnMut(i32, i32, u32, u32, Color),
    {
        self.inner.draw(
            self.font_system,
            cache,
            text_color,
            cursor_color,
            selection_color,
            f,
        );
    }
}
