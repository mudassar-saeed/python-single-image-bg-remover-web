// DOM Elements
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const uploadContent = document.getElementById('uploadContent');
const previewImage = document.getElementById('previewImage');
const removeBtn = document.getElementById('removeBtn');
const resultZone = document.getElementById('resultZone');
const resultPlaceholder = document.getElementById('resultPlaceholder');
const resultImage = document.getElementById('resultImage');
const loader = document.getElementById('loader');
const downloadBtn = document.getElementById('downloadBtn');

let uploadedFile = null;
let resultBlob = null;

// Click to upload
uploadZone.addEventListener('click', () => {
    fileInput.click();
});

// File input change
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
});

// Drag and drop handlers
uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
});

uploadZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
});

uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        handleFile(file);
    } else {
        alert('Please upload a valid image file');
    }
});

// Handle file upload
function handleFile(file) {
    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/bmp'];
    if (!validTypes.includes(file.type)) {
        alert('Invalid file type. Please upload PNG, JPG, WEBP, or BMP image.');
        return;
    }

    // Validate file size (16MB max)
    const maxSize = 16 * 1024 * 1024;
    if (file.size > maxSize) {
        alert('File size exceeds 16MB limit.');
        return;
    }

    uploadedFile = file;

    // Display preview
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        previewImage.style.display = 'block';
        uploadContent.style.display = 'none';
        removeBtn.disabled = false;
    };
    reader.readAsDataURL(file);

    // Reset result
    resetResult();
}

// Remove background
removeBtn.addEventListener('click', async () => {
    if (!uploadedFile) return;

    // Show loader
    resultPlaceholder.style.display = 'none';
    resultImage.style.display = 'none';
    loader.style.display = 'flex';
    removeBtn.disabled = true;
    downloadBtn.disabled = true;

    try {
        const formData = new FormData();
        formData.append('image', uploadedFile);

        const response = await fetch('/remove-background', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to remove background');
        }

        // Get the result as blob
        resultBlob = await response.blob();

        // Display result
        const resultUrl = URL.createObjectURL(resultBlob);
        resultImage.src = resultUrl;
        resultImage.style.display = 'block';
        loader.style.display = 'none';
        downloadBtn.disabled = false;
        removeBtn.disabled = false;

    } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
        loader.style.display = 'none';
        resultPlaceholder.style.display = 'flex';
        removeBtn.disabled = false;
    }
});

// Download result
downloadBtn.addEventListener('click', () => {
    if (!resultBlob) return;

    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'removed_background.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Reset result view
function resetResult() {
    resultImage.style.display = 'none';
    resultPlaceholder.style.display = 'flex';
    loader.style.display = 'none';
    downloadBtn.disabled = true;
    resultBlob = null;
}

// Prevent default drag behavior on document
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    document.body.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
    }, false);
});