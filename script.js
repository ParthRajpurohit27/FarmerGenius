// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Auto-hide navigation functionality
    let navTimeout;
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    
    // Only set up navigation if elements exist
    if (navbar && navToggle) {
        // Auto-hide navigation after 3 seconds of inactivity
        function startNavTimeout() {
            clearTimeout(navTimeout);
            navTimeout = setTimeout(() => {
                if (navbar.classList.contains('active')) {
                    hideNavigation();
                }
            }, 3000);
        }
        
        // Show navigation when hovering over toggle area
        navToggle.addEventListener('mouseenter', function() {
            if (!navbar.classList.contains('active')) {
                showNavigation();
            }
        });
        
        // Keep navigation open when hovering over it
        navbar.addEventListener('mouseenter', function() {
            clearTimeout(navTimeout);
        });
        
        // Start timeout when leaving navigation
        navbar.addEventListener('mouseleave', function() {
            startNavTimeout();
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', function() {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        // Add active class to clicked link
        this.classList.add('active');
        
        // Hide navigation after clicking a link
        setTimeout(hideNavigation, 500);
    }));

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Skip if href is just "#" or empty
            if (href === '#' || href === '#!') {
                return;
            }
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced scroll effects
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const rate = scrolled * -0.5;
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
        
        // Show/hide navigation toggle based on scroll (only if navToggle exists)
        if (navToggle) {
            if (scrolled > 100) {
                navToggle.style.opacity = '0.8';
            } else {
                navToggle.style.opacity = '1';
            }
        }
    });
    
    // Counter animation for statistics
    const counters = document.querySelectorAll('.stat-number');
    const counterObserverOptions = {
        threshold: 0.7
    };
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const count = +counter.innerText;
                const increment = target / 100;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(() => {
                        counterObserver.observe(counter);
                    }, 20);
                } else {
                    counter.innerText = target;
                    if (target === 99) {
                        counter.innerText = target + '%';
                    } else if (target === 10000) {
                        counter.innerText = target + '+';
                    }
                }
            }
        });
    }, counterObserverOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('loading');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.tool-card, .scheme-card, .timeline-item, .feature-card, .about-card, .stat-item').forEach(el => {
        observer.observe(el);
    });
    
    // Add loading message
    console.log('Farmer Genius website loaded successfully! 🌱');
    console.log('All interactive features are ready to use.');
    
    // Performance logging
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Website loaded in ${loadTime.toFixed(2)}ms`);
    });
});

// Seed Quality Checker Function
function checkSeedQuality() {
    const seed = document.getElementById('seed-select').value;
    const resultDiv = document.getElementById('seed-quality-result');

    if (!seed) {
        showResult(resultDiv, 'Please select a seed type.', 'error');
        return;
    }

    const seedQualityData = {
        wheat: {
            tests: [
                {
                    name: "Float Test",
                    description: "Take a glass of water, put wheat seeds inside. Good seeds sink, bad seeds float."
                },
                {
                    name: "Germination Test", 
                    description: "Place 100 seeds in moist cloth. After 7 days, count germinated seeds. If more than 80 grow, quality is good."
                },
                {
                    name: "Color & Size",
                    description: "Healthy wheat seeds are uniform in size and golden-brown in color. Avoid shriveled or discolored seeds."
                }
            ]
        },
        rice: {
            tests: [
                {
                    name: "Salt Water Test",
                    description: "Mix 2 spoons of salt in water. Drop rice seeds. Good seeds sink to bottom."
                },
                {
                    name: "Purity Check",
                    description: "Remove broken or shriveled seeds; only full grains should be kept for planting."
                },
                {
                    name: "Moisture Test",
                    description: "Good rice seeds should have 12-14% moisture. Bite test - good seeds make cracking sound."
                }
            ]
        },
        corn: {
            tests: [
                {
                    name: "Physical Inspection",
                    description: "Select plump, well-filled kernels. Avoid cracked, moldy, or insect-damaged seeds."
                },
                {
                    name: "Germination Test",
                    description: "Place 100 seeds between wet paper towels. After 7 days, 85+ should germinate for good quality."
                },
                {
                    name: "Vigor Test",
                    description: "Good corn/maize seeds are bright yellow/orange, uniform in size, and have hard texture."
                }
            ]
        },
        cotton: {
            tests: [
                {
                    name: "Acid Delinting Check",
                    description: "Quality cotton seeds are properly delinted with smooth surface, no fuzzy material."
                },
                {
                    name: "Size Uniformity",
                    description: "Select seeds of uniform size. Discard very small or very large seeds."
                },
                {
                    name: "Viability Test",
                    description: "Cut test - good cotton seeds have white, firm cotyledons inside."
                }
            ]
        },
        mustard: {
            tests: [
                {
                    name: "Color Test",
                    description: "Good mustard seeds are dark brown to black, shiny, and uniform in color."
                },
                {
                    name: "Oil Content Check",
                    description: "Press seeds between fingers - good seeds release oil and have strong aroma."
                },
                {
                    name: "Purity Test",
                    description: "Remove broken seeds, stones, and other crop seeds. 98% purity is ideal."
                }
            ]
        },
        soybean: {
            tests: [
                {
                    name: "Visual Inspection",
                    description: "Good soybean seeds are cream to light yellow, plump, and free from cracks."
                },
                {
                    name: "Split Test", 
                    description: "Split seeds to check - good seeds have white to cream colored cotyledons."
                },
                {
                    name: "Water Absorption",
                    description: "Soak 100 seeds in water for 4 hours. Good seeds absorb water and swell uniformly."
                }
            ]
        },
        groundnut: {
            tests: [
                {
                    name: "Shell Removal",
                    description: "Remove shells carefully. Good groundnut seeds are pink to red with thin seed coat."
                },
                {
                    name: "Float Test",
                    description: "In water, good groundnut seeds sink. Floating seeds are likely damaged or immature."
                },
                {
                    name: "Crush Test",
                    description: "Good seeds are firm and don't crush easily. Avoid soft or spongy seeds."
                }
            ]
        },
        sugarcane: {
            tests: [
                {
                    name: "Bud Viability",
                    description: "Check 3-bud setts. Buds should be plump, fresh, and not dried or damaged."
                },
                {
                    name: "Node Quality",
                    description: "Select setts from middle portion of cane, 8-10 months old with healthy nodes."
                },
                {
                    name: "Disease Check",
                    description: "Avoid setts with red rot, smut, or other disease symptoms. Use disease-free mother plants."
                }
            ]
        },
        pulses: {
            tests: [
                {
                    name: "Seed Coat Check",
                    description: "Good pulse seeds have intact, smooth seed coat without cracks or holes."
                },
                {
                    name: "Weevil Test",
                    description: "Check for insect holes. Avoid seeds with small round holes indicating weevil damage."
                },
                {
                    name: "Age Test",
                    description: "Fresh pulse seeds are bright colored. Old seeds become dull and have poor germination."
                }
            ]
        },
        vegetables: {
            tests: [
                {
                    name: "Size Grading",
                    description: "Select uniform sized seeds. Very small or very large seeds often have poor germination."
                },
                {
                    name: "Moisture Check",
                    description: "Good vegetable seeds should be dry (8-12% moisture) and make rattling sound in packet."
                },
                {
                    name: "Germination Test",
                    description: "Test germination on wet paper. 80%+ germination indicates good quality seeds."
                }
            ]
        },
        chickpea: {
            tests: [
                {
                    name: "Seed Coat Check",
                    description: "Good chickpea seeds have intact, wrinkle-free seed coat. Avoid seeds with cracks or holes."
                },
                {
                    name: "Weevil Test",
                    description: "Check for insect holes. Avoid seeds with small round holes indicating weevil damage."
                },
                {
                    name: "Color & Size",
                    description: "Fresh chickpea seeds are cream to brown colored, uniform in size. Avoid discolored or shriveled seeds."
                }
            ]
        },
        lentil: {
            tests: [
                {
                    name: "Physical Inspection",
                    description: "Good lentil seeds are flat, disc-shaped with intact seed coat. Avoid broken or damaged seeds."
                },
                {
                    name: "Color Test",
                    description: "Fresh lentils are bright colored (red, green, or brown). Avoid dull or faded seeds."
                },
                {
                    name: "Purity Check",
                    description: "Remove stones, other seeds, and broken lentils. Aim for 98% purity."
                }
            ]
        },
        pigeon_pea: {
            tests: [
                {
                    name: "Seed Coat Check",
                    description: "Good pigeon pea seeds have smooth, intact seed coat without cracks or splits."
                },
                {
                    name: "Float Test",
                    description: "In water, good seeds sink. Floating seeds are likely damaged or hollow."
                },
                {
                    name: "Germination Test",
                    description: "Place 100 seeds in moist cloth. After 7 days, 80+ should germinate for good quality."
                }
            ]
        },
        black_gram: {
            tests: [
                {
                    name: "Visual Inspection",
                    description: "Good black gram seeds are black/dark green, uniform size with shiny appearance."
                },
                {
                    name: "Weevil Test",
                    description: "Check for small holes. Avoid seeds with weevil damage or insect infestation."
                },
                {
                    name: "Age Test",
                    description: "Fresh seeds have good shine. Old seeds become dull and have poor germination."
                }
            ]
        },
        green_gram: {
            tests: [
                {
                    name: "Color & Shine",
                    description: "Good green gram (moong) seeds are bright green with natural shine."
                },
                {
                    name: "Size Uniformity",
                    description: "Select uniform sized seeds. Remove very small or damaged seeds."
                },
                {
                    name: "Water Test",
                    description: "Soak 100 seeds for 4 hours. Good seeds absorb water and swell uniformly."
                }
            ]
        },
        tomato: {
            tests: [
                {
                    name: "Flat Seed Test",
                    description: "Good tomato seeds are flat, not plump. Plump seeds may indicate incomplete drying."
                },
                {
                    name: "Fuzzy Coat Check",
                    description: "Quality tomato seeds have fine fuzzy coating. Very smooth seeds may be old."
                },
                {
                    name: "Germination Test",
                    description: "Test on wet paper - 80%+ germination in 7-10 days indicates good quality."
                }
            ]
        },
        potato: {
            tests: [
                {
                    name: "Tuber Selection",
                    description: "Select disease-free potato tubers, 30-40g size, with 2-3 eyes for planting."
                },
                {
                    name: "Sprouting Check",
                    description: "Good seed potatoes have short, firm sprouts. Avoid long, weak sprouts."
                },
                {
                    name: "Disease Inspection",
                    description: "Check for black scurf, soft rot, or blight. Use only healthy, certified seed tubers."
                }
            ]
        },
        onion: {
            tests: [
                {
                    name: "Seed Appearance",
                    description: "Good onion seeds are black, shiny, and angular shaped. Avoid dull or gray seeds."
                },
                {
                    name: "Moisture Test",
                    description: "Seeds should be dry (8-10% moisture) and make rattling sound in packet."
                },
                {
                    name: "Germination Test",
                    description: "Test 100 seeds on wet paper. 70%+ germination indicates acceptable quality."
                }
            ]
        },
        chili: {
            tests: [
                {
                    name: "Seed Color",
                    description: "Good chili seeds are pale yellow to cream colored. Avoid dark or discolored seeds."
                },
                {
                    name: "Flatness Check",
                    description: "Quality chili seeds are flat and disc-shaped. Avoid plump or rounded seeds."
                },
                {
                    name: "Viability Test",
                    description: "Soak seeds for 24 hours. Good seeds sink and swell uniformly."
                }
            ]
        },
        brinjal: {
            tests: [
                {
                    name: "Physical Inspection",
                    description: "Good brinjal seeds are flat, cream colored with smooth surface."
                },
                {
                    name: "Size Grading",
                    description: "Select uniform sized seeds. Very small seeds often have poor germination."
                },
                {
                    name: "Germination Test",
                    description: "Test on wet paper - 75%+ germination in 10-12 days is acceptable."
                }
            ]
        },
        okra: {
            tests: [
                {
                    name: "Seed Appearance",
                    description: "Good okra seeds are round, gray to dark brown, and hard textured."
                },
                {
                    name: "Hardness Test",
                    description: "Quality okra seeds are hard. Soft seeds may be old or poorly stored."
                },
                {
                    name: "Water Absorption",
                    description: "Soak 100 seeds for 12 hours. Good seeds absorb water and swell."
                }
            ]
        },
        cabbage: {
            tests: [
                {
                    name: "Seed Size",
                    description: "Good cabbage seeds are small, round, dark brown to black in color."
                },
                {
                    name: "Purity Check",
                    description: "Remove broken seeds and debris. Aim for high purity (98%+)."
                },
                {
                    name: "Germination Test",
                    description: "Test on wet paper - 80%+ germination in 5-7 days indicates good quality."
                }
            ]
        },
        cauliflower: {
            tests: [
                {
                    name: "Visual Inspection",
                    description: "Good cauliflower seeds are small, round, dark brown with smooth surface."
                },
                {
                    name: "Moisture Content",
                    description: "Seeds should be dry (8-10% moisture) and free from fungal growth."
                },
                {
                    name: "Germination Test",
                    description: "Test 100 seeds - 80%+ germination in 5-7 days is good quality."
                }
            ]
        },
        carrot: {
            tests: [
                {
                    name: "Seed Structure",
                    description: "Good carrot seeds are elongated with small spines. Remove spineless seeds."
                },
                {
                    name: "Aroma Test",
                    description: "Fresh carrot seeds have characteristic aroma. Old seeds lose their smell."
                },
                {
                    name: "Germination Test",
                    description: "Test on wet paper - 65%+ germination in 10-15 days is acceptable."
                }
            ]
        },
        radish: {
            tests: [
                {
                    name: "Seed Appearance",
                    description: "Good radish seeds are round, reddish-brown, and uniform in size."
                },
                {
                    name: "Size Selection",
                    description: "Select bold seeds. Very small seeds have poor germination."
                },
                {
                    name: "Viability Test",
                    description: "Test germination - 80%+ in 4-6 days indicates good quality seeds."
                }
            ]
        },
        spinach: {
            tests: [
                {
                    name: "Seed Type",
                    description: "Good spinach seeds are triangular or round shaped, cream to light brown."
                },
                {
                    name: "Moisture Check",
                    description: "Seeds should be dry and free from fungal contamination."
                },
                {
                    name: "Germination Test",
                    description: "Test 100 seeds - 70%+ germination in 7-10 days is acceptable."
                }
            ]
        },
        sunflower: {
            tests: [
                {
                    name: "Seed Appearance",
                    description: "Good sunflower seeds are black/striped, plump, and well-filled."
                },
                {
                    name: "Weight Test",
                    description: "Quality seeds are heavy. Light seeds are hollow or poorly developed."
                },
                {
                    name: "Germination Test",
                    description: "Place 100 seeds in moist cloth. After 7 days, 85+ should germinate."
                }
            ]
        },
        sesame: {
            tests: [
                {
                    name: "Color Check",
                    description: "Good sesame seeds are white, black, or brown (variety dependent), uniform color."
                },
                {
                    name: "Oil Content",
                    description: "Press seeds between fingers - good seeds release oil and have nutty aroma."
                },
                {
                    name: "Purity Test",
                    description: "Remove broken seeds, stones, and other materials. 98% purity is ideal."
                }
            ]
        },
        safflower: {
            tests: [
                {
                    name: "Seed Inspection",
                    description: "Good safflower seeds are white, oval shaped, and well-filled."
                },
                {
                    name: "Weight Check",
                    description: "Quality seeds are heavy and plump. Light seeds are immature or damaged."
                },
                {
                    name: "Germination Test",
                    description: "Test 100 seeds - 80%+ germination in 7-10 days indicates good quality."
                }
            ]
        },
        castor: {
            tests: [
                {
                    name: "Physical Inspection",
                    description: "Good castor seeds are oval, shiny, mottled brown-gray with smooth surface."
                },
                {
                    name: "Size Uniformity",
                    description: "Select bold, uniform sized seeds. Avoid small or shriveled seeds."
                },
                {
                    name: "Float Test",
                    description: "In water, good castor seeds sink. Floating seeds are likely hollow or damaged."
                }
            ]
        },
        barley: {
            tests: [
                {
                    name: "Grain Fullness",
                    description: "Good barley seeds are plump, well-filled with intact husk."
                },
                {
                    name: "Color Test",
                    description: "Quality barley is golden-yellow color. Avoid dark or discolored grains."
                },
                {
                    name: "Germination Test",
                    description: "Place 100 seeds in moist cloth. After 5 days, 85+ should germinate."
                }
            ]
        },
        pearl_millet: {
            tests: [
                {
                    name: "Seed Appearance",
                    description: "Good pearl millet seeds are round, gray to white, and uniform in size."
                },
                {
                    name: "Hardness Test",
                    description: "Quality seeds are hard. Bite test - good seeds make cracking sound."
                },
                {
                    name: "Purity Check",
                    description: "Remove broken seeds and other materials. 98% purity is recommended."
                }
            ]
        }
    };

    const seedInfo = seedQualityData[seed];
    const testsHTML = seedInfo.tests.map(test => `
        <div style="margin-bottom: 15px; padding: 10px; background: #f0f8f0; border-left: 4px solid var(--primary-green); border-radius: 5px;">
            <h5 style="color: var(--primary-green); margin-bottom: 5px;">${test.name}</h5>
            <p style="margin: 0; font-size: 0.9rem;">${test.description}</p>
        </div>
    `).join('');

    const resultHTML = `
        <div style="text-align: left;">
            <h4 style="color: var(--primary-green); margin-bottom: 15px;">Quality Tests for ${seed.charAt(0).toUpperCase() + seed.slice(1)} Seeds:</h4>
            ${testsHTML}
            <div style="margin-top: 15px; padding: 10px; background: #fff3cd; border-radius: 5px; font-size: 0.9rem;">
                <strong>💡 Tip:</strong> Always buy certified seeds from authorized dealers for best results.
            </div>
            <div style="margin-top: 10px; padding: 8px; background: #f8f9fa; border-radius: 4px; font-size: 0.8rem; color: #666;">
                <strong>⚠️ Disclaimer:</strong> Quality tests are general guidelines. Seed standards may vary by region. For certified quality assurance, consult local seed certification agencies.
            </div>
        </div>
    `;

    showResult(resultDiv, resultHTML, 'success');
}

// Function to populate disease dropdown based on selected crop
function populateDiseaseDropdown() {
    const crop = document.getElementById('disease-crop-select').value;
    const diseaseSelect = document.getElementById('disease-select');
    
    if (!crop) {
        diseaseSelect.disabled = true;
        diseaseSelect.innerHTML = '<option value="">First select a crop / पहले फसल चुनें</option>';
        return;
    }

    const diseaseDatabase = [
        // Rice Diseases
        { crop: 'rice', disease: 'Blast', symptoms: 'Small brown spots on leaves, spreading quickly', identification: 'Spots enlarge into diamond-shaped lesions. Crop looks burned.', solution: 'Use resistant seed varieties; spray tricyclazole fungicide.' },
        { crop: 'rice', disease: 'Brown Spot', symptoms: 'Small brown spots with yellow halo on leaves', identification: 'Spots are circular, brown center with yellow margin', solution: 'Improve field drainage, spray mancozeb fungicide.' },
        { crop: 'rice', disease: 'Bacterial Blight', symptoms: 'Water-soaked lesions on leaf tips', identification: 'Lesions turn yellow then brown, spread along leaf margins', solution: 'Use copper-based bactericides, plant resistant varieties.' },
        { crop: 'rice', disease: 'Sheath Blight', symptoms: 'Oval lesions on leaf sheath near water level', identification: 'Gray-green lesions with brown borders', solution: 'Reduce plant density, apply validamycin fungicide.' },
        { crop: 'rice', disease: 'False Smut', symptoms: 'Orange powder masses replace individual rice grains', identification: 'Individual grains become large orange balls', solution: 'Use copper oxychloride, avoid over-fertilization.' },
        { crop: 'rice', disease: 'Stem Borer', symptoms: 'Dead hearts in vegetative stage, white ears at reproductive stage', identification: 'Central shoot dies, larvae inside stem', solution: 'Use pheromone traps, spray cartap hydrochloride.' },
        { crop: 'rice', disease: 'Tungro Virus', symptoms: 'Yellow-orange discoloration of leaves, stunted growth', identification: 'Leaves turn yellow-orange from tip, plant stunted', solution: 'Control green leafhopper vectors, remove infected plants.' },

        // Wheat Diseases  
        { crop: 'wheat', disease: 'Rust', symptoms: 'Yellow-orange powder on leaves', identification: 'Powder rubs off easily on hand, appears as pustules', solution: 'Remove infected leaves, use fungicide (propiconazole).' },
        { crop: 'wheat', disease: 'Loose Smut', symptoms: 'Black powdery masses replace wheat grains', identification: 'Entire head becomes black powder at maturity', solution: 'Use systemic fungicide seed treatment.' },
        { crop: 'wheat', disease: 'Karnal Bunt', symptoms: 'Fishy smell from grains, partial black powder in grains', identification: 'Only part of grain affected, strong fishy odor', solution: 'Use seed treatment with tebuconazole.' },
        { crop: 'wheat', disease: 'Powdery Mildew', symptoms: 'White powdery coating on leaves', identification: 'White flour-like coating, mainly on upper leaf surface', solution: 'Spray sulfur-based fungicide, improve air circulation.' },
        { crop: 'wheat', disease: 'Septoria Blight', symptoms: 'Small brown spots with dark centers on leaves', identification: 'Spots have dark pycnidia (small black dots) in center', solution: 'Use fungicides like chlorothalonil, practice crop rotation.' },
        { crop: 'wheat', disease: 'Aphids', symptoms: 'Curled leaves, sticky honeydew on leaves', identification: 'Small green/black insects in colonies on leaves', solution: 'Spray imidacloprid or thiamethoxam.' },
        { crop: 'wheat', disease: 'Termites', symptoms: 'Wilting plants, hollow stems at base', identification: 'White ants eating roots and stem base', solution: 'Apply chlorpyrifos to soil, use resistant varieties.' },

        // Corn/Maize Diseases
        { crop: 'corn', disease: 'Corn Borer', symptoms: 'Holes in stalks and ears, sawdust-like frass', identification: 'Small holes with larvae inside stalks', solution: 'Use Bt corn, apply chemical insecticides during early stages.' },
        { crop: 'corn', disease: 'Leaf Blight', symptoms: 'Long grayish lesions on leaves', identification: 'Boat-shaped lesions, gray center with dark borders', solution: 'Plant resistant varieties, spray mancozeb fungicide.' },
        { crop: 'corn', disease: 'Downy Mildew', symptoms: 'Yellow stripes on leaves, white growth on undersides', identification: 'Parallel yellow stripes, white fuzzy growth underneath', solution: 'Use metalaxyl seed treatment, improve drainage.' },
        { crop: 'corn', disease: 'Common Smut', symptoms: 'Large grayish galls on ears, tassels, or stalks', identification: 'Tumor-like growths that burst open releasing black spores', solution: 'Remove and destroy affected plants, avoid high nitrogen.' },
        { crop: 'corn', disease: 'Armyworm', symptoms: 'Holes in leaves, complete defoliation in severe cases', identification: 'Green caterpillars with stripes, feeding in groups', solution: 'Use pheromone traps, spray insecticides like chlorpyrifos.' },
        { crop: 'corn', disease: 'Rust', symptoms: 'Orange-brown pustules on leaves', identification: 'Small raised spots that release rust-colored spores', solution: 'Plant resistant hybrids, spray propiconazole if severe.' },
        { crop: 'corn', disease: 'Cutworm', symptoms: 'Seedlings cut at soil level', identification: 'Gray/brown caterpillars in soil, plants cut cleanly', solution: 'Apply chlorpyrifos dust around base of plants.' },

        // Cotton Diseases
        { crop: 'cotton', disease: 'Bollworm', symptoms: 'Holes in cotton bolls, larvae inside', identification: 'Small green/brown larvae inside bolls, circular holes', solution: 'Use pheromone traps, spray bio-pesticide (Bt).' },
        { crop: 'cotton', disease: 'Wilt', symptoms: 'Yellowing and wilting of plants, vascular browning', identification: 'Plants wilt despite adequate moisture, brown vascular tissue', solution: 'Plant wilt-resistant varieties, improve soil drainage.' },
        { crop: 'cotton', disease: 'Aphids', symptoms: 'Curled leaves, sticky honeydew, stunted growth', identification: 'Small green insects on undersides of leaves', solution: 'Use insecticidal soap, encourage beneficial insects.' },
        { crop: 'cotton', disease: 'Thrips', symptoms: 'Silver patches on leaves, stunted plant growth', identification: 'Tiny insects causing silvering of leaf surface', solution: 'Use blue sticky traps, spray neem oil or imidacloprid.' },
        { crop: 'cotton', disease: 'Red Spider Mite', symptoms: 'Yellow speckling on leaves, fine webbing', identification: 'Tiny red mites on undersides, fine silk webbing', solution: 'Increase humidity, use miticides like abamectin.' },
        { crop: 'cotton', disease: 'Whitefly', symptoms: 'Yellow leaves, sooty mold, virus transmission', identification: 'Tiny white flies on leaf undersides', solution: 'Use yellow sticky traps, spray buprofezin.' },
        { crop: 'cotton', disease: 'Jassids', symptoms: 'Leaf edges turn yellow then brown, hopper burn', identification: 'Green leafhopper insects, V-shaped yellowing', solution: 'Spray imidacloprid or thiamethoxam.' },

        // Sugarcane Diseases
        { crop: 'sugarcane', disease: 'Red Rot', symptoms: 'Red discoloration inside stalks, sour smell', identification: 'Internal reddening with cross-bands, alcoholic odor', solution: 'Plant resistant varieties, use healthy seed material.' },
        { crop: 'sugarcane', disease: 'Smut', symptoms: 'Black whip-like structures from growing points', identification: 'Long black whips emerging from shoots', solution: 'Remove affected tillers, plant disease-free setts.' },
        { crop: 'sugarcane', disease: 'Yellow Leaf', symptoms: 'Yellowing of midrib, premature leaf death', identification: 'Bright yellow midrib, spreading to entire leaf', solution: 'Use virus-free planting material, control aphid vectors.' },
        { crop: 'sugarcane', disease: 'Mosaic', symptoms: 'Light and dark green patches on leaves', identification: 'Mosaic pattern of light and dark green areas', solution: 'Plant resistant varieties, control aphid vectors.' },
        { crop: 'sugarcane', disease: 'Scale Insect', symptoms: 'White waxy scales on stalks, yellowing', identification: 'White cotton-like scales attached to stalks', solution: 'Spray malathion or use systemic insecticides.' },
        { crop: 'sugarcane', disease: 'Top Borer', symptoms: 'Dead heart, bunchy top appearance', identification: 'Central shoot dies, multiple side shoots emerge', solution: 'Remove and destroy affected tillers, spray chlorpyrifos.' },
        { crop: 'sugarcane', disease: 'Woolly Aphid', symptoms: 'White woolly masses on leaves and stalks', identification: 'White cotton-like aphid colonies', solution: 'Spray dimethoate or imidacloprid.' },

        // Tomato Diseases
        { crop: 'tomato', disease: 'Early Blight', symptoms: 'Dark brown spots with concentric rings on lower leaves', identification: 'Target-like lesions, leaves turn yellow and drop', solution: 'Remove affected leaves, spray mancozeb or chlorothalonil.' },
        { crop: 'tomato', disease: 'Late Blight', symptoms: 'Water-soaked lesions on leaves and fruits', identification: 'Gray-white fungal growth on undersides, rapid spread', solution: 'Spray metalaxyl + mancozeb, destroy infected plants.' },
        { crop: 'tomato', disease: 'Bacterial Wilt', symptoms: 'Sudden wilting without yellowing', identification: 'Plant wilts rapidly, bacterial ooze from cut stems', solution: 'Remove infected plants, use resistant varieties, improve drainage.' },
        { crop: 'tomato', disease: 'Fruit Borer', symptoms: 'Holes in fruits with larvae inside', identification: 'Circular entry holes, caterpillar damage inside fruits', solution: 'Use pheromone traps, spray spinosad or Bt.' },
        { crop: 'tomato', disease: 'Leaf Curl Virus', symptoms: 'Upward curling of leaves, stunted growth', identification: 'Leaves curl upward and inward, plant becomes bushy', solution: 'Control whitefly vectors, remove infected plants.' },
        { crop: 'tomato', disease: 'Septoria Leaf Spot', symptoms: 'Small dark spots with gray centers on leaves', identification: 'Circular spots with tiny black dots in center', solution: 'Remove lower leaves, spray copper fungicides.' },
        { crop: 'tomato', disease: 'Whitefly', symptoms: 'Yellow leaves, sticky honeydew, virus transmission', identification: 'Tiny white insects on leaf undersides', solution: 'Use yellow sticky traps, spray buprofezin or spiromesifen.' },

        // Potato Diseases
        { crop: 'potato', disease: 'Late Blight', symptoms: 'Water-soaked lesions on leaves, brown patches', identification: 'Rapid spread, white fungal growth on undersides', solution: 'Spray metalaxyl + mancozeb, destroy affected plants.' },
        { crop: 'potato', disease: 'Early Blight', symptoms: 'Brown spots with concentric rings on older leaves', identification: 'Target-like spots, leaves yellow and drop', solution: 'Spray mancozeb or chlorothalonil, practice crop rotation.' },
        { crop: 'potato', disease: 'Black Scurf', symptoms: 'Black sclerotia on tuber surface', identification: 'Black crusty patches on potato skin', solution: 'Use disease-free seed, treat with mancozeb.' },
        { crop: 'potato', disease: 'Aphids', symptoms: 'Curled leaves, sticky honeydew, virus spread', identification: 'Small green/black insects in colonies', solution: 'Spray imidacloprid or thiamethoxam.' },
        { crop: 'potato', disease: 'Potato Beetle', symptoms: 'Holes in leaves, defoliation', identification: 'Yellow-orange beetles with black stripes', solution: 'Hand-pick beetles, spray spinosad or neem oil.' },
        { crop: 'potato', disease: 'Wilt', symptoms: 'Wilting of plants, brown vascular tissue', identification: 'Plant wilts despite watering, brown streaks in stem', solution: 'Use resistant varieties, improve soil drainage.' },
        { crop: 'potato', disease: 'Tuber Moth', symptoms: 'Tunnels in tubers, larvae inside', identification: 'Small holes with pink larvae inside potatoes', solution: 'Earth up properly, store in cool dark place.' },

        // Onion Diseases
        { crop: 'onion', disease: 'Purple Blotch', symptoms: 'Purple spots on leaves and bulbs', identification: 'Purple lesions with concentric rings', solution: 'Spray mancozeb or copper oxychloride.' },
        { crop: 'onion', disease: 'Downy Mildew', symptoms: 'Yellow patches on leaves, gray growth', identification: 'Yellow areas with gray fuzzy growth on undersides', solution: 'Improve air circulation, spray metalaxyl + mancozeb.' },
        { crop: 'onion', disease: 'Thrips', symptoms: 'Silver streaks on leaves, distorted growth', identification: 'Tiny insects, leaves have silvery appearance', solution: 'Spray imidacloprid or fipronil.' },
        { crop: 'onion', disease: 'Basal Rot', symptoms: 'Rotting from base of bulb, watery decay', identification: 'Soft rot at bulb base, foul smell', solution: 'Use disease-free sets, improve drainage.' },
        { crop: 'onion', disease: 'Stemphylium Blight', symptoms: 'Small yellow spots that turn brown', identification: 'Elongated brown lesions on leaves', solution: 'Spray iprodione or azoxystrobin.' },

        // Chili Diseases
        { crop: 'chili', disease: 'Anthracnose', symptoms: 'Sunken dark spots on fruits', identification: 'Circular lesions with pink spore masses', solution: 'Spray copper fungicides or azoxystrobin.' },
        { crop: 'chili', disease: 'Powdery Mildew', symptoms: 'White powdery coating on leaves', identification: 'White powder on upper leaf surfaces', solution: 'Spray sulfur or potassium bicarbonate.' },
        { crop: 'chili', disease: 'Bacterial Wilt', symptoms: 'Sudden wilting of entire plant', identification: 'Plant wilts rapidly, bacterial ooze from stems', solution: 'Remove infected plants, use resistant varieties.' },
        { crop: 'chili', disease: 'Leaf Curl', symptoms: 'Upward curling and puckering of leaves', identification: 'Leaves curl upward, reduced leaf size', solution: 'Control aphid and whitefly vectors.' },
        { crop: 'chili', disease: 'Thrips', symptoms: 'Silvering of leaves, deformed fruits', identification: 'Tiny insects, silver streaks on leaves', solution: 'Use blue sticky traps, spray spinosad.' },
        { crop: 'chili', disease: 'Fruit Borer', symptoms: 'Holes in fruits with larvae', identification: 'Caterpillars boring into fruits', solution: 'Use pheromone traps, spray Bt or chlorantraniliprole.' },

        // Brinjal (Eggplant) Diseases
        { crop: 'brinjal', disease: 'Shoot and Fruit Borer', symptoms: 'Wilted shoots, holes in fruits', identification: 'Bored shoots droop, larvae in fruits', solution: 'Remove affected parts, spray spinosad or chlorantraniliprole.' },
        { crop: 'brinjal', disease: 'Bacterial Wilt', symptoms: 'Sudden wilting without yellowing', identification: 'Rapid wilting, bacterial ooze from cut stems', solution: 'Use resistant varieties, practice crop rotation.' },
        { crop: 'brinjal', disease: 'Little Leaf', symptoms: 'Small leaves, bushy appearance, no flowering', identification: 'Abnormally small leaves, excessive branching', solution: 'Control leafhopper vectors, remove infected plants.' },
        { crop: 'brinjal', disease: 'Phomopsis Blight', symptoms: 'Round spots on leaves and fruits', identification: 'Circular lesions with concentric rings', solution: 'Spray mancozeb or copper oxychloride.' },
        { crop: 'brinjal', disease: 'Whitefly', symptoms: 'Yellow leaves, sooty mold, virus spread', identification: 'Tiny white flies on undersides', solution: 'Use yellow traps, spray buprofezin.' },

        // Okra Diseases
        { crop: 'okra', disease: 'Yellow Vein Mosaic', symptoms: 'Yellow veins, stunted growth, small fruits', identification: 'Bright yellow veins on leaves', solution: 'Control whitefly vectors, use resistant varieties.' },
        { crop: 'okra', disease: 'Powdery Mildew', symptoms: 'White powdery coating on leaves', identification: 'White powder on both leaf surfaces', solution: 'Spray sulfur or potassium bicarbonate.' },
        { crop: 'okra', disease: 'Fruit and Shoot Borer', symptoms: 'Holes in fruits and wilted shoots', identification: 'Caterpillars inside fruits and shoots', solution: 'Remove affected parts, spray chlorantraniliprole.' },
        { crop: 'okra', disease: 'Aphids', symptoms: 'Curled leaves, sticky honeydew', identification: 'Small green insects in colonies', solution: 'Spray imidacloprid or insecticidal soap.' },
        { crop: 'okra', disease: 'Jassids', symptoms: 'Yellowing and curling of leaf edges', identification: 'Green leafhoppers, hopper burn symptoms', solution: 'Spray thiamethoxam or fipronil.' },

        // Chickpea Diseases
        { crop: 'chickpea', disease: 'Wilt', symptoms: 'Yellowing and drooping, vascular browning', identification: 'Plant wilts progressively, brown vascular tissue', solution: 'Use wilt-resistant varieties, treat seeds with carbendazim.' },
        { crop: 'chickpea', disease: 'Blight', symptoms: 'Water-soaked lesions on all plant parts', identification: 'Brown lesions on leaves, stems, and pods', solution: 'Spray mancozeb or copper oxychloride.' },
        { crop: 'chickpea', disease: 'Dry Root Rot', symptoms: 'Yellowing, premature drying of plants', identification: 'Dry rot of roots, plants die early', solution: 'Deep summer plowing, seed treatment with Trichoderma.' },
        { crop: 'chickpea', disease: 'Pod Borer', symptoms: 'Holes in pods, damaged seeds', identification: 'Caterpillars feeding on pods and seeds', solution: 'Use pheromone traps, spray spinosad.' },

        // Mustard Diseases
        { crop: 'mustard', disease: 'White Rust', symptoms: 'White pustules on leaves and stems', identification: 'Raised white spots that burst releasing white powder', solution: 'Spray metalaxyl + mancozeb.' },
        { crop: 'mustard', disease: 'Alternaria Blight', symptoms: 'Dark brown spots with concentric rings', identification: 'Circular spots on leaves and pods', solution: 'Spray mancozeb or iprodione.' },
        { crop: 'mustard', disease: 'Downy Mildew', symptoms: 'Yellow patches with gray growth underneath', identification: 'Yellow areas on upper surface, gray fuzz below', solution: 'Spray copper oxychloride or metalaxyl.' },
        { crop: 'mustard', disease: 'Aphids', symptoms: 'Curled leaves, sticky honeydew, stunted growth', identification: 'Green/black insects in dense colonies', solution: 'Spray dimethoate or imidacloprid.' },
        { crop: 'mustard', disease: 'Sawfly', symptoms: 'Defoliation, skeletonized leaves', identification: 'Green caterpillars feeding on leaves', solution: 'Spray chlorpyrifos or quinalphos.' },

        // Soybean Diseases
        { crop: 'soybean', disease: 'Rust', symptoms: 'Small reddish-brown pustules on leaves', identification: 'Rust-colored spores that rub off on fingers', solution: 'Spray triazole fungicides like tebuconazole.' },
        { crop: 'soybean', disease: 'Bacterial Blight', symptoms: 'Brown spots with yellow halos', identification: 'Water-soaked lesions that turn brown', solution: 'Use disease-free seeds, spray copper-based bactericides.' },
        { crop: 'soybean', disease: 'Stem Fly', symptoms: 'Wilted shoots, tunnels in stems', identification: 'Small maggots inside young stems', solution: 'Spray chlorpyrifos at early vegetative stage.' },
        { crop: 'soybean', disease: 'Pod Borer', symptoms: 'Holes in pods, damaged seeds', identification: 'Caterpillars feeding on developing pods', solution: 'Use pheromone traps, spray quinalphos.' },
        { crop: 'soybean', disease: 'Yellow Mosaic Virus', symptoms: 'Yellow mottling on leaves, stunted growth', identification: 'Irregular yellow patterns on leaves', solution: 'Control whitefly vectors, use resistant varieties.' },

        // Groundnut Diseases
        { crop: 'groundnut', disease: 'Tikka Disease', symptoms: 'Brown spots with yellow halo on leaves', identification: 'Circular spots, leaves drop prematurely', solution: 'Spray mancozeb or chlorothalonil.' },
        { crop: 'groundnut', disease: 'Rust', symptoms: 'Orange-brown pustules on leaf undersides', identification: 'Rust-colored spores on lower leaf surface', solution: 'Spray tebuconazole or propiconazole.' },
        { crop: 'groundnut', disease: 'Collar Rot', symptoms: 'Rotting at soil level, wilting', identification: 'Brown rot at stem base, plant wilts', solution: 'Improve drainage, treat seeds with Trichoderma.' },
        { crop: 'groundnut', disease: 'Thrips', symptoms: 'Silvering of leaves, stunted growth', identification: 'Tiny insects, silver streaks on leaves', solution: 'Spray imidacloprid or fipronil.' },
        { crop: 'groundnut', disease: 'Aphids', symptoms: 'Curled leaves, virus transmission', identification: 'Small insects in colonies', solution: 'Spray dimethoate or thiamethoxam.' },

        // Banana Diseases
        { crop: 'banana', disease: 'Panama Wilt', symptoms: 'Yellowing of older leaves, splitting of pseudostem', identification: 'Progressive yellowing, vascular browning inside', solution: 'Use resistant varieties, destroy infected plants.' },
        { crop: 'banana', disease: 'Bunchy Top', symptoms: 'Stunted growth, upright narrow leaves', identification: 'Dark green streaks on leaf stalks, bunchy appearance', solution: 'Remove infected plants, control aphid vectors.' },
        { crop: 'banana', disease: 'Sigatoka Leaf Spot', symptoms: 'Brown streaks and spots on leaves', identification: 'Yellow streaks turn brown, leaf drying', solution: 'Remove affected leaves, spray propiconazole.' },
        { crop: 'banana', disease: 'Weevil Borer', symptoms: 'Yellowing, toppling of plants', identification: 'Larvae tunneling in pseudostem and rhizome', solution: 'Use pheromone traps, apply carbofuran in soil.' },
        { crop: 'banana', disease: 'Nematodes', symptoms: 'Stunted growth, yellowing, poor fruiting', identification: 'Root damage, plant toppling in wind', solution: 'Use nematode-free planting material, apply carbofuran.' },

        // Mango Diseases
        { crop: 'mango', disease: 'Anthracnose', symptoms: 'Black spots on leaves, flowers, and fruits', identification: 'Circular dark lesions, fruit rot', solution: 'Spray copper oxychloride or hexaconazole.' },
        { crop: 'mango', disease: 'Powdery Mildew', symptoms: 'White powdery coating on flowers and young fruits', identification: 'White powder on inflorescence', solution: 'Spray sulfur or potassium bicarbonate.' },
        { crop: 'mango', disease: 'Mango Hopper', symptoms: 'Sap sucking, honeydew, sooty mold', identification: 'Small green/brown insects on flowers', solution: 'Spray imidacloprid or thiamethoxam during flowering.' },
        { crop: 'mango', disease: 'Fruit Fly', symptoms: 'Maggots in fruits, premature fruit drop', identification: 'Small holes with larvae inside', solution: 'Use methyl eugenol traps, spray malathion.' },
        { crop: 'mango', disease: 'Soot Mold', symptoms: 'Black coating on leaves and fruits', identification: 'Black fungal growth on honeydew', solution: 'Control sap-sucking insects, wash with water.' },

        // Grapes Diseases
        { crop: 'grapes', disease: 'Downy Mildew', symptoms: 'Yellow patches on leaves, white growth underneath', identification: 'Oil spot appearance, white fuzzy growth below', solution: 'Spray metalaxyl + mancozeb.' },
        { crop: 'grapes', disease: 'Powdery Mildew', symptoms: 'White powdery coating on leaves and fruits', identification: 'White powder on all green parts', solution: 'Spray sulfur or hexaconazole.' },
        { crop: 'grapes', disease: 'Anthracnose', symptoms: 'Sunken spots on fruits and leaves', identification: 'Dark circular lesions with raised margins', solution: 'Spray copper fungicides or mancozeb.' },
        { crop: 'grapes', disease: 'Thrips', symptoms: 'Scarring on fruits, distorted growth', identification: 'Tiny insects, fruit surface damage', solution: 'Spray imidacloprid or spinosad.' },
        { crop: 'grapes', disease: 'Mealybugs', symptoms: 'White waxy coating, honeydew, sooty mold', identification: 'White insects in clusters on stems', solution: 'Spray buprofezin or spiromesifen.' },

        // Pomegranate Diseases
        { crop: 'pomegranate', disease: 'Bacterial Blight', symptoms: 'Black spots on leaves, fruits, and twigs', identification: 'Water-soaked lesions turning black', solution: 'Spray copper oxychloride or streptocycline.' },
        { crop: 'pomegranate', disease: 'Fruit Borer', symptoms: 'Holes in fruits with larvae', identification: 'Caterpillars inside fruits, entry holes', solution: 'Use pheromone traps, spray chlorantraniliprole.' },
        { crop: 'pomegranate', disease: 'Wilt', symptoms: 'Sudden wilting and drying', identification: 'Vascular browning, plant dies rapidly', solution: 'Use resistant rootstocks, improve drainage.' },
        { crop: 'pomegranate', disease: 'Aphids', symptoms: 'Curled leaves, honeydew, sooty mold', identification: 'Small insects in colonies on tender parts', solution: 'Spray imidacloprid or dimethoate.' },
        { crop: 'pomegranate', disease: 'Whitefly', symptoms: 'Yellow leaves, virus transmission', identification: 'Tiny white flies on undersides', solution: 'Use yellow sticky traps, spray buprofezin.' }
    ];

    // Filter diseases for the selected crop
    const cropDiseases = diseaseDatabase.filter(d => d.crop === crop);
    
    if (cropDiseases.length === 0) {
        diseaseSelect.disabled = true;
        diseaseSelect.innerHTML = '<option value="">No diseases found for this crop / इस फसल के लिए कोई रोग नहीं मिला</option>';
        return;
    }
    
    // Populate dropdown with diseases
    diseaseSelect.disabled = false;
    diseaseSelect.innerHTML = '<option value="">Select disease / रोग चुनें</option>';
    cropDiseases.forEach(d => {
        const option = document.createElement('option');
        option.value = d.disease;
        option.textContent = d.disease;
        diseaseSelect.appendChild(option);
    });
}

// Crop Disease Identifier Function
function searchDisease() {
    const crop = document.getElementById('disease-crop-select').value;
    const selectedDisease = document.getElementById('disease-select').value;
    const resultDiv = document.getElementById('disease-result');

    if (!crop) {
        showResult(resultDiv, 'Please select a crop first.', 'error');
        return;
    }

    if (!selectedDisease) {
        showResult(resultDiv, 'Please select a disease.', 'error');
        return;
    }

    const diseaseDatabase = [
        // Rice Diseases
        { crop: 'rice', disease: 'Blast', symptoms: 'Small brown spots on leaves, spreading quickly', identification: 'Spots enlarge into diamond-shaped lesions. Crop looks burned.', solution: 'Use resistant seed varieties; spray tricyclazole fungicide.' },
        { crop: 'rice', disease: 'Brown Spot', symptoms: 'Small brown spots with yellow halo on leaves', identification: 'Spots are circular, brown center with yellow margin', solution: 'Improve field drainage, spray mancozeb fungicide.' },
        { crop: 'rice', disease: 'Bacterial Blight', symptoms: 'Water-soaked lesions on leaf tips', identification: 'Lesions turn yellow then brown, spread along leaf margins', solution: 'Use copper-based bactericides, plant resistant varieties.' },
        { crop: 'rice', disease: 'Sheath Blight', symptoms: 'Oval lesions on leaf sheath near water level', identification: 'Gray-green lesions with brown borders', solution: 'Reduce plant density, apply validamycin fungicide.' },
        { crop: 'rice', disease: 'False Smut', symptoms: 'Orange powder masses replace individual rice grains', identification: 'Individual grains become large orange balls', solution: 'Use copper oxychloride, avoid over-fertilization.' },
        { crop: 'rice', disease: 'Stem Borer', symptoms: 'Dead hearts in vegetative stage, white ears at reproductive stage', identification: 'Central shoot dies, larvae inside stem', solution: 'Use pheromone traps, spray cartap hydrochloride.' },
        { crop: 'rice', disease: 'Tungro Virus', symptoms: 'Yellow-orange discoloration of leaves, stunted growth', identification: 'Leaves turn yellow-orange from tip, plant stunted', solution: 'Control green leafhopper vectors, remove infected plants.' },

        // Wheat Diseases  
        { crop: 'wheat', disease: 'Rust', symptoms: 'Yellow-orange powder on leaves', identification: 'Powder rubs off easily on hand, appears as pustules', solution: 'Remove infected leaves, use fungicide (propiconazole).' },
        { crop: 'wheat', disease: 'Loose Smut', symptoms: 'Black powdery masses replace wheat grains', identification: 'Entire head becomes black powder at maturity', solution: 'Use systemic fungicide seed treatment.' },
        { crop: 'wheat', disease: 'Karnal Bunt', symptoms: 'Fishy smell from grains, partial black powder in grains', identification: 'Only part of grain affected, strong fishy odor', solution: 'Use seed treatment with tebuconazole.' },
        { crop: 'wheat', disease: 'Powdery Mildew', symptoms: 'White powdery coating on leaves', identification: 'White flour-like coating, mainly on upper leaf surface', solution: 'Spray sulfur-based fungicide, improve air circulation.' },
        { crop: 'wheat', disease: 'Septoria Blight', symptoms: 'Small brown spots with dark centers on leaves', identification: 'Spots have dark pycnidia (small black dots) in center', solution: 'Use fungicides like chlorothalonil, practice crop rotation.' },
        { crop: 'wheat', disease: 'Aphids', symptoms: 'Curled leaves, sticky honeydew on leaves', identification: 'Small green/black insects in colonies on leaves', solution: 'Spray imidacloprid or thiamethoxam.' },
        { crop: 'wheat', disease: 'Termites', symptoms: 'Wilting plants, hollow stems at base', identification: 'White ants eating roots and stem base', solution: 'Apply chlorpyrifos to soil, use resistant varieties.' },

        // Corn/Maize Diseases
        { crop: 'corn', disease: 'Corn Borer', symptoms: 'Holes in stalks and ears, sawdust-like frass', identification: 'Small holes with larvae inside stalks', solution: 'Use Bt corn, apply chemical insecticides during early stages.' },
        { crop: 'corn', disease: 'Leaf Blight', symptoms: 'Long grayish lesions on leaves', identification: 'Boat-shaped lesions, gray center with dark borders', solution: 'Plant resistant varieties, spray mancozeb fungicide.' },
        { crop: 'corn', disease: 'Downy Mildew', symptoms: 'Yellow stripes on leaves, white growth on undersides', identification: 'Parallel yellow stripes, white fuzzy growth underneath', solution: 'Use metalaxyl seed treatment, improve drainage.' },
        { crop: 'corn', disease: 'Common Smut', symptoms: 'Large grayish galls on ears, tassels, or stalks', identification: 'Tumor-like growths that burst open releasing black spores', solution: 'Remove and destroy affected plants, avoid high nitrogen.' },
        { crop: 'corn', disease: 'Armyworm', symptoms: 'Holes in leaves, complete defoliation in severe cases', identification: 'Green caterpillars with stripes, feeding in groups', solution: 'Use pheromone traps, spray insecticides like chlorpyrifos.' },
        { crop: 'corn', disease: 'Rust', symptoms: 'Orange-brown pustules on leaves', identification: 'Small raised spots that release rust-colored spores', solution: 'Plant resistant hybrids, spray propiconazole if severe.' },
        { crop: 'corn', disease: 'Cutworm', symptoms: 'Seedlings cut at soil level', identification: 'Gray/brown caterpillars in soil, plants cut cleanly', solution: 'Apply chlorpyrifos dust around base of plants.' },

        // Cotton Diseases
        { crop: 'cotton', disease: 'Bollworm', symptoms: 'Holes in cotton bolls, larvae inside', identification: 'Small green/brown larvae inside bolls, circular holes', solution: 'Use pheromone traps, spray bio-pesticide (Bt).' },
        { crop: 'cotton', disease: 'Wilt', symptoms: 'Yellowing and wilting of plants, vascular browning', identification: 'Plants wilt despite adequate moisture, brown vascular tissue', solution: 'Plant wilt-resistant varieties, improve soil drainage.' },
        { crop: 'cotton', disease: 'Aphids', symptoms: 'Curled leaves, sticky honeydew, stunted growth', identification: 'Small green insects on undersides of leaves', solution: 'Use insecticidal soap, encourage beneficial insects.' },
        { crop: 'cotton', disease: 'Thrips', symptoms: 'Silver patches on leaves, stunted plant growth', identification: 'Tiny insects causing silvering of leaf surface', solution: 'Use blue sticky traps, spray neem oil or imidacloprid.' },
        { crop: 'cotton', disease: 'Red Spider Mite', symptoms: 'Yellow speckling on leaves, fine webbing', identification: 'Tiny red mites on undersides, fine silk webbing', solution: 'Increase humidity, use miticides like abamectin.' },
        { crop: 'cotton', disease: 'Whitefly', symptoms: 'Yellow leaves, sooty mold, virus transmission', identification: 'Tiny white flies on leaf undersides', solution: 'Use yellow sticky traps, spray buprofezin.' },
        { crop: 'cotton', disease: 'Jassids', symptoms: 'Leaf edges turn yellow then brown, hopper burn', identification: 'Green leafhopper insects, V-shaped yellowing', solution: 'Spray imidacloprid or thiamethoxam.' },

        // Sugarcane Diseases
        { crop: 'sugarcane', disease: 'Red Rot', symptoms: 'Red discoloration inside stalks, sour smell', identification: 'Internal reddening with cross-bands, alcoholic odor', solution: 'Plant resistant varieties, use healthy seed material.' },
        { crop: 'sugarcane', disease: 'Smut', symptoms: 'Black whip-like structures from growing points', identification: 'Long black whips emerging from shoots', solution: 'Remove affected tillers, plant disease-free setts.' },
        { crop: 'sugarcane', disease: 'Yellow Leaf', symptoms: 'Yellowing of midrib, premature leaf death', identification: 'Bright yellow midrib, spreading to entire leaf', solution: 'Use virus-free planting material, control aphid vectors.' },
        { crop: 'sugarcane', disease: 'Mosaic', symptoms: 'Light and dark green patches on leaves', identification: 'Mosaic pattern of light and dark green areas', solution: 'Plant resistant varieties, control aphid vectors.' },
        { crop: 'sugarcane', disease: 'Scale Insect', symptoms: 'White waxy scales on stalks, yellowing', identification: 'White cotton-like scales attached to stalks', solution: 'Spray malathion or use systemic insecticides.' },
        { crop: 'sugarcane', disease: 'Top Borer', symptoms: 'Dead heart, bunchy top appearance', identification: 'Central shoot dies, multiple side shoots emerge', solution: 'Remove and destroy affected tillers, spray chlorpyrifos.' },
        { crop: 'sugarcane', disease: 'Woolly Aphid', symptoms: 'White woolly masses on leaves and stalks', identification: 'White cotton-like aphid colonies', solution: 'Spray dimethoate or imidacloprid.' },

        // Tomato Diseases
        { crop: 'tomato', disease: 'Early Blight', symptoms: 'Dark brown spots with concentric rings on lower leaves', identification: 'Target-like lesions, leaves turn yellow and drop', solution: 'Remove affected leaves, spray mancozeb or chlorothalonil.' },
        { crop: 'tomato', disease: 'Late Blight', symptoms: 'Water-soaked lesions on leaves and fruits', identification: 'Gray-white fungal growth on undersides, rapid spread', solution: 'Spray metalaxyl + mancozeb, destroy infected plants.' },
        { crop: 'tomato', disease: 'Bacterial Wilt', symptoms: 'Sudden wilting without yellowing', identification: 'Plant wilts rapidly, bacterial ooze from cut stems', solution: 'Remove infected plants, use resistant varieties, improve drainage.' },
        { crop: 'tomato', disease: 'Fruit Borer', symptoms: 'Holes in fruits with larvae inside', identification: 'Circular entry holes, caterpillar damage inside fruits', solution: 'Use pheromone traps, spray spinosad or Bt.' },
        { crop: 'tomato', disease: 'Leaf Curl Virus', symptoms: 'Upward curling of leaves, stunted growth', identification: 'Leaves curl upward and inward, plant becomes bushy', solution: 'Control whitefly vectors, remove infected plants.' },
        { crop: 'tomato', disease: 'Septoria Leaf Spot', symptoms: 'Small dark spots with gray centers on leaves', identification: 'Circular spots with tiny black dots in center', solution: 'Remove lower leaves, spray copper fungicides.' },
        { crop: 'tomato', disease: 'Whitefly', symptoms: 'Yellow leaves, sticky honeydew, virus transmission', identification: 'Tiny white insects on leaf undersides', solution: 'Use yellow sticky traps, spray buprofezin or spiromesifen.' },

        // Potato Diseases
        { crop: 'potato', disease: 'Late Blight', symptoms: 'Water-soaked lesions on leaves, brown patches', identification: 'Rapid spread, white fungal growth on undersides', solution: 'Spray metalaxyl + mancozeb, destroy affected plants.' },
        { crop: 'potato', disease: 'Early Blight', symptoms: 'Brown spots with concentric rings on older leaves', identification: 'Target-like spots, leaves yellow and drop', solution: 'Spray mancozeb or chlorothalonil, practice crop rotation.' },
        { crop: 'potato', disease: 'Black Scurf', symptoms: 'Black sclerotia on tuber surface', identification: 'Black crusty patches on potato skin', solution: 'Use disease-free seed, treat with mancozeb.' },
        { crop: 'potato', disease: 'Aphids', symptoms: 'Curled leaves, sticky honeydew, virus spread', identification: 'Small green/black insects in colonies', solution: 'Spray imidacloprid or thiamethoxam.' },
        { crop: 'potato', disease: 'Potato Beetle', symptoms: 'Holes in leaves, defoliation', identification: 'Yellow-orange beetles with black stripes', solution: 'Hand-pick beetles, spray spinosad or neem oil.' },
        { crop: 'potato', disease: 'Wilt', symptoms: 'Wilting of plants, brown vascular tissue', identification: 'Plant wilts despite watering, brown streaks in stem', solution: 'Use resistant varieties, improve soil drainage.' },
        { crop: 'potato', disease: 'Tuber Moth', symptoms: 'Tunnels in tubers, larvae inside', identification: 'Small holes with pink larvae inside potatoes', solution: 'Earth up properly, store in cool dark place.' },

        // Onion Diseases
        { crop: 'onion', disease: 'Purple Blotch', symptoms: 'Purple spots on leaves and bulbs', identification: 'Purple lesions with concentric rings', solution: 'Spray mancozeb or copper oxychloride.' },
        { crop: 'onion', disease: 'Downy Mildew', symptoms: 'Yellow patches on leaves, gray growth', identification: 'Yellow areas with gray fuzzy growth on undersides', solution: 'Improve air circulation, spray metalaxyl + mancozeb.' },
        { crop: 'onion', disease: 'Thrips', symptoms: 'Silver streaks on leaves, distorted growth', identification: 'Tiny insects, leaves have silvery appearance', solution: 'Spray imidacloprid or fipronil.' },
        { crop: 'onion', disease: 'Basal Rot', symptoms: 'Rotting from base of bulb, watery decay', identification: 'Soft rot at bulb base, foul smell', solution: 'Use disease-free sets, improve drainage.' },
        { crop: 'onion', disease: 'Stemphylium Blight', symptoms: 'Small yellow spots that turn brown', identification: 'Elongated brown lesions on leaves', solution: 'Spray iprodione or azoxystrobin.' },

        // Chili Diseases
        { crop: 'chili', disease: 'Anthracnose', symptoms: 'Sunken dark spots on fruits', identification: 'Circular lesions with pink spore masses', solution: 'Spray copper fungicides or azoxystrobin.' },
        { crop: 'chili', disease: 'Powdery Mildew', symptoms: 'White powdery coating on leaves', identification: 'White powder on upper leaf surfaces', solution: 'Spray sulfur or potassium bicarbonate.' },
        { crop: 'chili', disease: 'Bacterial Wilt', symptoms: 'Sudden wilting of entire plant', identification: 'Plant wilts rapidly, bacterial ooze from stems', solution: 'Remove infected plants, use resistant varieties.' },
        { crop: 'chili', disease: 'Leaf Curl', symptoms: 'Upward curling and puckering of leaves', identification: 'Leaves curl upward, reduced leaf size', solution: 'Control aphid and whitefly vectors.' },
        { crop: 'chili', disease: 'Thrips', symptoms: 'Silvering of leaves, deformed fruits', identification: 'Tiny insects, silver streaks on leaves', solution: 'Use blue sticky traps, spray spinosad.' },
        { crop: 'chili', disease: 'Fruit Borer', symptoms: 'Holes in fruits with larvae', identification: 'Caterpillars boring into fruits', solution: 'Use pheromone traps, spray Bt or chlorantraniliprole.' },

        // Brinjal (Eggplant) Diseases
        { crop: 'brinjal', disease: 'Shoot and Fruit Borer', symptoms: 'Wilted shoots, holes in fruits', identification: 'Bored shoots droop, larvae in fruits', solution: 'Remove affected parts, spray spinosad or chlorantraniliprole.' },
        { crop: 'brinjal', disease: 'Bacterial Wilt', symptoms: 'Sudden wilting without yellowing', identification: 'Rapid wilting, bacterial ooze from cut stems', solution: 'Use resistant varieties, practice crop rotation.' },
        { crop: 'brinjal', disease: 'Little Leaf', symptoms: 'Small leaves, bushy appearance, no flowering', identification: 'Abnormally small leaves, excessive branching', solution: 'Control leafhopper vectors, remove infected plants.' },
        { crop: 'brinjal', disease: 'Phomopsis Blight', symptoms: 'Round spots on leaves and fruits', identification: 'Circular lesions with concentric rings', solution: 'Spray mancozeb or copper oxychloride.' },
        { crop: 'brinjal', disease: 'Whitefly', symptoms: 'Yellow leaves, sooty mold, virus spread', identification: 'Tiny white flies on undersides', solution: 'Use yellow traps, spray buprofezin.' },

        // Okra Diseases
        { crop: 'okra', disease: 'Yellow Vein Mosaic', symptoms: 'Yellow veins, stunted growth, small fruits', identification: 'Bright yellow veins on leaves', solution: 'Control whitefly vectors, use resistant varieties.' },
        { crop: 'okra', disease: 'Powdery Mildew', symptoms: 'White powdery coating on leaves', identification: 'White powder on both leaf surfaces', solution: 'Spray sulfur or potassium bicarbonate.' },
        { crop: 'okra', disease: 'Fruit and Shoot Borer', symptoms: 'Holes in fruits and wilted shoots', identification: 'Caterpillars inside fruits and shoots', solution: 'Remove affected parts, spray chlorantraniliprole.' },
        { crop: 'okra', disease: 'Aphids', symptoms: 'Curled leaves, sticky honeydew', identification: 'Small green insects in colonies', solution: 'Spray imidacloprid or insecticidal soap.' },
        { crop: 'okra', disease: 'Jassids', symptoms: 'Yellowing and curling of leaf edges', identification: 'Green leafhoppers, hopper burn symptoms', solution: 'Spray thiamethoxam or fipronil.' },

        // Chickpea Diseases
        { crop: 'chickpea', disease: 'Wilt', symptoms: 'Yellowing and drooping, vascular browning', identification: 'Plant wilts progressively, brown vascular tissue', solution: 'Use wilt-resistant varieties, treat seeds with carbendazim.' },
        { crop: 'chickpea', disease: 'Blight', symptoms: 'Water-soaked lesions on all plant parts', identification: 'Brown lesions on leaves, stems, and pods', solution: 'Spray mancozeb or copper oxychloride.' },
        { crop: 'chickpea', disease: 'Dry Root Rot', symptoms: 'Yellowing, premature drying of plants', identification: 'Dry rot of roots, plants die early', solution: 'Deep summer plowing, seed treatment with Trichoderma.' },
        { crop: 'chickpea', disease: 'Pod Borer', symptoms: 'Holes in pods, damaged seeds', identification: 'Caterpillars feeding on pods and seeds', solution: 'Use pheromone traps, spray spinosad.' },

        // Mustard Diseases
        { crop: 'mustard', disease: 'White Rust', symptoms: 'White pustules on leaves and stems', identification: 'Raised white spots that burst releasing white powder', solution: 'Spray metalaxyl + mancozeb.' },
        { crop: 'mustard', disease: 'Alternaria Blight', symptoms: 'Dark brown spots with concentric rings', identification: 'Circular spots on leaves and pods', solution: 'Spray mancozeb or iprodione.' },
        { crop: 'mustard', disease: 'Downy Mildew', symptoms: 'Yellow patches with gray growth underneath', identification: 'Yellow areas on upper surface, gray fuzz below', solution: 'Spray copper oxychloride or metalaxyl.' },
        { crop: 'mustard', disease: 'Aphids', symptoms: 'Curled leaves, sticky honeydew, stunted growth', identification: 'Green/black insects in dense colonies', solution: 'Spray dimethoate or imidacloprid.' },
        { crop: 'mustard', disease: 'Sawfly', symptoms: 'Defoliation, skeletonized leaves', identification: 'Green caterpillars feeding on leaves', solution: 'Spray chlorpyrifos or quinalphos.' },

        // Soybean Diseases
        { crop: 'soybean', disease: 'Rust', symptoms: 'Small reddish-brown pustules on leaves', identification: 'Rust-colored spores that rub off on fingers', solution: 'Spray triazole fungicides like tebuconazole.' },
        { crop: 'soybean', disease: 'Bacterial Blight', symptoms: 'Brown spots with yellow halos', identification: 'Water-soaked lesions that turn brown', solution: 'Use disease-free seeds, spray copper-based bactericides.' },
        { crop: 'soybean', disease: 'Stem Fly', symptoms: 'Wilted shoots, tunnels in stems', identification: 'Small maggots inside young stems', solution: 'Spray chlorpyrifos at early vegetative stage.' },
        { crop: 'soybean', disease: 'Pod Borer', symptoms: 'Holes in pods, damaged seeds', identification: 'Caterpillars feeding on developing pods', solution: 'Use pheromone traps, spray quinalphos.' },
        { crop: 'soybean', disease: 'Yellow Mosaic Virus', symptoms: 'Yellow mottling on leaves, stunted growth', identification: 'Irregular yellow patterns on leaves', solution: 'Control whitefly vectors, use resistant varieties.' },

        // Groundnut Diseases
        { crop: 'groundnut', disease: 'Tikka Disease', symptoms: 'Brown spots with yellow halo on leaves', identification: 'Circular spots, leaves drop prematurely', solution: 'Spray mancozeb or chlorothalonil.' },
        { crop: 'groundnut', disease: 'Rust', symptoms: 'Orange-brown pustules on leaf undersides', identification: 'Rust-colored spores on lower leaf surface', solution: 'Spray tebuconazole or propiconazole.' },
        { crop: 'groundnut', disease: 'Collar Rot', symptoms: 'Rotting at soil level, wilting', identification: 'Brown rot at stem base, plant wilts', solution: 'Improve drainage, treat seeds with Trichoderma.' },
        { crop: 'groundnut', disease: 'Thrips', symptoms: 'Silvering of leaves, stunted growth', identification: 'Tiny insects, silver streaks on leaves', solution: 'Spray imidacloprid or fipronil.' },
        { crop: 'groundnut', disease: 'Aphids', symptoms: 'Curled leaves, virus transmission', identification: 'Small insects in colonies', solution: 'Spray dimethoate or thiamethoxam.' },

        // Banana Diseases
        { crop: 'banana', disease: 'Panama Wilt', symptoms: 'Yellowing of older leaves, splitting of pseudostem', identification: 'Progressive yellowing, vascular browning inside', solution: 'Use resistant varieties, destroy infected plants.' },
        { crop: 'banana', disease: 'Bunchy Top', symptoms: 'Stunted growth, upright narrow leaves', identification: 'Dark green streaks on leaf stalks, bunchy appearance', solution: 'Remove infected plants, control aphid vectors.' },
        { crop: 'banana', disease: 'Sigatoka Leaf Spot', symptoms: 'Brown streaks and spots on leaves', identification: 'Yellow streaks turn brown, leaf drying', solution: 'Remove affected leaves, spray propiconazole.' },
        { crop: 'banana', disease: 'Weevil Borer', symptoms: 'Yellowing, toppling of plants', identification: 'Larvae tunneling in pseudostem and rhizome', solution: 'Use pheromone traps, apply carbofuran in soil.' },
        { crop: 'banana', disease: 'Nematodes', symptoms: 'Stunted growth, yellowing, poor fruiting', identification: 'Root damage, plant toppling in wind', solution: 'Use nematode-free planting material, apply carbofuran.' },

        // Mango Diseases
        { crop: 'mango', disease: 'Anthracnose', symptoms: 'Black spots on leaves, flowers, and fruits', identification: 'Circular dark lesions, fruit rot', solution: 'Spray copper oxychloride or hexaconazole.' },
        { crop: 'mango', disease: 'Powdery Mildew', symptoms: 'White powdery coating on flowers and young fruits', identification: 'White powder on inflorescence', solution: 'Spray sulfur or potassium bicarbonate.' },
        { crop: 'mango', disease: 'Mango Hopper', symptoms: 'Sap sucking, honeydew, sooty mold', identification: 'Small green/brown insects on flowers', solution: 'Spray imidacloprid or thiamethoxam during flowering.' },
        { crop: 'mango', disease: 'Fruit Fly', symptoms: 'Maggots in fruits, premature fruit drop', identification: 'Small holes with larvae inside', solution: 'Use methyl eugenol traps, spray malathion.' },
        { crop: 'mango', disease: 'Soot Mold', symptoms: 'Black coating on leaves and fruits', identification: 'Black fungal growth on honeydew', solution: 'Control sap-sucking insects, wash with water.' },

        // Grapes Diseases
        { crop: 'grapes', disease: 'Downy Mildew', symptoms: 'Yellow patches on leaves, white growth underneath', identification: 'Oil spot appearance, white fuzzy growth below', solution: 'Spray metalaxyl + mancozeb.' },
        { crop: 'grapes', disease: 'Powdery Mildew', symptoms: 'White powdery coating on leaves and fruits', identification: 'White powder on all green parts', solution: 'Spray sulfur or hexaconazole.' },
        { crop: 'grapes', disease: 'Anthracnose', symptoms: 'Sunken spots on fruits and leaves', identification: 'Dark circular lesions with raised margins', solution: 'Spray copper fungicides or mancozeb.' },
        { crop: 'grapes', disease: 'Thrips', symptoms: 'Scarring on fruits, distorted growth', identification: 'Tiny insects, fruit surface damage', solution: 'Spray imidacloprid or spinosad.' },
        { crop: 'grapes', disease: 'Mealybugs', symptoms: 'White waxy coating, honeydew, sooty mold', identification: 'White insects in clusters on stems', solution: 'Spray buprofezin or spiromesifen.' },

        // Pomegranate Diseases
        { crop: 'pomegranate', disease: 'Bacterial Blight', symptoms: 'Black spots on leaves, fruits, and twigs', identification: 'Water-soaked lesions turning black', solution: 'Spray copper oxychloride or streptocycline.' },
        { crop: 'pomegranate', disease: 'Fruit Borer', symptoms: 'Holes in fruits with larvae', identification: 'Caterpillars inside fruits, entry holes', solution: 'Use pheromone traps, spray chlorantraniliprole.' },
        { crop: 'pomegranate', disease: 'Wilt', symptoms: 'Sudden wilting and drying', identification: 'Vascular browning, plant dies rapidly', solution: 'Use resistant rootstocks, improve drainage.' },
        { crop: 'pomegranate', disease: 'Aphids', symptoms: 'Curled leaves, honeydew, sooty mold', identification: 'Small insects in colonies on tender parts', solution: 'Spray imidacloprid or dimethoate.' },
        { crop: 'pomegranate', disease: 'Whitefly', symptoms: 'Yellow leaves, virus transmission', identification: 'Tiny white flies on undersides', solution: 'Use yellow sticky traps, spray buprofezin.' }
    ];

    // Find the selected disease
    const diseaseInfo = diseaseDatabase.find(d => d.crop === crop && d.disease === selectedDisease);

    if (!diseaseInfo) {
        showResult(resultDiv, 'Disease information not found.', 'error');
        return;
    }

    const resultHTML = `
        <div style="text-align: left;">
            <div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-left: 4px solid var(--primary-green); border-radius: 8px;">
                <h5 style="color: var(--primary-green); margin-bottom: 10px;">🌾 ${diseaseInfo.crop.toUpperCase()}: ${diseaseInfo.disease}</h5>
                <div style="margin-bottom: 8px;">
                    <strong>🔍 Symptoms:</strong> ${diseaseInfo.symptoms}
                </div>
                <div style="margin-bottom: 8px;">
                    <strong>👁️ How to Identify:</strong> ${diseaseInfo.identification}
                </div>
                <div style="background: #e8f5e8; padding: 8px; border-radius: 4px;">
                    <strong>💊 Solution:</strong> ${diseaseInfo.solution}
                </div>
            </div>
            <div style="margin-top: 15px; padding: 10px; background: #fff3cd; border-radius: 5px; font-size: 0.9rem;">
                <strong>⚠️ Important:</strong> For severe infestations, consult your local agricultural extension officer for specific treatment recommendations.
            </div>
            <div style="margin-top: 10px; padding: 8px; background: #f8f9fa; border-radius: 4px; font-size: 0.8rem; color: #666;">
                <strong>⚠️ Disclaimer:</strong> Disease information is general guidance. Regional variations in disease patterns and treatment effectiveness may occur. Always confirm diagnosis with local experts before treatment.
            </div>
        </div>
    `;

    showResult(resultDiv, resultHTML, 'success');
}

// Expanded Fertilizer Calculator Function
function calculateFertilizer() {
    const crop = document.getElementById('crop-select').value;
    const area = parseFloat(document.getElementById('area-input').value);
    const resultDiv = document.getElementById('fertilizer-result');

    if (!crop || !area || area <= 0) {
        showResult(resultDiv, 'Please select a crop and enter a valid area.', 'error');
        return;
    }

    // Comprehensive fertilizer requirements per acre (in kg)
    const fertilizerData = {
        rice: { urea: 50, dap: 40, mop: 20, organic: 1000, timing: '3 splits: basal, tillering, panicle initiation' },
        wheat: { urea: 60, dap: 50, mop: 25, organic: 800, timing: '3 splits: sowing, crown root, flowering' },
        corn: { urea: 65, dap: 45, mop: 30, organic: 1200, timing: '3 splits: sowing, knee-high, tasseling' },
        cotton: { urea: 40, dap: 35, mop: 25, organic: 1500, timing: '4 splits: sowing, squaring, flowering, boll development' },
        sugarcane: { urea: 120, dap: 60, mop: 40, organic: 2000, timing: '3 splits: planting, 45 days, 90 days' },
        soybean: { urea: 15, dap: 40, mop: 30, organic: 1000, timing: '2 splits: sowing, flowering (minimal nitrogen due to fixation)' },
        mustard: { urea: 35, dap: 25, mop: 15, organic: 800, timing: '2 splits: sowing, branching stage' },
        groundnut: { urea: 10, dap: 50, mop: 40, organic: 1200, timing: '2 splits: sowing, pegging (low nitrogen due to fixation)' },
        tomato: { urea: 55, dap: 60, mop: 50, organic: 1500, timing: '4 splits: transplanting, flowering, fruit set, fruit development' },
        potato: { urea: 45, dap: 55, mop: 60, organic: 1200, timing: '3 splits: planting, hilling, tuber formation' },
        onion: { urea: 40, dap: 35, mop: 30, organic: 1000, timing: '3 splits: transplanting, bulb initiation, bulb development' },
        garlic: { urea: 35, dap: 30, mop: 25, organic: 800, timing: '3 splits: planting, clove formation, bulb development' },
        chili: { urea: 45, dap: 40, mop: 35, organic: 1200, timing: '4 splits: transplanting, flowering, fruit set, harvest period' },
        cabbage: { urea: 50, dap: 45, mop: 40, organic: 1500, timing: '3 splits: transplanting, head initiation, head development' },
        cauliflower: { urea: 50, dap: 45, mop: 40, organic: 1500, timing: '3 splits: transplanting, curd initiation, curd development' },
        brinjal: { urea: 45, dap: 40, mop: 35, organic: 1200, timing: '4 splits: transplanting, flowering, fruit set, continuous harvest' },
        okra: { urea: 40, dap: 35, mop: 30, organic: 1000, timing: '3 splits: sowing, flowering, fruit development' },
        carrot: { urea: 30, dap: 25, mop: 20, organic: 1000, timing: '2 splits: sowing, root development' },
        radish: { urea: 25, dap: 20, mop: 15, organic: 800, timing: '2 splits: sowing, root swelling' },
        spinach: { urea: 35, dap: 20, mop: 15, organic: 800, timing: '2 splits: sowing, leaf development' },
        banana: { urea: 200, dap: 100, mop: 150, organic: 3000, timing: '12 monthly splits throughout the year' },
        mango: { urea: 100, dap: 80, mop: 120, organic: 2000, timing: '3 splits: pre-flowering, fruit set, fruit development' },
        orange: { urea: 80, dap: 60, mop: 100, organic: 1500, timing: '3 splits: pre-flowering, fruit set, fruit development' },
        apple: { urea: 120, dap: 80, mop: 100, organic: 2000, timing: '3 splits: bud break, fruit set, fruit development' },
        grapes: { urea: 60, dap: 40, mop: 80, organic: 1500, timing: '3 splits: bud break, fruit set, veraison' },
        papaya: { urea: 80, dap: 60, mop: 100, organic: 1500, timing: '6 splits every 2 months' },
        guava: { urea: 60, dap: 40, mop: 80, organic: 1200, timing: '3 splits: pre-flowering, fruit set, fruit development' },
        pomegranate: { urea: 50, dap: 40, mop: 60, organic: 1200, timing: '3 splits: pre-flowering, fruit set, fruit development' },
        chickpea: { urea: 10, dap: 40, mop: 30, organic: 1000, timing: '2 splits: sowing, flowering (minimal nitrogen due to fixation)' },
        lentil: { urea: 8, dap: 35, mop: 25, organic: 800, timing: '2 splits: sowing, flowering (minimal nitrogen due to fixation)' },
        pigeon_pea: { urea: 12, dap: 45, mop: 35, organic: 1200, timing: '2 splits: sowing, flowering (minimal nitrogen due to fixation)' },
        black_gram: { urea: 8, dap: 30, mop: 20, organic: 800, timing: '2 splits: sowing, flowering (minimal nitrogen due to fixation)' },
        green_gram: { urea: 8, dap: 30, mop: 20, organic: 800, timing: '2 splits: sowing, flowering (minimal nitrogen due to fixation)' },
        field_pea: { urea: 10, dap: 35, mop: 25, organic: 800, timing: '2 splits: sowing, flowering (minimal nitrogen due to fixation)' },
        sesame: { urea: 20, dap: 25, mop: 15, organic: 600, timing: '2 splits: sowing, flowering' },
        sunflower: { urea: 30, dap: 40, mop: 25, organic: 1000, timing: '2 splits: sowing, head formation' },
        safflower: { urea: 25, dap: 30, mop: 20, organic: 800, timing: '2 splits: sowing, branching' },
        castor: { urea: 35, dap: 40, mop: 25, organic: 1000, timing: '3 splits: sowing, flowering, spike development' },
        coconut: { urea: 500, dap: 320, mop: 1200, organic: 5000, timing: '2 splits per year: pre-monsoon, post-monsoon' },
        arecanut: { urea: 200, dap: 150, mop: 300, organic: 2000, timing: '2 splits per year: pre-monsoon, post-monsoon' },
        cardamom: { urea: 30, dap: 30, mop: 60, organic: 1500, timing: '3 splits: pre-monsoon, mid-monsoon, post-monsoon' },
        black_pepper: { urea: 50, dap: 50, mop: 100, organic: 2000, timing: '3 splits: pre-monsoon, mid-monsoon, post-monsoon' },
        turmeric: { urea: 60, dap: 40, mop: 80, organic: 1500, timing: '3 splits: planting, tillering, rhizome development' },
        ginger: { urea: 50, dap: 35, mop: 70, organic: 1500, timing: '3 splits: planting, tillering, rhizome development' },
        coriander: { urea: 20, dap: 25, mop: 15, organic: 600, timing: '2 splits: sowing, branching' },
        cumin: { urea: 15, dap: 20, mop: 10, organic: 500, timing: '2 splits: sowing, branching' },
        fenugreek: { urea: 15, dap: 25, mop: 15, organic: 600, timing: '2 splits: sowing, branching' },
        fennel: { urea: 25, dap: 30, mop: 20, organic: 800, timing: '2 splits: sowing, umbel formation' },
        jute: { urea: 40, dap: 20, mop: 15, organic: 1000, timing: '2 splits: sowing, fiber development' },
        tea: { urea: 150, dap: 50, mop: 100, organic: 2000, timing: '6 splits throughout the year' },
        coffee: { urea: 80, dap: 60, mop: 120, organic: 1500, timing: '3 splits: pre-monsoon, post-monsoon, post-harvest' },
        rubber: { urea: 100, dap: 50, mop: 150, organic: 2000, timing: '2 splits per year: beginning and end of monsoon' }
    };

    const requirements = fertilizerData[crop];
    if (!requirements) {
        showResult(resultDiv, 'Fertilizer data not available for this crop. Please select another crop.', 'error');
        return;
    }

    const urea = (requirements.urea * area).toFixed(1);
    const dap = (requirements.dap * area).toFixed(1);
    const mop = (requirements.mop * area).toFixed(1);
    const organic = (requirements.organic * area).toFixed(0);

    const resultHTML = `
        <div style="text-align: left;">
            <h4 style="color: var(--primary-green); margin-bottom: 15px;">Fertilizer Requirements for ${area} acre(s) of ${crop.charAt(0).toUpperCase() + crop.slice(1)}:</h4>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h5 style="color: var(--primary-green); margin-bottom: 10px;">📦 Fertilizer Quantities:</h5>
                <p><i class="fas fa-leaf" style="color: #4caf50;"></i> <strong>Urea:</strong> ${urea} kg</p>
                <p><i class="fas fa-seedling" style="color: #8bc34a;"></i> <strong>DAP:</strong> ${dap} kg</p>
                <p><i class="fas fa-spa" style="color: #009688;"></i> <strong>MOP:</strong> ${mop} kg</p>
                <p><i class="fas fa-recycle" style="color: #795548;"></i> <strong>Organic Compost:</strong> ${organic} kg</p>
            </div>
            <div style="background: #e3f2fd; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
                <h5 style="color: var(--primary-green); margin-bottom: 5px;">⏰ Application Timing:</h5>
                <p style="margin: 0; font-size: 0.9rem;">${requirements.timing}</p>
            </div>
            <div style="background: #e8f5e8; padding: 10px; border-radius: 5px; font-size: 0.9rem;">
                <strong>💡 Pro Tip:</strong> Apply fertilizers based on soil test results for optimal crop yield and soil health.
            </div>
            <div style="margin-top: 10px; padding: 8px; background: #f8f9fa; border-radius: 4px; font-size: 0.8rem; color: #666;">
                <strong>⚠️ Disclaimer:</strong> Values are general recommendations per acre. Actual requirements vary by soil type, climate, variety, and region. Consult local agricultural extension officers for precise recommendations.
            </div>
        </div>
    `;

    showResult(resultDiv, resultHTML, 'success');
}

// Irrigation Calculator Function
function calculateIrrigation() {
    const landSize = parseFloat(document.getElementById('land-size').value);
    const crop = document.getElementById('irrigation-crop').value;
    const resultDiv = document.getElementById('irrigation-result');

    if (!crop || !landSize || landSize <= 0) {
        showResult(resultDiv, 'Please select a crop and enter a valid land size.', 'error');
        return;
    }

    // Comprehensive water requirements per acre (in liters)
    const waterData = {
        rice: { daily: 15000, season: 120, schedule: 'Continuous flooding, 5 cm water during growing season', method: 'Flood irrigation' },
        wheat: { daily: 8000, season: 100, schedule: '5-6 irrigations, each 5-6 cm depth', method: 'Furrow irrigation' },
        corn: { daily: 10000, season: 90, schedule: '3-4 irrigations at knee-height and flowering stage', method: 'Sprinkler irrigation' },
        cotton: { daily: 12000, season: 160, schedule: '6-8 irrigations from squaring to boll development', method: 'Drip irrigation' },
        sugarcane: { daily: 20000, season: 365, schedule: '30-35 irrigations throughout year', method: 'Furrow irrigation' },
        soybean: { daily: 6000, season: 90, schedule: '2-3 irrigations during flowering and pod filling', method: 'Sprinkler irrigation' },
        mustard: { daily: 4000, season: 120, schedule: '3-4 irrigations during branching and flowering', method: 'Furrow irrigation' },
        groundnut: { daily: 5000, season: 120, schedule: '4-5 irrigations during pegging and pod development', method: 'Drip irrigation' },
        tomato: { daily: 8000, season: 120, schedule: 'Daily irrigation in small quantities', method: 'Drip irrigation' },
        potato: { daily: 6000, season: 100, schedule: '8-10 irrigations light and frequent', method: 'Sprinkler irrigation' },
        onion: { daily: 5000, season: 150, schedule: '15-20 irrigations light and frequent', method: 'Drip irrigation' },
        garlic: { daily: 4000, season: 180, schedule: '12-15 irrigations avoiding waterlogging', method: 'Furrow irrigation' },
        chili: { daily: 6000, season: 180, schedule: 'Frequent light irrigations', method: 'Drip irrigation' },
        cabbage: { daily: 7000, season: 90, schedule: '8-10 irrigations during head formation', method: 'Sprinkler irrigation' },
        cauliflower: { daily: 7000, season: 100, schedule: '10-12 irrigations during curd development', method: 'Sprinkler irrigation' },
        brinjal: { daily: 8000, season: 180, schedule: 'Regular irrigation avoiding water stress', method: 'Drip irrigation' },
        okra: { daily: 6000, season: 120, schedule: '6-8 irrigations during flowering and fruiting', method: 'Furrow irrigation' },
        carrot: { daily: 5000, season: 100, schedule: '6-8 light irrigations for root development', method: 'Sprinkler irrigation' },
        radish: { daily: 4000, season: 45, schedule: '4-5 irrigations during root swelling', method: 'Sprinkler irrigation' },
        spinach: { daily: 3000, season: 45, schedule: '6-8 light irrigations', method: 'Sprinkler irrigation' },
        banana: { daily: 25000, season: 365, schedule: 'Daily irrigation throughout year', method: 'Drip irrigation' },
        mango: { daily: 15000, season: 365, schedule: '15-20 irrigations during dry season', method: 'Basin irrigation' },
        orange: { daily: 12000, season: 365, schedule: '12-15 irrigations avoiding water stress', method: 'Drip irrigation' },
        apple: { daily: 10000, season: 200, schedule: '10-12 irrigations during fruit development', method: 'Drip irrigation' },
        grapes: { daily: 8000, season: 180, schedule: '8-10 irrigations from fruit set to harvest', method: 'Drip irrigation' },
        papaya: { daily: 15000, season: 365, schedule: 'Regular irrigation throughout year', method: 'Basin irrigation' },
        guava: { daily: 10000, season: 365, schedule: '12-15 irrigations during flowering and fruiting', method: 'Basin irrigation' },
        pomegranate: { daily: 8000, season: 180, schedule: '8-10 irrigations during fruit development', method: 'Drip irrigation' },
        chickpea: { daily: 4000, season: 120, schedule: '2-3 irrigations during flowering and pod filling', method: 'Furrow irrigation' },
        lentil: { daily: 3500, season: 110, schedule: '2-3 irrigations during flowering', method: 'Furrow irrigation' },
        pigeon_pea: { daily: 5000, season: 180, schedule: '3-4 irrigations during flowering and pod development', method: 'Furrow irrigation' },
        black_gram: { daily: 3000, season: 70, schedule: '2-3 irrigations during flowering', method: 'Furrow irrigation' },
        green_gram: { daily: 3000, season: 65, schedule: '2-3 irrigations during flowering', method: 'Furrow irrigation' },
        field_pea: { daily: 4000, season: 120, schedule: '3-4 irrigations during pod development', method: 'Furrow irrigation' },
        sesame: { daily: 3000, season: 90, schedule: '3-4 irrigations avoiding excess moisture', method: 'Furrow irrigation' },
        sunflower: { daily: 6000, season: 90, schedule: '4-5 irrigations during head formation', method: 'Furrow irrigation' },
        safflower: { daily: 4000, season: 120, schedule: '3-4 irrigations during branching and flowering', method: 'Furrow irrigation' },
        castor: { daily: 5000, season: 150, schedule: '4-5 irrigations during spike development', method: 'Furrow irrigation' },
        coconut: { daily: 40000, season: 365, schedule: 'Daily irrigation in coastal areas', method: 'Basin irrigation' },
        arecanut: { daily: 30000, season: 365, schedule: 'Regular irrigation throughout year', method: 'Basin irrigation' },
        cardamom: { daily: 8000, season: 365, schedule: 'Frequent light irrigations', method: 'Sprinkler irrigation' },
        black_pepper: { daily: 10000, season: 365, schedule: 'Regular irrigation avoiding waterlogging', method: 'Drip irrigation' },
        turmeric: { daily: 8000, season: 270, schedule: '15-20 irrigations during rhizome development', method: 'Furrow irrigation' },
        ginger: { daily: 8000, season: 240, schedule: '12-15 irrigations during rhizome development', method: 'Furrow irrigation' },
        coriander: { daily: 3000, season: 100, schedule: '4-5 light irrigations', method: 'Sprinkler irrigation' },
        cumin: { daily: 2500, season: 120, schedule: '3-4 irrigations avoiding excess moisture', method: 'Furrow irrigation' },
        fenugreek: { daily: 3000, season: 120, schedule: '4-5 irrigations during pod development', method: 'Furrow irrigation' },
        fennel: { daily: 4000, season: 150, schedule: '6-8 irrigations during umbel formation', method: 'Furrow irrigation' },
        jute: { daily: 8000, season: 120, schedule: '6-8 irrigations during fiber development', method: 'Furrow irrigation' },
        tea: { daily: 6000, season: 365, schedule: 'Frequent light irrigations year-round', method: 'Sprinkler irrigation' },
        coffee: { daily: 8000, season: 365, schedule: '10-12 irrigations during dry season', method: 'Drip irrigation' },
        rubber: { daily: 10000, season: 365, schedule: 'Regular irrigation during dry months', method: 'Basin irrigation' }
    };

    const requirements = waterData[crop];
    if (!requirements) {
        showResult(resultDiv, 'Irrigation data not available for this crop. Please select another crop.', 'error');
        return;
    }

    const dailyWater = (requirements.daily * landSize).toFixed(0);
    const seasonalWater = (requirements.daily * requirements.season * landSize / 1000).toFixed(1);
    const weeklyWater = (dailyWater * 7 / 1000).toFixed(1);

    const resultHTML = `
        <div style="text-align: left;">
            <h4 style="color: var(--primary-green); margin-bottom: 15px;">Irrigation Plan for ${landSize} acre(s) of ${crop.charAt(0).toUpperCase() + crop.slice(1)}:</h4>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h5 style="color: var(--primary-green); margin-bottom: 10px;">💧 Water Requirements:</h5>
                <p><i class="fas fa-tint" style="color: #2196f3;"></i> <strong>Daily:</strong> ${new Intl.NumberFormat().format(dailyWater)} liters</p>
                <p><i class="fas fa-calendar-week" style="color: #03a9f4;"></i> <strong>Weekly:</strong> ${weeklyWater} thousand liters</p>
                <p><i class="fas fa-calendar" style="color: #00bcd4;"></i> <strong>Seasonal:</strong> ${seasonalWater} thousand liters</p>
            </div>
            <div style="background: #e8f5e8; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
                <h5 style="color: var(--primary-green); margin-bottom: 5px;">📅 Irrigation Schedule:</h5>
                <p style="margin: 0; font-size: 0.9rem;">${requirements.schedule}</p>
            </div>
            <div style="background: #fff3e0; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
                <h5 style="color: var(--primary-green); margin-bottom: 5px;">🚿 Recommended Method:</h5>
                <p style="margin: 0; font-size: 0.9rem;">${requirements.method}</p>
            </div>
            <div style="background: #e3f2fd; padding: 10px; border-radius: 5px; font-size: 0.9rem;">
                <strong>💡 Pro Tip:</strong> Use drip irrigation to save 30-50% water and increase crop yields with better water use efficiency.
            </div>
            <div style="margin-top: 10px; padding: 8px; background: #f8f9fa; border-radius: 4px; font-size: 0.8rem; color: #666;">
                <strong>⚠️ Disclaimer:</strong> Water requirements vary by soil type, climate, and growing conditions. Values are per acre estimates. Adjust based on local conditions and weather patterns.
            </div>
        </div>
    `;

    showResult(resultDiv, resultHTML, 'success');
}

// Seed Calculator Function
function calculateSeedAmount() {
    const seedType = document.getElementById('seed-calc-select').value;
    const landArea = parseFloat(document.getElementById('seed-land-area').value);
    const resultDiv = document.getElementById('seed-calc-result');

    if (!seedType || !landArea || landArea <= 0) {
        showResult(resultDiv, 'Please select a seed type and enter a valid land area.', 'error');
        return;
    }

    // Comprehensive seed requirements per acre (in kg)
    const seedData = {
        // Cereals
        rice: { quantity: 20, spacing: '20 x 15 cm', depth: '2-3 cm', treatment: 'Treat with Carbendazim or Thiram', season: 'Kharif/Rabi' },
        wheat: { quantity: 40, spacing: 'Broadcasting or 20 cm rows', depth: '4-5 cm', treatment: 'Treat with Vitavax or Bavistin', season: 'Rabi' },
        maize: { quantity: 8, spacing: '60 x 20 cm', depth: '4-5 cm', treatment: 'Treat with Thiram or Captan', season: 'Kharif/Rabi' },
        barley: { quantity: 35, spacing: '20 cm rows', depth: '4-5 cm', treatment: 'Treat with Vitavax', season: 'Rabi' },
        sorghum: { quantity: 4, spacing: '45 x 15 cm', depth: '3-4 cm', treatment: 'Treat with Thiram', season: 'Kharif/Rabi' },
        pearl_millet: { quantity: 3.5, spacing: '45 x 15 cm', depth: '2-3 cm', treatment: 'Treat with Thiram', season: 'Kharif' },
        finger_millet: { quantity: 3, spacing: '25 x 10 cm', depth: '2-3 cm', treatment: 'Treat with Thiram', season: 'Kharif' },
        
        // Pulses
        chickpea: { quantity: 30, spacing: '30 x 10 cm', depth: '5-7 cm', treatment: 'Treat with Thiram + Rhizobium', season: 'Rabi' },
        lentil: { quantity: 15, spacing: '25 x 5 cm', depth: '4-5 cm', treatment: 'Treat with Thiram + Rhizobium', season: 'Rabi' },
        pigeon_pea: { quantity: 10, spacing: '90 x 20 cm', depth: '4-5 cm', treatment: 'Treat with Thiram + Rhizobium', season: 'Kharif' },
        black_gram: { quantity: 10, spacing: '30 x 10 cm', depth: '3-4 cm', treatment: 'Treat with Thiram + Rhizobium', season: 'Kharif' },
        green_gram: { quantity: 10, spacing: '30 x 10 cm', depth: '3-4 cm', treatment: 'Treat with Thiram + Rhizobium', season: 'Kharif/Summer' },
        field_pea: { quantity: 40, spacing: '30 x 10 cm', depth: '5-6 cm', treatment: 'Treat with Thiram + Rhizobium', season: 'Rabi' },
        kidney_bean: { quantity: 25, spacing: '45 x 20 cm', depth: '3-4 cm', treatment: 'Treat with Thiram + Rhizobium', season: 'Kharif' },
        
        // Oilseeds
        mustard: { quantity: 2.5, spacing: '30 x 10 cm', depth: '2-3 cm', treatment: 'Treat with Thiram', season: 'Rabi' },
        groundnut: { quantity: 50, spacing: '30 x 10 cm', depth: '5-6 cm', treatment: 'Treat with Thiram + Rhizobium', season: 'Kharif' },
        soybean: { quantity: 35, spacing: '45 x 5 cm', depth: '3-4 cm', treatment: 'Treat with Thiram + Rhizobium', season: 'Kharif' },
        sunflower: { quantity: 3, spacing: '60 x 30 cm', depth: '3-4 cm', treatment: 'Treat with Thiram', season: 'Kharif/Rabi' },
        sesame: { quantity: 1.5, spacing: '30 x 10 cm', depth: '2-3 cm', treatment: 'Treat with Thiram', season: 'Kharif' },
        safflower: { quantity: 8, spacing: '45 x 20 cm', depth: '3-4 cm', treatment: 'Treat with Thiram', season: 'Rabi' },
        castor: { quantity: 5, spacing: '90 x 60 cm', depth: '5-6 cm', treatment: 'Treat with Thiram', season: 'Kharif' },
        linseed: { quantity: 15, spacing: '30 x 10 cm', depth: '3-4 cm', treatment: 'Treat with Thiram', season: 'Rabi' },
        niger: { quantity: 3, spacing: '30 x 10 cm', depth: '2-3 cm', treatment: 'Treat with Thiram', season: 'Kharif' },
        
        // Cash Crops
        cotton: { quantity: 5, spacing: '90 x 60 cm', depth: '3-4 cm', treatment: 'Treat with Thiram + Imidacloprid', season: 'Kharif' },
        sugarcane: { quantity: 3000, spacing: '90 x 60 cm', depth: '10-12 cm', treatment: 'Dip setts in fungicide solution', season: 'Feb-Mar/Oct-Nov' },
        jute: { quantity: 3, spacing: 'Broadcasting', depth: '1-2 cm', treatment: 'No treatment required', season: 'Kharif' },
        tobacco: { quantity: 0.15, spacing: '90 x 60 cm (transplant)', depth: 'Nursery raised', treatment: 'Treat with fungicide', season: 'Kharif/Rabi' },
        
        // Vegetables
        tomato: { quantity: 0.15, spacing: '75 x 60 cm (transplant)', depth: 'Nursery raised', treatment: 'Treat with Thiram', season: 'Year-round' },
        potato: { quantity: 1200, spacing: '60 x 20 cm', depth: '7-10 cm', treatment: 'Treat with fungicide', season: 'Rabi' },
        onion: { quantity: 4, spacing: '15 x 10 cm (transplant)', depth: 'Nursery raised', treatment: 'Treat with Thiram', season: 'Rabi/Kharif' },
        garlic: { quantity: 200, spacing: '15 x 10 cm', depth: '3-4 cm', treatment: 'Treat with fungicide', season: 'Rabi' },
        chili: { quantity: 0.5, spacing: '60 x 45 cm (transplant)', depth: 'Nursery raised', treatment: 'Treat with Thiram', season: 'Kharif/Summer' },
        cabbage: { quantity: 0.2, spacing: '60 x 45 cm (transplant)', depth: 'Nursery raised', treatment: 'Treat with Thiram', season: 'Rabi' },
        cauliflower: { quantity: 0.2, spacing: '60 x 45 cm (transplant)', depth: 'Nursery raised', treatment: 'Treat with Thiram', season: 'Rabi' },
        brinjal: { quantity: 0.2, spacing: '75 x 60 cm (transplant)', depth: 'Nursery raised', treatment: 'Treat with Thiram', season: 'Year-round' },
        okra: { quantity: 3, spacing: '45 x 30 cm', depth: '2-3 cm', treatment: 'Treat with Thiram', season: 'Kharif/Summer' },
        carrot: { quantity: 2.5, spacing: 'Broadcasting or 20 cm rows', depth: '1-2 cm', treatment: 'No treatment required', season: 'Rabi' },
        radish: { quantity: 5, spacing: '30 x 10 cm', depth: '1-2 cm', treatment: 'No treatment required', season: 'Rabi' },
        spinach: { quantity: 10, spacing: 'Broadcasting', depth: '2-3 cm', treatment: 'No treatment required', season: 'Rabi' },
        pumpkin: { quantity: 1.5, spacing: '2.5 x 2 m', depth: '3-4 cm', treatment: 'Treat with Thiram', season: 'Kharif' },
        bitter_gourd: { quantity: 2, spacing: '2 x 2 m', depth: '2-3 cm', treatment: 'Treat with Thiram', season: 'Kharif/Summer' },
        bottle_gourd: { quantity: 2, spacing: '2 x 2 m', depth: '2-3 cm', treatment: 'Treat with Thiram', season: 'Kharif/Summer' },
        cucumber: { quantity: 1.5, spacing: '1.5 x 1 m', depth: '2-3 cm', treatment: 'Treat with Thiram', season: 'Summer' },
        peas: { quantity: 40, spacing: '30 x 10 cm', depth: '4-5 cm', treatment: 'Treat with Thiram + Rhizobium', season: 'Rabi' },
        beans: { quantity: 20, spacing: '45 x 20 cm', depth: '3-4 cm', treatment: 'Treat with Thiram + Rhizobium', season: 'Kharif/Rabi' },
        
        // Spices
        turmeric: { quantity: 800, spacing: '45 x 20 cm', depth: '5-7 cm', treatment: 'Dip rhizomes in fungicide', season: 'May-June' },
        ginger: { quantity: 700, spacing: '30 x 20 cm', depth: '5-7 cm', treatment: 'Dip rhizomes in fungicide', season: 'May-June' },
        coriander: { quantity: 10, spacing: '30 x 10 cm', depth: '2-3 cm', treatment: 'No treatment required', season: 'Rabi' },
        cumin: { quantity: 6, spacing: '30 x 10 cm', depth: '2-3 cm', treatment: 'Treat with Thiram', season: 'Rabi' },
        fenugreek: { quantity: 10, spacing: '30 x 10 cm', depth: '2-3 cm', treatment: 'No treatment required', season: 'Rabi' },
        fennel: { quantity: 4, spacing: '45 x 30 cm', depth: '2-3 cm', treatment: 'Treat with Thiram', season: 'Rabi' }
    };

    const requirements = seedData[seedType];
    if (!requirements) {
        showResult(resultDiv, 'Seed data not available for this seed type. Please select another type.', 'error');
        return;
    }

    const totalSeeds = (requirements.quantity * landArea).toFixed(1);
    const seedName = document.getElementById('seed-calc-select').options[document.getElementById('seed-calc-select').selectedIndex].text;

    const resultHTML = `
        <div style="text-align: left;">
            <h4 style="color: var(--primary-green); margin-bottom: 15px;">Seed Requirements for ${landArea} acre(s) of ${seedName}:</h4>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h5 style="color: var(--primary-green); margin-bottom: 10px;">🌾 Seed Quantity:</h5>
                <p style="font-size: 1.3rem; font-weight: bold; color: var(--primary-green); margin: 10px 0;">
                    <i class="fas fa-seedling" style="color: #4caf50;"></i> ${totalSeeds} kg
                </p>
            </div>
            <div style="background: #e8f5e8; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
                <h5 style="color: var(--primary-green); margin-bottom: 5px;">📏 Spacing:</h5>
                <p style="margin: 0; font-size: 0.9rem;">${requirements.spacing}</p>
            </div>
            <div style="background: #e3f2fd; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
                <h5 style="color: var(--primary-green); margin-bottom: 5px;">🌱 Sowing Depth:</h5>
                <p style="margin: 0; font-size: 0.9rem;">${requirements.depth}</p>
            </div>
            <div style="background: #fff3e0; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
                <h5 style="color: var(--primary-green); margin-bottom: 5px;">💊 Seed Treatment:</h5>
                <p style="margin: 0; font-size: 0.9rem;">${requirements.treatment}</p>
            </div>
            <div style="background: #fce4ec; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
                <h5 style="color: var(--primary-green); margin-bottom: 5px;">📅 Best Season:</h5>
                <p style="margin: 0; font-size: 0.9rem;">${requirements.season}</p>
            </div>
            <div style="background: #e8f5e8; padding: 10px; border-radius: 5px; font-size: 0.9rem;">
                <strong>💡 Pro Tip:</strong> Always use certified seeds from authorized dealers for better germination and disease resistance.
            </div>
            <div style="margin-top: 10px; padding: 8px; background: #f8f9fa; border-radius: 4px; font-size: 0.8rem; color: #666;">
                <strong>⚠️ Disclaimer:</strong> Seed requirements vary by variety, soil type, and sowing method. Values are general recommendations per acre. Consult local agricultural experts for precise requirements.
            </div>
        </div>
    `;

    showResult(resultDiv, resultHTML, 'success');
}

// Show Result Helper Function
function showResult(resultDiv, content, type) {
    resultDiv.innerHTML = content;
    resultDiv.className = `result show ${type}`;
    
    // Add different styling based on type
    if (type === 'error') {
        resultDiv.style.background = '#ffebee';
        resultDiv.style.borderColor = '#f44336';
        resultDiv.style.color = '#d32f2f';
    } else {
        resultDiv.style.background = '#fff9c4';
        resultDiv.style.borderColor = '#ffc107';
        resultDiv.style.color = '#1b5e20';
    }

    // Scroll to result
    setTimeout(() => {
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// Enhanced Table Row Hover Effect
document.addEventListener('DOMContentLoaded', function() {
    const tableRows = document.querySelectorAll('.crop-table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            this.style.zIndex = '1';
            this.style.position = 'relative';
        });

        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
            this.style.zIndex = 'auto';
            this.style.position = 'static';
        });
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.backgroundPosition = `center ${rate}px`;
    }
});

// Form Validation and Enhancement
document.addEventListener('DOMContentLoaded', function() {
    // Add focus effects to input fields
    const inputFields = document.querySelectorAll('.input-field');
    
    inputFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        field.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });

        // Add real-time validation feedback
        field.addEventListener('input', function() {
            if (this.type === 'number' && this.value < 0) {
                this.style.borderColor = '#f44336';
                this.style.boxShadow = '0 0 5px rgba(244, 67, 54, 0.3)';
            } else {
                this.style.borderColor = '#4caf50';
                this.style.boxShadow = '0 0 5px rgba(76, 175, 80, 0.3)';
            }
        });
    });
});

// Add loading animation to buttons
document.querySelectorAll('.calc-btn').forEach(button => {
    button.addEventListener('click', function() {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculating...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
        }, 1500);
    });
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on load (optional)
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Uncomment the next line if you want typing effect
        // typeWriter(heroTitle, originalText, 80);
    }
});

// Add smooth reveal animation to sections
const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.15
});

revealSections.forEach(section => {
    revealObserver.observe(section);
});

// Enhanced mobile menu animation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach((link, index) => {
        link.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Add scroll progress indicator
window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Create progress bar if it doesn't exist
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: ${scrolled}%;
            height: 3px;
            background: #ffc107;
            z-index: 9999;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);
    } else {
        progressBar.style.width = scrolled + '%';
    }
});

// Console log for debugging
console.log('Farmer Genius website loaded successfully! 🌱');
console.log('All interactive features are ready to use.');

// Error handling for calculations
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // You can add user-friendly error messages here
});

// Performance monitoring (optional)
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Website loaded in ${loadTime.toFixed(2)}ms`);
});

// ============== AI ASSISTANT CHATBOT FUNCTIONALITY ==============

// Chat widget state
let isChatOpen = false;

// Toggle chat widget visibility
function toggleChatWidget() {
    const chatWidget = document.getElementById('chat-widget');
    const chatButton = document.getElementById('chat-button');
    
    isChatOpen = !isChatOpen;
    
    if (isChatOpen) {
        chatWidget.style.display = 'flex';
        chatButton.style.display = 'none';
        setTimeout(() => {
            chatWidget.classList.add('chat-open');
        }, 10);
        
        // Focus on input when opening
        setTimeout(() => {
            document.getElementById('chat-input').focus();
        }, 300);
    } else {
        chatWidget.classList.remove('chat-open');
        setTimeout(() => {
            chatWidget.style.display = 'none';
            chatButton.style.display = 'flex';
        }, 300);
    }
}

// Simplified chat - no sessions needed, works everywhere!

// Send message function with real AI integration
async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Call AI API - simplified, no sessions!
        console.log('Sending message to AI API...');
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        });
        
        console.log('API Response status:', response.status);
        const data = await response.json();
        console.log('API Response data:', data);
        
        hideTypingIndicator();
        
        if (response.ok) {
            addMessage(data.response, 'bot');
        } else {
            addMessage(data.error || 'Sorry, I encountered an error. Please try again!', 'bot');
        }
    } catch (error) {
        hideTypingIndicator();
        console.error('Chat API Error Details:', error);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        addMessage('⚠️ Unable to connect to AI service. Please check browser console for details and ensure the server is running!', 'bot');
    }
}

// Handle Enter key in chat input
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

// Add message to chat
function addMessage(message, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
            <div class="message-avatar user-avatar">
                <i class="fas fa-user"></i>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
    }
    
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Animate message appearance
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 10);
}

// Show typing indicator
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'bot-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Quick question function
function askQuickQuestion(question) {
    document.getElementById('chat-input').value = question;
    sendMessage();
}


// Initialize chat widget state on page load
document.addEventListener('DOMContentLoaded', function() {
    const chatWidget = document.getElementById('chat-widget');
    const chatButton = document.getElementById('chat-button');
    
    // Initially hide chat widget
    chatWidget.style.display = 'none';
    chatButton.style.display = 'flex';
    
    // Add animation to chat button
    setTimeout(() => {
        chatButton.classList.add('pulse-animation');
    }, 3000);
});

// Add pulse animation class periodically to draw attention
setInterval(() => {
    const chatButton = document.getElementById('chat-button');
    if (chatButton && !isChatOpen) {
        chatButton.classList.add('pulse-animation');
        setTimeout(() => {
            chatButton.classList.remove('pulse-animation');
        }, 2000);
    }
}, 30000); // Every 30 seconds

// Navigation Toggle Functions
let navTimeout;

function toggleNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const icon = navToggle.querySelector('i');
    
    if (navbar.classList.contains('active')) {
        hideNavigation();
    } else {
        showNavigation();
    }
}

function showNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const icon = navToggle.querySelector('i');
    
    navbar.classList.add('active');
    navToggle.classList.add('active');
    icon.className = 'fas fa-times';
    
    // Start auto-hide timeout
    setTimeout(() => {
        if (navbar.classList.contains('active')) {
            startNavTimeout();
        }
    }, 100);
}

function hideNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const icon = navToggle.querySelector('i');
    
    navbar.classList.remove('active');
    navToggle.classList.remove('active');
    icon.className = 'fas fa-bars';
    
    clearTimeout(navTimeout);
}

function startNavTimeout() {
    clearTimeout(navTimeout);
    navTimeout = setTimeout(() => {
        const navbar = document.getElementById('navbar');
        if (navbar.classList.contains('active')) {
            hideNavigation();
        }
    }, 3000);
}

// ==================== SETTINGS FUNCTIONALITY ====================

// Initialize settings on page load
document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    setupSettingsEventListeners();
});

// Settings data structure
const defaultSettings = {
    theme: 'light',
    language: 'en',
    notifications: {
        weather: true,
        schemes: true,
        tips: true
    }
};

// Load settings from localStorage or use defaults
function loadSettings() {
    try {
        const savedSettings = localStorage.getItem('farmerGeniusSettings');
        const settings = savedSettings ? JSON.parse(savedSettings) : defaultSettings;
        
        // Apply theme
        applyTheme(settings.theme);
        
        // Apply language
        applyLanguage(settings.language);
        
        // Update settings page controls if on settings page
        updateSettingsUI(settings);
        
        return settings;
    } catch (error) {
        console.log('Error loading settings:', error);
        return defaultSettings;
    }
}

// Save settings to localStorage
function saveSettingsToStorage(settings) {
    try {
        localStorage.setItem('farmerGeniusSettings', JSON.stringify(settings));
        return true;
    } catch (error) {
        console.log('Error saving settings:', error);
        return false;
    }
}

// Apply theme to the document
function applyTheme(theme) {
    const body = document.body;
    if (theme === 'dark') {
        body.setAttribute('data-theme', 'dark');
    } else {
        body.removeAttribute('data-theme');
    }
}

// Dynamic message translations
const dynamicTranslations = {
    en: {
        'please_enter_city': 'Please enter a city name',
        'city_not_found': 'City not found. Please try again.',
        'unable_to_find_city': 'Unable to find city. Please try again.',
        'unable_to_fetch_weather': 'Unable to fetch weather data',
        'theme_changed': 'Theme changed to ${mode} mode',
        'settings_saved': 'Settings saved successfully!',
        'settings_error': 'Error saving settings. Please try again.'
    },
    hi: {
        'please_enter_city': 'कृपया शहर का नाम दर्ज करें',
        'city_not_found': 'शहर नहीं मिला। कृपया फिर से कोशिश करें।',
        'unable_to_find_city': 'शहर ढूंढने में असमर्थ। कृपया फिर से कोशिश करें।',
        'unable_to_fetch_weather': 'मौसम का डेटा प्राप्त करने में असमर्थ',
        'theme_changed': 'थीम ${mode} मोड में बदल दिया गया',
        'settings_saved': 'सेटिंग्स सफलतापूर्वक सहेजी गईं!',
        'settings_error': 'सेटिंग्स सहेजने में त्रुटि। कृपया फिर से कोशिश करें।'
    }
};

// Get translated message
function getMessage(key, replacements = {}) {
    const currentLang = document.documentElement.lang || 'en';
    const translations = dynamicTranslations[currentLang] || dynamicTranslations.en;
    let message = translations[key] || dynamicTranslations.en[key] || key;

    // Replace placeholders
    Object.keys(replacements).forEach(placeholder => {
        message = message.replace('${' + placeholder + '}', replacements[placeholder]);
    });

    return message;
}

// Apply language to the document
function applyLanguage(language) {
    document.documentElement.lang = language;

    // Update all elements with data-en and data-hi attributes
    const elements = document.querySelectorAll('[data-en][data-hi]');
    elements.forEach(element => {
        if (language === 'hi' && element.getAttribute('data-hi')) {
            element.textContent = element.getAttribute('data-hi');
        } else if (language === 'en' && element.getAttribute('data-en')) {
            element.textContent = element.getAttribute('data-en');
        }
    });

    // Update placeholders for input elements
    const inputElements = document.querySelectorAll('[data-en-placeholder][data-hi-placeholder]');
    inputElements.forEach(element => {
        if (language === 'hi' && element.getAttribute('data-hi-placeholder')) {
            element.placeholder = element.getAttribute('data-hi-placeholder');
        } else if (language === 'en' && element.getAttribute('data-en-placeholder')) {
            element.placeholder = element.getAttribute('data-en-placeholder');
        }
    });
}

// Update settings UI controls
function updateSettingsUI(settings) {
    // Update theme radio buttons
    const themeInputs = document.querySelectorAll('input[name="theme"]');
    themeInputs.forEach(input => {
        input.checked = input.value === settings.theme;
    });
    
    // Update language radio buttons
    const languageInputs = document.querySelectorAll('input[name="language"]');
    languageInputs.forEach(input => {
        input.checked = input.value === settings.language;
    });
    
    // Update notification checkboxes
    const weatherCheckbox = document.getElementById('weather-alerts');
    const schemeCheckbox = document.getElementById('scheme-updates');
    const tipsCheckbox = document.getElementById('farming-tips');
    
    if (weatherCheckbox) weatherCheckbox.checked = settings.notifications.weather;
    if (schemeCheckbox) schemeCheckbox.checked = settings.notifications.schemes;
    if (tipsCheckbox) tipsCheckbox.checked = settings.notifications.tips;
}

// Setup event listeners for settings controls
function setupSettingsEventListeners() {
    // Theme change listeners
    const themeInputs = document.querySelectorAll('input[name="theme"]');
    themeInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.checked) {
                applyTheme(this.value);
                showSettingsMessage(getMessage('theme_changed', { mode: this.value }), 'success');
            }
        });
    });
    
    // Language change listeners
    const languageInputs = document.querySelectorAll('input[name="language"]');
    languageInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.checked) {
                applyLanguage(this.value);
                const message = this.value === 'hi' ? 'भाषा हिंदी में बदली गई' : 'Language changed to English';
                showSettingsMessage(message, 'success');
            }
        });
    });
}

// Save all settings
function saveSettings() {
    try {
        const settings = {
            theme: document.querySelector('input[name="theme"]:checked')?.value || 'light',
            language: document.querySelector('input[name="language"]:checked')?.value || 'en',
            notifications: {
                weather: document.getElementById('weather-alerts')?.checked || false,
                schemes: document.getElementById('scheme-updates')?.checked || false,
                tips: document.getElementById('farming-tips')?.checked || false
            }
        };
        
        if (saveSettingsToStorage(settings)) {
            showSettingsMessage(getMessage('settings_saved'), 'success');
        } else {
            showSettingsMessage(getMessage('settings_error'), 'error');
        }
    } catch (error) {
        console.log('Error in saveSettings:', error);
        showSettingsMessage(getMessage('settings_error'), 'error');
    }
}

// Reset settings to default
function resetSettings() {
    try {
        const confirmMessage = document.documentElement.lang === 'hi' 
            ? 'क्या आप वाकई सेटिंग्स को डिफ़ॉल्ट पर रीसेट करना चाहते हैं?' 
            : 'Are you sure you want to reset settings to default?';
            
        if (confirm(confirmMessage)) {
            // Clear localStorage
            localStorage.removeItem('farmerGeniusSettings');
            
            // Apply default settings
            applyTheme(defaultSettings.theme);
            applyLanguage(defaultSettings.language);
            updateSettingsUI(defaultSettings);
            
            const message = defaultSettings.language === 'hi' 
                ? 'सेटिंग्स डिफ़ॉल्ट पर रीसेट हो गईं!' 
                : 'Settings reset to default!';
            showSettingsMessage(message, 'success');
        }
    } catch (error) {
        console.log('Error in resetSettings:', error);
        showSettingsMessage('Error resetting settings!', 'error');
    }
}

// Show settings message notification
function showSettingsMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.settings-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `settings-message ${type}`;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: 500;
        min-width: 250px;
        text-align: center;
        animation: slideInRight 0.3s ease;
    `;
    messageDiv.textContent = message;
    
    // Add to body
    document.body.appendChild(messageDiv);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 300);
        }
    }, 3000);
}

// Quick theme toggle function (can be called from anywhere)
function toggleTheme() {
    const currentSettings = loadSettings();
    const newTheme = currentSettings.theme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    
    // Update settings and save
    currentSettings.theme = newTheme;
    saveSettingsToStorage(currentSettings);
    updateSettingsUI(currentSettings);
    
    const message = newTheme === 'dark' 
        ? (currentSettings.language === 'hi' ? 'डार्क मोड सक्रिय' : 'Dark mode enabled')
        : (currentSettings.language === 'hi' ? 'लाइट मोड सक्रिय' : 'Light mode enabled');
    showSettingsMessage(message, 'success');
}

// Quick language toggle function
function toggleLanguage() {
    const currentSettings = loadSettings();
    const newLanguage = currentSettings.language === 'en' ? 'hi' : 'en';
    applyLanguage(newLanguage);
    
    // Update settings and save
    currentSettings.language = newLanguage;
    saveSettingsToStorage(currentSettings);
    updateSettingsUI(currentSettings);
    
    const message = newLanguage === 'hi' ? 'भाषा हिंदी में बदली गई' : 'Language changed to English';
    showSettingsMessage(message, 'success');
}

// Add CSS animations for messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Console logging for development
console.log('🌾 Farmer Genius Settings initialized! Available functions:');
console.log('- toggleTheme() - Quick theme toggle');
console.log('- toggleLanguage() - Quick language toggle'); 
console.log('- saveSettings() - Save all settings');
console.log('- resetSettings() - Reset to defaults');

// ========================================
// WEATHER WIDGET - AI-POWERED WEATHER ASSISTANT
// ========================================

// Weather widget initialization
(function initWeatherWidget() {
    // Create weather widget HTML with Hindi support
    const weatherWidgetHTML = `
        <div id="weather-widget" class="weather-widget">
            <div class="weather-widget-header">
                <div class="weather-title">
                    <i class="fas fa-cloud-sun"></i>
                    <span data-en="Weather" data-hi="मौसम">Weather</span>
                </div>
                <button class="weather-minimize" onclick="toggleWeatherWidget()">
                    <i class="fas fa-minus"></i>
                </button>
            </div>
            
            <div class="weather-content" id="weather-content">
                <div class="weather-location-input" id="location-input-section" style="display: none;">
                    <input type="text" id="city-input" placeholder="Enter city name..." data-en-placeholder="Enter city name..." data-hi-placeholder="शहर का नाम दर्ज करें..." class="city-input">
                    <button onclick="fetchWeatherByCity()" class="get-weather-btn">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
                
                <div class="weather-loading" id="weather-loading">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p data-en="Getting weather data..." data-hi="मौसम डेटा प्राप्त कर रहे हैं...">Getting weather data...</p>
                </div>
                
                <div class="weather-error" id="weather-error" style="display: none;">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p id="error-message" data-en="Unable to fetch weather data" data-hi="मौसम डेटा प्राप्त नहीं किया जा सका">Unable to fetch weather data</p>
                    <button onclick="showLocationInput()" class="retry-btn" data-en="Enter City" data-hi="शहर दर्ज करें">Enter City</button>
                </div>
                
                <div class="weather-data" id="weather-data" style="display: none;">
                    <div class="current-weather">
                        <div class="weather-location" id="weather-location" data-en="Loading..." data-hi="लोड हो रहा है...">Loading...</div>
                        <div class="weather-main">
                            <div class="weather-temp">
                                <span class="temp-value" id="current-temp">--</span>°C
                            </div>
                            <div class="weather-icon-main" id="weather-icon-main">
                                <i class="fas fa-sun"></i>
                            </div>
                        </div>
                        <div class="weather-condition" id="weather-condition">--</div>
                        <div class="weather-details">
                            <div class="detail-item">
                                <i class="fas fa-tint"></i>
                                <span id="humidity">--</span>%
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-wind"></i>
                                <span id="wind-speed">--</span> km/h
                            </div>
                        </div>
                    </div>
                    
                    <div class="forecast-section">
                        <div class="forecast-title" data-en="7-Day Forecast" data-hi="7-दिवसीय पूर्वानुमान">7-Day Forecast</div>
                        <div class="forecast-grid" id="forecast-grid"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Insert weather widget into the page
    document.body.insertAdjacentHTML('beforeend', weatherWidgetHTML);
    
    // Apply current language to weather widget
    const currentSettings = loadSettings();
    if (currentSettings && currentSettings.language) {
        setTimeout(() => {
            applyLanguage(currentSettings.language);
        }, 100);
    }
    
    // Initialize weather data
    initWeather();
    
    // Auto-update every hour
    setInterval(initWeather, 3600000); // 3600000ms = 1 hour
})();

// Weather codes mapping to conditions and icons with Hindi support
const weatherCodes = {
    0: { condition: 'Clear Sky', conditionHi: 'साफ आसमान', icon: 'fa-sun' },
    1: { condition: 'Mainly Clear', conditionHi: 'अधिकतर साफ', icon: 'fa-sun' },
    2: { condition: 'Partly Cloudy', conditionHi: 'आंशिक बादल', icon: 'fa-cloud-sun' },
    3: { condition: 'Overcast', conditionHi: 'बादल छाए', icon: 'fa-cloud' },
    45: { condition: 'Foggy', conditionHi: 'कोहरा', icon: 'fa-smog' },
    48: { condition: 'Foggy', conditionHi: 'कोहरा', icon: 'fa-smog' },
    51: { condition: 'Light Drizzle', conditionHi: 'हल्की बूंदाबांदी', icon: 'fa-cloud-rain' },
    53: { condition: 'Drizzle', conditionHi: 'बूंदाबांदी', icon: 'fa-cloud-rain' },
    55: { condition: 'Heavy Drizzle', conditionHi: 'तेज बूंदाबांदी', icon: 'fa-cloud-showers-heavy' },
    61: { condition: 'Light Rain', conditionHi: 'हल्की बारिश', icon: 'fa-cloud-rain' },
    63: { condition: 'Rain', conditionHi: 'बारिश', icon: 'fa-cloud-showers-heavy' },
    65: { condition: 'Heavy Rain', conditionHi: 'भारी बारिश', icon: 'fa-cloud-showers-heavy' },
    71: { condition: 'Light Snow', conditionHi: 'हल्की बर्फबारी', icon: 'fa-snowflake' },
    73: { condition: 'Snow', conditionHi: 'बर्फबारी', icon: 'fa-snowflake' },
    75: { condition: 'Heavy Snow', conditionHi: 'भारी बर्फबारी', icon: 'fa-snowflake' },
    77: { condition: 'Snow Grains', conditionHi: 'बर्फ के कण', icon: 'fa-snowflake' },
    80: { condition: 'Light Showers', conditionHi: 'हल्की बौछारें', icon: 'fa-cloud-rain' },
    81: { condition: 'Showers', conditionHi: 'बौछारें', icon: 'fa-cloud-showers-heavy' },
    82: { condition: 'Heavy Showers', conditionHi: 'भारी बौछारें', icon: 'fa-cloud-showers-heavy' },
    85: { condition: 'Light Snow Showers', conditionHi: 'हल्की बर्फ की बौछारें', icon: 'fa-snowflake' },
    86: { condition: 'Snow Showers', conditionHi: 'बर्फ की बौछारें', icon: 'fa-snowflake' },
    95: { condition: 'Thunderstorm', conditionHi: 'आंधी-तूफान', icon: 'fa-bolt' },
    96: { condition: 'Thunderstorm with Hail', conditionHi: 'ओलावृष्टि के साथ आंधी', icon: 'fa-bolt' },
    99: { condition: 'Thunderstorm with Hail', conditionHi: 'ओलावृष्टि के साथ आंधी', icon: 'fa-bolt' }
};

// Get day name from date
function getDayName(dateString) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(dateString);
    return days[date.getDay()];
}

// Initialize weather
function initWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherData(lat, lon);
            },
            error => {
                console.error('Geolocation error:', error);
                showLocationInput();
            }
        );
    } else {
        showLocationInput();
    }
}

// Show location input
function showLocationInput() {
    document.getElementById('weather-loading').style.display = 'none';
    document.getElementById('weather-error').style.display = 'none';
    document.getElementById('location-input-section').style.display = 'flex';
}

// Fetch weather by city name
async function fetchWeatherByCity() {
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value.trim();
    
    if (!city) {
        alert(getMessage('please_enter_city'));
        return;
    }
    
    document.getElementById('location-input-section').style.display = 'none';
    document.getElementById('weather-loading').style.display = 'block';
    
    try {
        // Geocode city to coordinates
        const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
        const geocodeResponse = await fetch(geocodeUrl);
        const geocodeData = await geocodeResponse.json();
        
        if (geocodeData.results && geocodeData.results.length > 0) {
            const location = geocodeData.results[0];
            fetchWeatherData(location.latitude, location.longitude, location.name);
        } else {
            showError(getMessage('city_not_found'));
        }
    } catch (error) {
        console.error('Geocoding error:', error);
        showError(getMessage('unable_to_find_city'));
    }
}

// Fetch weather data
async function fetchWeatherData(lat, lon, cityName = null) {
    try {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`;
        
        const response = await fetch(weatherUrl);
        const data = await response.json();
        
        displayWeatherData(data, cityName);
    } catch (error) {
        console.error('Weather API error:', error);
        showError(getMessage('unable_to_fetch_weather'));
    }
}

// Display weather data
function displayWeatherData(data, cityName) {
    document.getElementById('weather-loading').style.display = 'none';
    document.getElementById('weather-error').style.display = 'none';
    document.getElementById('weather-data').style.display = 'block';
    
    // Current weather
    const current = data.current;
    const weatherInfo = weatherCodes[current.weather_code] || weatherCodes[0];
    
    // Get current language
    const currentLang = document.documentElement.lang || 'en';
    const locationText = cityName || (currentLang === 'hi' ? 'आपका स्थान' : 'Your Location');
    
    document.getElementById('weather-location').textContent = locationText;
    document.getElementById('current-temp').textContent = Math.round(current.temperature_2m);
    document.getElementById('weather-condition').textContent = currentLang === 'hi' ? weatherInfo.conditionHi : weatherInfo.condition;
    document.getElementById('weather-icon-main').innerHTML = `<i class="fas ${weatherInfo.icon}"></i>`;
    document.getElementById('humidity').textContent = current.relative_humidity_2m;
    document.getElementById('wind-speed').textContent = Math.round(current.wind_speed_10m);
    
    // 7-day forecast
    const forecastGrid = document.getElementById('forecast-grid');
    forecastGrid.innerHTML = '';
    
    const daysHindi = ['आज', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];
    
    for (let i = 0; i < 7; i++) {
        const weatherInfo = weatherCodes[data.daily.weather_code[i]] || weatherCodes[0];
        const dayName = i === 0 ? (currentLang === 'hi' ? 'आज' : 'Today') : (currentLang === 'hi' ? daysHindi[new Date(data.daily.time[i]).getDay()] : getDayName(data.daily.time[i]));
        
        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
            <div class="forecast-day">${dayName}</div>
            <i class="fas ${weatherInfo.icon} forecast-icon"></i>
            <div class="forecast-temps">
                <span class="temp-max">${Math.round(data.daily.temperature_2m_max[i])}°</span>
                <span class="temp-min">${Math.round(data.daily.temperature_2m_min[i])}°</span>
            </div>
        `;
        forecastGrid.appendChild(forecastCard);
    }
}

// Show error
function showError(message) {
    document.getElementById('weather-loading').style.display = 'none';
    document.getElementById('weather-data').style.display = 'none';
    document.getElementById('weather-error').style.display = 'block';
    document.getElementById('error-message').textContent = message;
}

// Toggle weather widget
function toggleWeatherWidget() {
    const widget = document.getElementById('weather-widget');
    widget.classList.toggle('minimized');
}

console.log('🌤️ Weather Widget initialized! Auto-updating every hour.');