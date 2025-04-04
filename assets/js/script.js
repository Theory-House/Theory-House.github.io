document.addEventListener('DOMContentLoaded', function() {

    // --- Sticky Header ---
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active'); // For hamburger animation
        });

        // Close menu if clicking outside on mobile
        document.addEventListener('click', (event) => {
            const isClickInsideNav = mainNav.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }


    // --- Simple Fade-in Animations on Scroll ---
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');

    if ("IntersectionObserver" in window) {
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add 'visible' class to trigger CSS animation
                    entry.target.classList.add('visible');
                    // Optionally remove the class for re-animation on scroll up,
                    // but typically we want it to animate only once.
                    // entry.target.classList.remove('animated'); // Keep if re-animation desired
                    observer.unobserve(entry.target); // Stop observing once animated
                }
                // Use this if you want elements to fade out when scrolled out of view
                // else {
                //   entry.target.classList.remove('visible');
                // }
            });
        }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

        animatedElements.forEach(el => {
            el.classList.add('animated'); // Add base class to hide initially via CSS
            observer.observe(el);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        // Just make them visible immediately or use a simpler scroll listener
        animatedElements.forEach(el => el.style.opacity = '1');
    }


    // --- Update Copyright Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    console.log("Theory House JS Loaded.");

    // --- Active Nav Link Highlighting (Optional but nice) ---
    // Add active class based on current URL - simple version
    const currentLocation = location.href;
    const navLinks = document.querySelectorAll('.main-nav a');
    const navLength = navLinks.length;
    for (let i = 0; i < navLength; i++) {
        // Make comparison more robust (handles trailing slashes etc.)
        if (navLinks[i].href === currentLocation ||
            (navLinks[i].href + 'index.html' === currentLocation && navLinks[i].pathname.endsWith('/')) // Handle index.html implicitly
           )
        {
            // Remove active from siblings first (important if multiple could match slightly)
             document.querySelectorAll('.main-nav a.active').forEach(el => el.classList.remove('active'));
            navLinks[i].classList.add('active');
            // Break if specific match found (e.g. don't mark Home active if on /articles)
             if (navLinks[i].href === currentLocation) break;
        } else {
            navLinks[i].classList.remove('active'); // Remove if not matching
        }
    }
    // Ensure 'Home' is active if at the root
     if (currentLocation === (window.location.origin + '/') || currentLocation.endsWith('index.html') && !document.querySelector('.main-nav a.active')) {
         const homeLink = document.querySelector('.main-nav a[href$="index.html"], .main-nav a[href="/"]');
         if(homeLink) homeLink.classList.add('active');
    }

});