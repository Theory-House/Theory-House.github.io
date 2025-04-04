// Basic script file for Theory House

document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth Scrolling for Nav Links ---
    // (This is often handled by CSS `scroll-behavior: smooth;` now,
    // but JS provides more control if needed)
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default anchor click behavior
            // e.preventDefault(); // Keep default for now to allow CSS smooth scroll

            // Remove active class from all links
            navLinks.forEach(nav => nav.classList.remove('active'));
            // Add active class to the clicked link
            this.classList.add('active');

            // Optional: JS-based smooth scroll (if CSS isn't enough)
            /*
            let targetId = this.getAttribute('href');
            let targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Adjust as needed (start, center, end)
                });
            }
            */
        });
    });

     // --- Update Active Nav Link on Scroll ---
     const sections = document.querySelectorAll('section[id]'); // Get all sections with an ID

     function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Adjust offset based on sticky header height if necessary
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) { // Adjust threshold as needed
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        // Handle case when scrolled to the very top
        if (pageYOffset < sections[0].offsetTop - window.innerHeight / 2) {
             navLinks.forEach(link => link.classList.remove('active'));
             const homeLink = document.querySelector('.main-nav a[href="#home"]');
             if(homeLink) homeLink.classList.add('active');
        }
     }

     window.addEventListener('scroll', updateActiveNav);
     updateActiveNav(); // Initial check on load


    // --- Update Copyright Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Placeholder for Mobile Menu Toggle ---
    // const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
    // const mainNav = document.querySelector('.main-nav');
    // if(mobileMenuButton && mainNav) {
    //     mobileMenuButton.addEventListener('click', () => {
    //         mainNav.classList.toggle('active'); // You'd need CSS for the .active state
    //     });
    // }

    console.log('Theory House script loaded.');

});