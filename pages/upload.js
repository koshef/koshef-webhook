<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload Recipe Image - Koshef</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #3C3C3C;
            background: linear-gradient(135deg, #F6F0E5 0%, #FFFBEF 100%);
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }

        /* Header Styles */
        header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            transition: all 0.3s ease;
        }

        .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;
        }

        .logo-section {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .logo {
            width: 60px;
            height: 60px;
            border-radius: 12px;
            background: linear-gradient(135deg, #7A9E7E, #638a68);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 1.5rem;
            transition: transform 0.3s ease;
        }

        .logo:hover {
            transform: scale(1.05);
        }

        .logo-text {
            font-size: 1.75rem;
            font-weight: 700;
            color: #7A9E7E;
            text-decoration: none;
        }

        nav {
            display: flex;
            gap: 2rem;
        }

        nav a {
            text-decoration: none;
            color: #3C3C3C;
            font-weight: 500;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            transition: all 0.3s ease;
            position: relative;
        }

        nav a:hover {
            color: #C1694F;
            background: rgba(193, 105, 79, 0.1);
            transform: translateY(-2px);
        }

        nav a.active {
            color: #C1694F;
            background: rgba(193, 105, 79, 0.1);
        }

        /* Mobile Menu */
        .mobile-menu-btn {
            display: none;
            flex-direction: column;
            gap: 4px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
        }

        .mobile-menu-btn span {
            width: 25px;
            height: 3px;
            background: #3C3C3C;
            border-radius: 2px;
            transition: all 0.3s ease;
        }

        /* Main Content */
        main {
            padding-top: 120px;
            min-height: calc(100vh - 120px);
        }

        .upload-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem 0;
        }

        .upload-card {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            border-radius: 24px;
            padding: 3rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
        }

        .upload-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
        }

        .page-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #C1694F, #7A9E7E);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-align: center;
        }

        .page-subtitle {
            font-size: 1.1rem;
            color: #666;
            text-align: center;
            margin-bottom: 3rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        /* Form Styles */
        .form-container {
            max-width: 600px;
            margin: 0 auto;
        }

        .form-group {
            margin-bottom: 2rem;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.75rem;
            font-weight: 600;
            color: #3C3C3C;
            font-size: 1.1rem;
        }

        .required {
            color: #C1694F;
        }

        input, textarea {
            width: 100%;
            padding: 1.25rem;
            border: 2px solid rgba(122, 158, 126, 0.2);
            border-radius: 12px;
            font-size: 1rem;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.9);
            font-family: inherit;
        }

        input:focus, textarea:focus {
            outline: none;
            border-color: #7A9E7E;
            box-shadow: 0 0 0 4px rgba(122, 158, 126, 0.1);
            transform: translateY(-2px);
        }

        /* File Upload Styles */
        .file-upload-area {
            position: relative;
            border: 3px dashed rgba(122, 158, 126, 0.3);
            border-radius: 16px;
            padding: 3rem 2rem;
            text-align: center;
            background: rgba(122, 158, 126, 0.05);
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .file-upload-area:hover {
            border-color: #7A9E7E;
            background: rgba(122, 158, 126, 0.1);
        }

        .file-upload-area.dragover {
            border-color: #C1694F;
            background: rgba(193, 105, 79, 0.1);
            transform: scale(1.02);
        }

        .file-upload-input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }

        .upload-icon {
            font-size: 3rem;
            color: #7A9E7E;
            margin-bottom: 1rem;
        }

        .upload-text {
            font-size: 1.1rem;
            color: #666;
            margin-bottom: 0.5rem;
        }

        .upload-hint {
            font-size: 0.9rem;
            color: #999;
        }

        .file-preview {
            margin-top: 1.5rem;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 12px;
            border: 1px solid rgba(122, 158, 126, 0.2);
            display: none;
        }

        .file-preview.show {
            display: block;
        }

        .preview-image {
            max-width: 300px;
            max-height: 200px;
            border-radius: 8px;
            margin: 1rem auto;
            display: block;
        }

        .file-info {
            text-align: center;
            color: #666;
            font-size: 0.9rem;
        }

        /* Button Styles */
        .btn {
            display: inline-block;
            padding: 1.25rem 2.5rem;
            border: none;
            border-radius: 12px;
            font-size: 1.1rem;
            font-weight: 600;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            width: 100%;
            margin-top: 1rem;
        }

        .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.5s ease;
        }

        .btn:hover::before {
            left: 100%;
        }

        .btn-primary {
            background: linear-gradient(135deg, #C1694F, #a5513e);
            color: white;
        }

        .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(193, 105, 79, 0.4);
        }

        .btn-primary:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }

        .btn-secondary {
            background: rgba(122, 158, 126, 0.1);
            color: #7A9E7E;
            border: 2px solid #7A9E7E;
        }

        .btn-secondary:hover {
            background: #7A9E7E;
            color: white;
            transform: translateY(-2px);
        }

        /* Status Messages */
        .status-message {
            padding: 1rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
            font-weight: 500;
            display: none;
        }

        .status-message.show {
            display: block;
        }

        .status-success {
            background: rgba(122, 158, 126, 0.1);
            color: #638a68;
            border: 1px solid rgba(122, 158, 126, 0.3);
        }

        .status-error {
            background: rgba(193, 105, 79, 0.1);
            color: #a5513e;
            border: 1px solid rgba(193, 105, 79, 0.3);
        }

        .status-loading {
            background: rgba(255, 193, 7, 0.1);
            color: #856404;
            border: 1px solid rgba(255, 193, 7, 0.3);
        }

        /* Loading Spinner */
        .loading-spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #C1694F;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-right: 0.5rem;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Recipe Info Display */
        .recipe-info {
            background: rgba(122, 158, 126, 0.1);
            border: 1px solid rgba(122, 158, 126, 0.2);
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 2rem;
        }

        .recipe-info h3 {
            color: #7A9E7E;
            margin-bottom: 0.5rem;
        }

        .recipe-info p {
            color: #666;
            margin: 0;
        }

        /* Footer */
        footer {
            background: rgba(60, 60, 60, 0.9);
            color: white;
            text-align: center;
            padding: 2rem 0;
            margin-top: 4rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: flex;
            }

            nav {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                flex-direction: column;
                padding: 1rem;
                border-radius: 0 0 20px 20px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            }

            nav.active {
                display: flex;
            }

            .upload-card {
                padding: 2rem;
                margin: 1rem;
            }

            .page-title {
                font-size: 2rem;
            }

            .file-upload-area {
                padding: 2rem 1rem;
            }

            .upload-icon {
                font-size: 2.5rem;
            }
        }

        /* Animations */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .fade-in-up {
            animation: fadeInUp 0.6s ease forwards;
        }

        /* Floating Animation */
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }

        .floating {
            animation: float 3s ease-in-out infinite;
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div class="header-content">
                <div class="logo-section">
                    <div class="logo floating">K</div>
                    <a href="/" class="logo-text">Koshef</a>
                </div>
                <nav id="nav">
                    <a href="/">Home</a>
                    <a href="/#about">About</a>
                    <a href="/#recipes">Recipes</a>
                    <a href="/#submit">Submit</a>
                    <a href="/#rate">Rate</a>
                    <a href="/upload" class="active">Upload</a>
                    <a href="/#contact">Contact</a>
                </nav>
                <button class="mobile-menu-btn" onclick="toggleMobileMenu()">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    </header>

    <main>
        <div class="container">
            <div class="upload-container fade-in-up">
                <div class="upload-card">
                    <h1 class="page-title">Upload Recipe Image</h1>
                    <p class="page-subtitle">
                        Add a beautiful photo to your recipe to make it more appealing and help others visualize the final dish.
                    </p>

                    <div id="recipe-info" class="recipe-info" style="display: none;">
                        <h3>Recipe Information</h3>
                        <p id="recipe-details">Loading recipe details...</p>
                    </div>

                    <div id="status-message" class="status-message"></div>

                    <form id="uploadForm" class="form-container">
                        <div class="form-group">
                            <label for="image">Recipe Image <span class="required">*</span></label>
                            <div class="file-upload-area" onclick="document.getElementById('image').click()">
                                <input type="file" id="image" name="image" class="file-upload-input" accept="image/*" required>
                                <div class="upload-icon">📸</div>
                                <div class="upload-text">Click to select an image or drag and drop</div>
                                <div class="upload-hint">Supported formats: JPG, PNG, GIF (Max 10MB)</div>
                            </div>
                            <div id="file-preview" class="file-preview">
                                <img id="preview-image" class="preview-image" alt="Preview">
                                <div id="file-info" class="file-info"></div>
                            </div>
                        </div>

                        <button type="submit" id="submit-btn" class="btn btn-primary">
                            Upload Image
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2025 Koshef.ai. All rights reserved. Made with ❤️ for the kosher cooking community.</p>
        </div>
    </footer>

    <script>
        // Get recipe_id from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const recipeId = urlParams.get('recipe_id');

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            if (recipeId) {
                document.getElementById('recipe-info').style.display = 'block';
                document.getElementById('recipe-details').textContent = `Uploading image for Recipe ID: ${recipeId}`;
            } else {
                showStatus('error', 'No recipe ID provided. Please access this page with a valid recipe_id parameter.');
                document.getElementById('submit-btn').disabled = true;
            }
        });

        // Mobile menu toggle
        function toggleMobileMenu() {
            const nav = document.getElementById('nav');
            nav.classList.toggle('active');
        }

        // File upload handling
        const fileInput = document.getElementById('image');
        const filePreview = document.getElementById('file-preview');
        const previewImage = document.getElementById('preview-image');
        const fileInfo = document.getElementById('file-info');
        const uploadArea = document.querySelector('.file-upload-area');

        // File input change handler
        fileInput.addEventListener('change', function(e) {
            handleFileSelect(e.target.files[0]);
        });

        // Drag and drop handlers
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files;
                handleFileSelect(files[0]);
            }
        });

        function handleFileSelect(file) {
            if (!file) return;

            // Validate file type
            if (!file.type.startsWith('image/')) {
                showStatus('error', 'Please select a valid image file.');
                return;
            }

            // Validate file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                showStatus('error', 'File size must be less than 10MB.');
                return;
            }

            // Show preview
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                fileInfo.textContent = `${file.name} (${formatFileSize(file.size)})`;
                filePreview.classList.add('show');
            };
            reader.readAsDataURL(file);

            // Clear any previous error messages
            hideStatus();
        }

        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        // Form submission
        document.getElementById('uploadForm').addEventListener('submit', async function(e) {
            e.preventDefault();

            if (!recipeId) {
                showStatus('error', 'No recipe ID available for upload.');
                return;
            }

            const formData = new FormData();
            const image = document.getElementById('image').files[0];

            if (!image) {
                showStatus('error', 'Please select an image to upload.');
                return;
            }

            // Add form data
            formData.append('recipe_id', recipeId);
            formData.append('image', image);

            // Show loading state
            const submitBtn = document.getElementById('submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<span class="loading-spinner"></span>Uploading...';
            submitBtn.disabled = true;
            showStatus('loading', 'Uploading your image...');

            try {
                const response = await fetch('https://koshef.ai/api/submit-recipe', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const result = await response.json();
                    showStatus('success', 'Image uploaded successfully! Thank you for your contribution.');
                    
                    // Reset form
                    document.getElementById('uploadForm').reset();
                    filePreview.classList.remove('show');
                    
                    // Optional: redirect after success
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 3000);
                } else {
                    const errorData = await response.json().catch(() => ({}));
                    showStatus('error', errorData.message || 'Upload failed. Please try again.');
                }
            } catch (error) {
                console.error('Upload error:', error);
                showStatus('error', 'Network error. Please check your connection and try again.');
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });

        // Status message functions
        function showStatus(type, message) {
            const statusElement = document.getElementById('status-message');
            statusElement.className = `status-message status-${type} show`;
            statusElement.textContent = message;
            statusElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        function hideStatus() {
            const statusElement = document.getElementById('status-message');
            statusElement.classList.remove('show');
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                // Close mobile menu if open
                document.getElementById('nav').classList.remove('active');
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            }
        });
    </script>
</body>
</html>
