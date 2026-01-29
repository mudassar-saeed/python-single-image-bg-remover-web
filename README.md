# Image Background Remover - Flask Web App

A beautiful web application for removing backgrounds from images using AI.

## Features

- 🎨 Clean, elegant UI with smooth animations
- 📤 Drag & drop or click to upload images
- 🖼️ Real-time image preview
- ⚡ Fast background removal using AI
- 💾 Download processed images as PNG
- 📱 Fully responsive design
- 🎯 Support for PNG, JPG, WEBP, BMP formats
- 🔒 16MB file size limit

## Project Structure

```
image-background-remover/
├── app.py                    # Flask application (main file)
├── requirements.txt          # Python dependencies
├── README.md                 # This file
├── templates/
│   └── index.html           # HTML template
├── static/
│   ├── css/
│   │   └── style.css        # Stylesheet
│   ├── images/
│   │   └── favicon.png      # Favicon
│   └── js/
│       └── script.js        # JavaScript
├── uploads/                 # Temporary uploads (auto-created)
└── results/                 # Temporary results (auto-created)
```

## Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

## Installation

### Step 1: Set Up Project Files

Create the following directory structure:

```
image-background-remover/
├── app.py                   
├── requirements.txt         
├── README.md                
├── templates/
│   └── index.html           
├── static/
│   ├── css/
│   │   └── style.css        
│   ├── images/
│   │   └── favicon.png      
│   └── js/
│       └── script.js        
```

Place the provided files in their respective locations:
- `app.py` in the root directory
- `index.html` in the `templates/` folder
- `style.css` in the `static/css/` folder
- `script.js` in the `static/js/` folder
- `requirements.txt` in the root directory

### Step 2: Create Virtual Environment (Recommended)

Open terminal/command prompt in the project directory.

**On Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

This installs:
- **Flask** - Web framework
- **rembg** - AI background removal library
- **Pillow** - Image processing
- **werkzeug** - Utilities for Flask

**Note:** On first run, rembg will download its AI model (~176MB). This is a one-time download.

### Step 4: Run the Application

```bash
python app.py
```

You should see:
```
 * Running on http://0.0.0.0:5000
 * Running on http://127.0.0.1:5000
```

### Step 5: Open in Browser

Navigate to:
```
http://localhost:5000
```

## How to Use

1. **Upload Image**
   - Click the upload area OR drag & drop an image
   - Supported formats: PNG, JPG, JPEG, WEBP, BMP
   - Max file size: 16MB

2. **Remove Background**
   - Click "Remove BG" button
   - Wait 2-5 seconds for processing
   - Result appears in the right panel with transparent background

3. **Download Result**
   - Click "Download PNG" button
   - Image saves with transparent background

## Troubleshooting

### Port 5000 Already in Use

Change the port in `app.py` (last line):
```python
app.run(debug=True, host='0.0.0.0', port=5001)  # Use port 5001
```

### Module Not Found Error

Ensure virtual environment is activated and dependencies are installed:
```bash
pip install -r requirements.txt
```

### First Run is Slow

This is normal! The rembg library downloads its AI model (~176MB) on first use. Subsequent runs will be much faster (2-5 seconds per image).

### Upload Fails

- Check file size (must be under 16MB)
- Check file format (PNG, JPG, JPEG, WEBP, BMP only)
- Ensure file is not corrupted

### Processing Takes Too Long

- First image may take 5-10 seconds (model loading)
- Subsequent images: 2-5 seconds typically
- Large images take longer to process
- CPU processing is slower than GPU (for production, consider GPU hosting)

## Performance Notes

- **First image:** 5-10 seconds (model loading)
- **Subsequent images:** 2-5 seconds
- Processing time depends on:
  - Image size and complexity
  - CPU speed
  - Available RAM

## Technical Details

- **Backend:** Flask (Python web framework)
- **AI Model:** rembg (U²-Net architecture)
- **Image Processing:** Pillow (PIL Fork)
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Fonts:** Playfair Display (serif), DM Sans (sans-serif)

## File Details

### app.py
Main Flask application that:
- Serves the web interface
- Handles file uploads
- Processes images with rembg
- Returns results as PNG with transparent background

### templates/index.html
HTML structure with:
- Two-panel layout (upload & result)
- SVG icons
- Accessible markup
- Responsive meta tags

### static/css/style.css
Styling with:
- CSS custom properties (variables)
- Elegant gradient buttons
- Smooth animations
- Responsive design
- Grain texture overlay

### static/js/script.js
JavaScript functionality:
- Drag & drop file handling
- File validation
- Fetch API for background removal
- Blob handling for downloads
- Error handling

## Security Considerations

⚠️ **This is a development server.** For production:

1. Use a production WSGI server:
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

2. Add file cleanup (delete uploaded/processed files after use)

3. Implement rate limiting to prevent abuse

4. Add user authentication if needed

5. Use HTTPS in production

6. Set proper file permissions

## Deployment

For production deployment, consider:

- **Heroku**: Easy Python app hosting
- **DigitalOcean**: Droplets with Python
- **AWS EC2**: Scalable compute
- **Google Cloud Run**: Containerized deployment
- **Railway**: Simple Python deployment

Remember to:
- Change `debug=True` to `debug=False` in `app.py`
- Use environment variables for configuration
- Set up proper logging
- Implement file cleanup
- Use production WSGI server (gunicorn/waitress)

## Stopping the Server

Press `Ctrl + C` in the terminal.

## Deactivating Virtual Environment

```bash
deactivate
```

## Dependencies Explained

- **Flask (3.0.0)**: Lightweight web framework
- **rembg (2.0.58)**: AI-powered background removal using U²-Net
- **Pillow (10.2.0)**: Python Imaging Library for image processing
- **werkzeug (3.0.1)**: WSGI utilities and secure filename handling

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Credits

Built by **Muhammad Mudassar Saeed**

## License

Open source and free to use for personal and commercial projects.

## Contributing

Feel free to fork, modify, and improve this project!

## Support

For issues or questions, please refer to the official documentation:
- Flask: https://flask.palletsprojects.com/
- rembg: https://github.com/danielgatis/rembg
- Pillow: https://pillow.readthedocs.io/

---

**Happy background removing! 🎨**