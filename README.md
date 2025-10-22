# Adept: On-Device AI Helper

A Chrome extension that leverages Chrome's built-in AI APIs to privately summarize, simplify, and translate highlighted text directly on your device.

## Features

🔒 **Privacy-First**: All AI processing happens locally on your device using Chrome's built-in AI APIs - no data is sent to external servers.

✨ **Three Core Functions**:

- **Simplify Text**: Makes complex text easier to read using Chrome's Rewriter API
- **Summarize Text**: Creates concise summaries using Chrome's Summarizer API
- **Translate Text**: Translates text to your preferred language using Chrome's Translator API

🎯 **Smart Context Menu**: Right-click on any selected text to access AI features instantly

⚙️ **Customizable Settings**: Set your preferred target language for translations through the extension popup

🌙 **Dark Mode Support**: Automatically adapts to your system's theme preference

## Installation

### Prerequisites

- Google Chrome version 127+ (required for built-in AI APIs)
- AI features must be enabled in Chrome (see [Chrome AI APIs documentation](https://developer.chrome.com/docs/ai/built-in))

### Install from Source

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension folder
5. The extension should now appear in your extensions list

## Usage

### Setting Up

1. Click the Adept extension icon in the Chrome toolbar
2. Select your preferred target language for translations
3. Click "Save Settings"

### Using the Extension

1. **Select any text** on any webpage
2. **Right-click** to open the context menu
3. **Choose an AI action** from the "Adept AI Helper" submenu:
   - **Simplify Text**: Makes the text easier to understand
   - **Summarize Text**: Creates a brief summary
   - **Translate Text**: Translates to your chosen language
4. **View results** in the popup that appears in the top-right corner

## File Structure

```
chrome-extension/
├── manifest.json          # Extension configuration
├── background.js          # Service worker handling context menus and AI logic
├── content.js            # Content script for displaying results
├── popup.html            # Settings popup UI
├── popup.js              # Settings popup functionality
├── popup.css             # Settings popup styling
├── style.css             # Result popup styling
└── README.md             # This file
```

## Technical Details

### Chrome AI APIs Used

- **Summarizer API**: For text summarization with configurable type, format, and length
- **Rewriter API**: For text simplification with "simpler" tone setting
- **LanguageDetector API**: For automatic language detection before translation
- **Translator API**: For text translation between detected and target languages

### Permissions Required

- `contextMenus`: To add right-click menu options
- `activeTab`: To interact with the current webpage
- `scripting`: To inject content scripts
- `storage`: To save user preferences

### Error Handling

The extension includes robust error handling for:

- Unavailable AI APIs
- Unsupported language pairs for translation
- Network connectivity issues
- Invalid or empty text selections

## Browser Compatibility

This extension requires:

- **Chrome 127+** with experimental AI features enabled
- AI APIs availability varies by Chrome version and user settings

To enable Chrome's built-in AI:

1. Navigate to `chrome://flags/`
2. Search for and enable relevant AI flags
3. Restart Chrome

## Development

### Project Structure

- **Background Script** (`background.js`): Handles context menu creation and AI API interactions
- **Content Script** (`content.js`): Manages result display on web pages
- **Popup** (`popup.html/js/css`): Provides settings interface
- **Styles** (`style.css`): Defines the appearance of result popups

### Key Features Implementation

- **Context Menu Integration**: Dynamic menu creation with hierarchical structure
- **AI Session Management**: Proper creation and cleanup of AI API sessions
- **Storage Integration**: Chrome storage sync for user preferences
- **Responsive Design**: Mobile-friendly popup design with dark mode support

## Troubleshooting

### Common Issues

**"AI APIs are not available"**

- Ensure you're using Chrome 127+
- Enable experimental AI features in `chrome://flags/`
- Check if your Chrome installation supports built-in AI

**Translation not working**

- Verify target language is set in extension settings
- Some language pairs may not be supported
- Check console for specific error messages

**Extension not appearing in context menu**

- Refresh the webpage after installing
- Check that text is properly selected before right-clicking
- Verify extension is enabled in `chrome://extensions/`

## Privacy & Security

- **100% Local Processing**: All AI operations run locally on your device
- **No Data Collection**: No user data is transmitted to external servers
- **Minimal Permissions**: Only requests necessary permissions for core functionality
- **Open Source**: Full source code available for review

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve the extension.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**What this means:**

- ✅ Free to use, modify, and distribute
- ✅ Can be used in commercial projects
- ✅ No warranty or liability
- ℹ️ Must include original copyright notice

---

**Note**: This extension relies on experimental Chrome AI APIs that are still in development. Features and availability may change as these APIs evolve.
