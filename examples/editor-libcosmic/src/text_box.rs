use cosmic::iced_native::{
    {Color, Element, Length, Point, Rectangle, Size, Shell, Theme},
    clipboard::Clipboard,
    event::{
        Event,
        Status,
    },
    keyboard::{Event as KeyEvent, KeyCode},
    layout::{self, Layout},
    mouse::{Event as MouseEvent, ScrollDelta},
    renderer,
    widget::{self, Widget},
};
use cosmic_text::{
    TextLineIndex,
    TextAction,
    TextBuffer,
};
use std::{
    cmp,
    sync::{Arc, Mutex},
    time::Instant,
};

pub struct Appearance {
    background_color: Option<Color>,
    text_color: Color,
}

impl Appearance {
    fn text_color_u32(&self) -> u32 {
        let channel = |f: f32, shift: i32| -> u32 {
            (cmp::max(0, cmp::min(255, (f * 255.0) as i32)) << shift) as u32
        };

        channel(self.text_color.b, 0) |
        channel(self.text_color.g, 8) |
        channel(self.text_color.r, 16) |
        channel(self.text_color.a, 24)
    }
}

pub trait StyleSheet {
    fn appearance(&self) -> Appearance;
}

impl StyleSheet for Theme {
    fn appearance(&self) -> Appearance {
        match self {
            Theme::Dark => Appearance {
                background_color: Some(Color::from_rgb8(0x34, 0x34, 0x34)),
                text_color: Color::from_rgb8(0xFF, 0xFF, 0xFF),
            },
            Theme::Light => Appearance {
                background_color: Some(Color::from_rgb8(0xFC, 0xFC, 0xFC)),
                text_color: Color::from_rgb8(0x00, 0x00, 0x00),
            },
        }
    }
}

pub struct TextBox<'a> {
    buffer: Arc<Mutex<TextBuffer<'a>>>,
}

impl<'a> TextBox<'a> {
    pub fn new(buffer: Arc<Mutex<TextBuffer<'a>>>) -> Self {
        Self { buffer }
    }
}

pub fn text_box<'a>(buffer: Arc<Mutex<TextBuffer<'a>>>) -> TextBox<'a> {
    TextBox::new(buffer)
}

impl<'a, Message, Renderer> Widget<Message, Renderer> for TextBox<'a>
where
    Renderer: renderer::Renderer,
    Renderer::Theme: StyleSheet,
{
    fn width(&self) -> Length {
        Length::Fill
    }

    fn height(&self) -> Length {
        Length::Fill
    }

    fn layout(
        &self,
        _renderer: &Renderer,
        limits: &layout::Limits,
    ) -> layout::Node {
        println!("{:?}", limits);
        let size = limits.max();
        {
            let mut buffer = self.buffer.lock().unwrap();

            buffer.set_size(size.width as i32, size.height as i32);
        }
        layout::Node::new(size)
    }

    fn draw(
        &self,
        _state: &widget::Tree,
        renderer: &mut Renderer,
        theme: &Renderer::Theme,
        _style: &renderer::Style,
        layout: Layout<'_>,
        _cursor_position: Point,
        _viewport: &Rectangle,
    ) {
        let appearance = theme.appearance();
        let text_color_u32 = appearance.text_color_u32();

        let buffer = self.buffer.lock().unwrap();

        let instant = Instant::now();

        if let Some(background_color) = appearance.background_color {
            renderer.fill_quad(
                renderer::Quad {
                    bounds: layout.bounds(),
                    border_radius: 0.0,
                    border_width: 0.0,
                    border_color: Color::TRANSPARENT,
                },
                background_color
            );
        }

        let buffer_x = layout.bounds().x;
        let buffer_y = layout.bounds().y;
        buffer.draw(text_color_u32, |x, y, w, h, color| {
            let a = (color >> 24) as u8;
            if a > 0 {
                let r = (color >> 16) as u8;
                let g = (color >> 8) as u8;
                let b = color as u8;
                renderer.fill_quad(
                    renderer::Quad {
                        bounds: Rectangle::new(
                            Point::new(buffer_x + x as f32, buffer_y + y as f32),
                            Size::new(w as f32, h as f32)
                        ),
                        border_radius: 0.0,
                        border_width: 0.0,
                        border_color: Color::TRANSPARENT,
                    },
                    Color::from_rgba8(r, g, b, a as f32 / 255.0),
                );
            }
        });

        /*
        // Draw scrollbar
        {
            let start_line = start_line_opt.unwrap_or(end_line);
            let lines = buffer.text_lines().len();
            let start_y = (start_line.get() * window.height() as usize) / lines;
            let end_y = (end_line.get() * window.height() as usize) / lines;
            if end_y > start_y {
                window.rect(
                    window.width() as i32 - line_x as i32,
                    start_y as i32,
                    line_x as u32,
                    (end_y - start_y) as u32,
                    Color::from_rgba8(0xFF, 0xFF, 0xFF, 0.25),
                );
            }
        }

        buffer.redraw = false;
        */

        let duration = instant.elapsed();
        log::debug!("redraw: {:?}", duration);
    }

    fn on_event(
        &mut self,
        _state: &mut widget::Tree,
        event: Event,
        _layout: Layout<'_>,
        _cursor_position: Point,
        _renderer: &Renderer,
        _clipboard: &mut dyn Clipboard,
        _shell: &mut Shell<'_, Message>,
    ) -> Status {
        let mut buffer = self.buffer.lock().unwrap();

        match event {
            Event::Keyboard(key_event) => match key_event {
                KeyEvent::KeyPressed { key_code, modifiers } => {
                    match key_code {
                        KeyCode::Left => {
                            buffer.action(TextAction::Left);
                            Status::Captured
                        },
                        KeyCode::Right => {
                            buffer.action(TextAction::Right);
                            Status::Captured
                        },
                        KeyCode::Up => {
                            buffer.action(TextAction::Up);
                            Status::Captured
                        },
                        KeyCode::Down => {
                            buffer.action(TextAction::Down);
                            Status::Captured
                        },
                        KeyCode::Backspace => {
                            buffer.action(TextAction::Backspace);
                            Status::Captured
                        },
                        KeyCode::Delete => {
                            buffer.action(TextAction::Delete);
                            Status::Captured
                        },
                        KeyCode::PageUp => {
                            buffer.action(TextAction::PageUp);
                            Status::Captured
                        },
                        KeyCode::PageDown => {
                            buffer.action(TextAction::PageDown);
                            Status::Captured
                        },
                        _ => Status::Ignored,
                    }
                },
                KeyEvent::CharacterReceived(character) => {
                    buffer.action(TextAction::Insert(character));
                    Status::Captured
                },
                _ => Status::Ignored,
            },
            Event::Mouse(mouse_event) => match mouse_event {
                MouseEvent::WheelScrolled { delta } => match delta {
                    ScrollDelta::Lines { x, y } => {
                        buffer.action(TextAction::Scroll((-y * 6.0) as i32));
                        Status::Captured
                    },
                    _ => Status::Ignored,
                }
                _ => Status::Ignored,
            },
            _ => Status::Ignored,
        }
    }
}

impl<'a, Message, Renderer> From<TextBox<'a>> for Element<'a, Message, Renderer>
where
    Renderer: renderer::Renderer,
    Renderer::Theme: StyleSheet,
{
    fn from(text_box: TextBox<'a>) -> Self {
        Self::new(text_box)
    }
}
