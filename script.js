document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.site-header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // --- Header scroll effect ---
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile menu toggle ---
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // --- Close mobile menu when clicking a link ---
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // --- Smooth Scrolling for All Page Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent the default jump
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Update Footer Year ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Highlight active nav link based on scroll position ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a');

    function highlightActiveNavLink() {
        let index = sections.length;

        while(--index && window.scrollY + 100 < sections[index].offsetTop) {} // 100 is an offset threshold

        navLinks.forEach((link) => link.classList.remove('active'));
        // Check if a corresponding link exists before trying to add the class
        let activeLink = document.querySelector(`.main-nav a[href="#${sections[index].id}"]`);
        if(activeLink) {
          activeLink.classList.add('active');
        } else if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
            // Highlight contact if scrolled to the very bottom
            let contactLink = document.querySelector('.main-nav a[href="#contact"]');
            if(contactLink) {
                navLinks.forEach((link) => link.classList.remove('active')); // Remove from others first
                contactLink.classList.add('active');
            }
        }
    }

    // Initial check in case the page loads scrolled down
    highlightActiveNavLink();
    // Add scroll listener
    window.addEventListener('scroll', highlightActiveNavLink);


    // --- Optional: Close other details when one is opened ---
    const allDetails = document.querySelectorAll('.faq-list details');
    allDetails.forEach(details => {
        details.addEventListener('toggle', event => {
            // Check if the details element was opened
            if (details.open) {
                // Close all other details elements
                allDetails.forEach(otherDetails => {
                    if (otherDetails !== details && otherDetails.open) {
                        otherDetails.removeAttribute('open');
                    }
                });
            }
        });
    });

});
