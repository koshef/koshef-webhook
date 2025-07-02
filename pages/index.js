<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Koshef - Kosher Recipe Community</title>
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
            padding-top: 100px;
        }

        section {
            padding: 4rem 0;
            margin: 2rem 0;
        }

        .section-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 3rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
        }

        .section-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
        }

        .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            background: linear-gradient(135deg, #7A9E7E, #C1694F);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .section-subtitle {
            font-size: 1.75rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            color: #7A9E7E;
        }

        /* Hero Section */
        .hero {
            text-align: center;
            padding: 6rem 0;
            background: linear-gradient(135deg, rgba(122, 158, 126, 0.1), rgba(193, 105, 79, 0.1));
            border-radius: 30px;
            margin: 2rem 0;
        }

        .hero h1 {
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 1.5rem;
            background: linear-gradient(135deg, #7A9E7E, #C1694F);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .hero p {
            font-size: 1.25rem;
            max-width: 600px;
            margin: 0 auto 2rem;
            color: #666;
        }

        /* Form Styles */
        .form-container {
            max-width: 600px;
            margin: 0 auto;
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #3C3C3C;
        }

        input, textarea, select {
            width: 100%;
            padding: 1rem;
            border: 2px solid rgba(122, 158, 126, 0.2);
            border-radius: 12px;
            font-size: 1rem;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.8);
        }

        input:focus, textarea:focus, select:focus {
            outline: none;
            border-color: #7A9E7E;
            box-shadow: 0 0 0 4px rgba(122, 158, 126, 0.1);
            transform: translateY(-2px);
        }

        /* Button Styles */
        .btn {
            display: inline-block;
            padding: 1rem 2rem;
            border: none;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
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
            background: linear-gradient(135deg, #7A9E7E, #638a68);
            color: white;
        }

        .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(122, 158, 126, 0.4);
        }

        .btn-secondary {
            background: linear-gradient(135deg, #C1694F, #a5513e);
            color: white;
        }

        .btn-secondary:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(193, 105, 79, 0.4);
        }

        /* Recipe Grid */
        .recipe-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }

        .recipe-card {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 16px;
            overflow: hidden;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .recipe-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .recipe-image {
            height: 200px;
            background: linear-gradient(135deg, #7A9E7E, #C1694F);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
            font-weight: 600;
        }

        .recipe-content {
            padding: 1.5rem;
        }

        .recipe-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #3C3C3C;
        }

        .recipe-description {
            color: #666;
            font-size: 0.9rem;
        }

        /* Footer */
        footer {
            background: rgba(60, 60, 60, 0.9);
            color: white;
            text-align: center;
            padding: 2rem 0;
            margin-top: 4rem;
            border-radius: 20px 20px 0 0;
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

            .hero h1 {
                font-size: 2.5rem;
            }

            .section-title {
                font-size: 2rem;
            }

            .section-card {
                padding: 2rem;
                margin: 1rem;
            }

            .recipe-grid {
                grid-template-columns: 1fr;
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
                    <a href="#" class="logo-text">Koshef</a>
                </div>
                <nav id="nav">
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#recipes">Recipes</a>
                    <a href="#submit">Submit</a>
                    <a href="#rate">Rate</a>
                    <a href="#upload">Upload</a>
                    <a href="#contact">Contact</a>
                </nav>
                <button class="mobile-menu-btn" onclick="toggleMobileMenu()">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    </header>

    <main>
        <div class="container">
            <section id="home" class="hero fade-in-up">
                <h1>Welcome to Koshef</h1>
                <p>A vibrant community-driven platform where kosher cooking comes alive. Share your favorite recipes, discover new flavors, and connect with fellow food enthusiasts.</p>
                <a href="#recipes" class="btn btn-primary">Explore Recipes</a>
            </section>

            <section id="about" class="fade-in-up">
                <div class="section-card">
                    <h2 class="section-title">About Koshef</h2>
                    <p style="font-size: 1.1rem; line-height: 1.8; color: #555;">
                        Koshef is more than just a recipe collection – it's a thriving community where culinary traditions meet modern innovation. Our platform empowers home cooks to share their cherished family recipes, discover exciting new dishes, and maintain the rich heritage of kosher cuisine.
                    </p>
                    <p style="font-size: 1.1rem; line-height: 1.8; color: #555; margin-top: 1rem;">
                        Whether you're a seasoned chef or just starting your culinary journey, Koshef provides the tools and community support to make every meal meaningful and delicious.
                    </p>
                </div>
            </section>

            <section id="recipes" class="fade-in-up">
                <div class="section-card" style="background: rgba(255, 251, 239, 0.8);">
                    <h2 class="section-subtitle" style="color: #7A9E7E;">Explore Recipes</h2>
                    <p style="margin-bottom: 2rem; color: #666;">Discover amazing kosher recipes from our community of passionate cooks.</p>
                    
                    <div class="recipe-grid">
                        <div class="recipe-card">
                            <div class="recipe-image">Coming Soon</div>
                            <div class="recipe-content">
                                <h3 class="recipe-title">Traditional Challah</h3>
                                <p class="recipe-description">A classic braided bread perfect for Shabbat dinners.</p>
                            </div>
                        </div>
                        <div class="recipe-card">
                            <div class="recipe-image">Coming Soon</div>
                            <div class="recipe-content">
                                <h3 class="recipe-title">Matzo Ball Soup</h3>
                                <p class="recipe-description">Comfort food at its finest with fluffy matzo balls.</p>
                            </div>
                        </div>
                        <div class="recipe-card">
                            <div class="recipe-image">Coming Soon</div>
                            <div class="recipe-content">
                                <h3 class="recipe-title">Honey Cake</h3>
                                <p class="recipe-description">Sweet and moist cake perfect for celebrations.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="submit" class="fade-in-up">
                <div class="section-card">
                    <h2 class="section-subtitle" style="color: #C1694F;">Submit a Recipe</h2>
                    <p style="margin-bottom: 2rem; color: #666;">Share your favorite kosher recipe with our community.</p>
                    
                    <form class="form-container">
                        <div class="form-group">
                            <label for="recipe-name">Recipe Name</label>
                            <input type="text" id="recipe-name" placeholder="Enter your recipe name">
                        </div>
                        <div class="form-group">
                            <label for="ingredients">Ingredients</label>
                            <textarea id="ingredients" rows="5" placeholder="List your ingredients (one per line)"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="instructions">Instructions</label>
                            <textarea id="instructions" rows="6" placeholder="Step-by-step cooking instructions"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="notes">Additional Notes (Optional)</label>
                            <textarea id="notes" rows="3" placeholder="Any special tips or variations"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit Recipe</button>
                    </form>
                </div>
            </section>

            <section id="rate" class="fade-in-up">
                <div class="section-card" style="background: rgba(255, 251, 239, 0.8);">
                    <h2 class="section-subtitle" style="color: #7A9E7E;">Rate Recipes</h2>
                    <p style="color: #666; margin-bottom: 2rem;">Help others discover the best recipes by sharing your ratings and reviews.</p>
                    <div style="text-align: center; padding: 2rem; background: rgba(122, 158, 126, 0.1); border-radius: 12px;">
                        <h3 style="color: #7A9E7E; margin-bottom: 1rem;">Coming Soon!</h3>
                        <p style="color: #666;">Recipe rating and review system is in development.</p>
                    </div>
                </div>
            </section>

            <section id="upload" class="fade-in-up">
                <div class="section-card">
                    <h2 class="section-subtitle" style="color: #C1694F;">Upload Recipe Image</h2>
                    <p style="margin-bottom: 2rem; color: #666;">Add beautiful photos to make your recipes even more appealing.</p>
                    
                    <form class="form-container">
                        <div class="form-group">
                            <label for="recipe-id">Recipe ID</label>
                            <input type="text" id="recipe-id" placeholder="Enter the recipe ID">
                        </div>
                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" id="email" placeholder="your@email.com">
                        </div>
                        <div class="form-group">
                            <label for="image-upload">Choose Image</label>
                            <input type="file" id="image-upload" accept="image/*">
                        </div>
                        <button type="submit" class="btn btn-secondary">Upload Image</button>
                    </form>
                </div>
            </section>

            <section id="contact" class="fade-in-up">
                <div class="section-card" style="background: rgba(255, 251, 239, 0.8); text-align: center;">
                    <h2 class="section-subtitle" style="color: #7A9E7E;">Get in Touch</h2>
                    <p style="font-size: 1.1rem; margin-bottom: 1rem; color: #666;">
                        Have questions, suggestions, or just want to say hello?
                    </p>
                    <p style="font-size: 1.1rem; color: #7A9E7E; font-weight: 600;">
                        📧 support@koshef.ai
                    </p>
                </div>
            </section>
        </div>
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2025 Koshef.ai. All rights reserved. Made with ❤️ for the kosher cooking community.</p>
        </div>
    </footer>

    <script>
        function toggleMobileMenu() {
            const nav = document.getElementById('nav');
            nav.classList.toggle('active');
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

        // Add scroll effect to header
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

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in-up').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Form submission handlers
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Form submitted! (This is a demo - no actual submission occurred)');
            });
        });
    </script>
</body>
</html>
