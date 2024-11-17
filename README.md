# Poetry Library

A beautiful, responsive web application for displaying and navigating through a collection of poems. Built with HTML, CSS, and vanilla JavaScript.

## 🌟 Features

- **Elegant Design**
  - Clean, minimalist interface focused on readability
  - Responsive layout that works on all devices
  - Beautiful typography using Google Fonts
  - Dark/Light theme support

- **Navigation**
  - Intuitive arrow controls for browsing poems
  - Keyboard navigation support (left/right arrows)
  - Page indicator showing current position
  - Random poem selection

- **User Experience**
  - Smooth transitions between poems
  - Loading states and error handling
  - Share functionality
  - Adjustable font size
  - Reading time indicator

## 📁 Project Structure

```
poetry-library/
├── index.html
├── asset/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── script.js
│   └── poem/
│       └── poems.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- A local development server (recommended: VS Code Live Server)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/poetry-library.git
   ```

2. Navigate to the project directory:
   ```bash
   cd poetry-library
   ```

3. If using VS Code:
   - Install the "Live Server" extension
   - Right-click `index.html` and select "Open with Live Server"

4. Alternatively, use any HTTP server:
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js
   npx serve
   ```

## 💻 Usage

- Use the arrow buttons or keyboard arrow keys to navigate between poems
- Click the theme toggle button to switch between light and dark modes
- Use the control panel to:
  - Generate a random poem
  - Share the current poem
  - Adjust text size

## 📝 Adding Poems

Add new poems to `asset/poem/poems.json` following this format:

```json
{
    "title": "Poem Title",
    "content": "First line of the poem\nSecond line of the poem\nThird line of the poem"
}
```

## 🎨 Customization

### Colors
The color scheme can be customized by modifying the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #34495e;
    --accent-color: #c0392b;
    /* ... other color variables ... */
}
```

### Fonts
The project uses Google Fonts:
- Playfair Display for headings
- Lora for body text

To change fonts, update the Google Fonts link in `index.html` and modify the font-family properties in `styles.css`.

## 🛠️ Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts
- Font Awesome Icons

## ✨ Future Enhancements

- [ ] Search functionality
- [ ] Categories/tags for poems
- [ ] Social media sharing
- [ ] Print functionality
- [ ] Favorites system
- [ ] Reading progress tracking

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## 👏 Acknowledgments

- Poems sourced from various public domain collections
- Inspired by classic poetry books and modern web design
- Icons provided by Font Awesome
- Fonts provided by Google Fonts