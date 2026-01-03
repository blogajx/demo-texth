    //custom JavaScript here
	/* =========================================
   1. DEFINE FUNCTIONS (Logic)
   ========================================= */

// Your Smart Sticky Header Logic
function initStickyHeader() {
    const header = document.getElementById('main-header');
    
    // Safety Check: If header isn't found, stop here to avoid errors
    if (!header) {
        console.warn("Sticky Header: #main-header not found");
        return;
    }

    // A. Handle Body Offset (So content doesn't hide behind nav)
    function setOffset() {
        const h = header.offsetHeight || 72;
        document.documentElement.style.setProperty('--header-h', h + 'px');
        document.body.classList.add('has-fixed-header');
    }
    
    setOffset();
    window.addEventListener('resize', setOffset);

    // B. Handle Scroll Direction (Hide/Show)
    let lastY = window.scrollY;
    let ticking = false;

    function onScroll() {
        const y = window.scrollY;
        const goingDown = y > lastY;

        // Add shadow background when scrolled slightly
        if (y > 10) header.classList.add('is-stuck');
        else header.classList.remove('is-stuck');

        // Hide header when scrolling down past 80px
        if (y > 80 && goingDown) {
            header.classList.add('is-hidden'); 
        } else {
            header.classList.remove('is-hidden'); 
        }

        lastY = y <= 0 ? 0 : y;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });
}

// Interaction Logic (Mobile Menu, Search, etc.)
function initNavbarInteractions() {
    const toggleBtn = document.getElementById("mobile-menu-btn");
    const navContent = document.getElementById("nav-content");
    const myBtn = document.getElementById("myBtn");
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile Toggle
    if (toggleBtn && navContent) {
        // Clear old listeners by cloning
        toggleBtn.replaceWith(toggleBtn.cloneNode(true));
        document.getElementById("mobile-menu-btn").addEventListener("click", function(e) {
            e.preventDefault();
            navContent.classList.toggle("show");
        });
    }

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navContent && navContent.classList.contains('show')) {
                navContent.classList.remove('show');
            }
        });
    });

    // Scroll to Top
    if (myBtn) {
        window.addEventListener("scroll", function() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                myBtn.style.display = "block";
            } else {
                myBtn.style.display = "none";
            }
        });
        myBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
}

/* =========================================
   2. EXECUTE (Load HTML -> Run Logic)
   ========================================= */

const basePath = ""; // Leave empty for root

fetch(basePath + "/navbar.html")
  .then(r => r.text())
  .then(html => {
    // Inject HTML
    const container = document.getElementById("navbar-container");
    if (container) container.innerHTML = html;

    // Run scripts AFTER HTML is in the DOM
    setTimeout(() => {
        initStickyHeader();
        initNavbarInteractions();
    }, 50);
  })
  .catch(err => console.error("Error loading navbar:", err));
  			
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	  anchor.addEventListener('click', function(e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
		  target.scrollIntoView({
			behavior: 'smooth'
		  });
		}
	  });
	});

	// Utility Functions for Robots txt file
        const isValidUrl = (url) => /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(url);

        const toggleModal = (show) => {
            document.getElementById('modalOverlay').style.display = show ? 'flex' : 'none';
        };

        // Form Data Collection
        const getFormValues = () => {
            const values = {
                websiteType: document.getElementById('websiteType').value,
                allow: document.getElementById('allow').value,
                delay: document.getElementById('delay').value,
                sitemap: document.getElementById('sitemap').value,
                directories: Array.from(document.querySelectorAll('[name^="dir"]'))
                               .map(input => input.value.trim())
                               .filter(v => v),
                engines: {
					google: document.getElementById('google').value,
					gimage: document.getElementById('gimage').value,
					bing: document.getElementById('bing').value,
					yahoo: document.getElementById('yahoo').value,
					duckduckgo: document.getElementById('duckduckgo').value,
					baidu: document.getElementById('baidu').value,
					yandex: document.getElementById('yandex').value
				}
            };
            return values;
        };

        // Robots.txt Generation
        const generateRobotsTxt = (domain, values) => {
			const cleanDomain = domain.replace(/\/$/, '');
			let content = `User-agent: *\n`;

			// Common rules for all types
			content += `Disallow: /?sessionid=\n`;
			content += `Disallow: /*.pdf$\n`;
			content += `Disallow: /*.doc$\n`;

			// Type-specific rules
			const isEcommerce = values.websiteType === 'ecommerce';
			if (isEcommerce) {
				content += `# Ecommerce-specific rules\n`;
				content += `Disallow: /wp-admin/\n`;
				content += `Disallow: /cgi-bin/\n`;
				content += `Disallow: /tmp/\n`;
				content += `Disallow: /cart/\n`;
				content += `Disallow: /checkout/\n`;
				content += `Disallow: /login/\n`;
				content += `Disallow: /search/\n`;
				content += `Disallow: /thank-you/\n`;
				content += `Disallow: /private/\n`;
				content += `Disallow: /?s=\n`;
				content += `Allow: /wp-admin/admin-ajax.php\n\n`;
			} else {
				content += `# Blog-specific rules\n`;
				content += `Disallow: /private/\n`;
				content += `Disallow: /tmp/\n`;
				content += `Disallow: /wp-admin/\n`;
				content += `Allow: /wp-admin/admin-ajax.php\n\n`;
			}

			// Default rules
			content += values.allow === '/' ? 'Disallow: /\n' : 'Allow: /\n';

			// Crawl delay
			if (values.delay) content += `Crawl-delay: ${values.delay}\n`;

			// Directories
			values.directories.forEach(dir => {
				if (dir) content += `Disallow: ${dir}\n`;
			});

			// Search engine specific rules
			const engineMap = {
				google: 'Googlebot',
				gimage: 'Googlebot-Image',
				bing: 'Bingbot',
				yahoo: 'Slurp',
				duckduckgo: 'DuckDuckBot',
				baidu: 'Baiduspider',
				yandex: 'YandexBot'
			};

			Object.entries(values.engines).forEach(([id, value]) => {
				if (value !== '') {
					content += `\nUser-agent: ${engineMap[id]}\n`;
					content += value === '/' ? 'Disallow: /\n' : 'Allow: /\n';
				}
			});

			// Sitemap
			content += `\nSitemap: ${values.sitemap || `${cleanDomain}/sitemap.xml`}`;

			return content;
		};


        // Main Generation Flow
        const generateRobots = () => {
            const url = document.getElementById('websiteUrl').value.trim();
            if (!isValidUrl(url)) {
                alert('Please enter a valid URL');
                return;
            }
            
            toggleModal(true);
            setTimeout(() => {
                const formValues = getFormValues();
                document.getElementById('generatedContent').value = 
                    generateRobotsTxt(url, formValues);
                document.getElementById('loadingState').style.display = 'none';
                document.getElementById('contentState').style.display = 'block';
            }, 1500);
        };

        // Directory Management
        let dirCount = 1;
        const addDirectory = () => {
            dirCount++;
            const newDir = document.createElement('div');
            newDir.className = 'row mb-2';
            newDir.innerHTML = `
                <div class="col-10">
                    <input class="tool_inp_sty" type="text" 
                           placeholder="/directory/" name="dir${dirCount}">
                </div>
                <div class="col-2 text-end">
                    <div class="new_input" onclick="this.parentElement.parentElement.remove()">×</div>
                </div>
            `;
            document.getElementById('directories').appendChild(newDir);
        };

        // File Operations
        const downloadRobots = () => {
            const content = document.getElementById('generatedContent').value;
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'robots.txt';
            a.click();
            URL.revokeObjectURL(url);
        };

        const copyToClipboard = async () => {
            try {
                await navigator.clipboard.writeText(
                    document.getElementById('generatedContent').value
                );
                alert('Copied to clipboard!');
            } catch (err) {
                alert('Failed to copy!');
            }
        };

        const resetGenerator = () => {
            toggleModal(false);
            document.getElementById('loadingState').style.display = 'block';
            document.getElementById('contentState').style.display = 'none';
            document.getElementById('websiteUrl').value = '';
            document.getElementById('generatedContent').value = '';
            dirCount = 1;
            document.querySelectorAll('[name^="dir"]').forEach((input, index) => {
                if(index > 0) input.parentElement.parentElement.remove();
            });
        };