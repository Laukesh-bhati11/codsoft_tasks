document.addEventListener('DOMContentLoaded', () => {

    // 1. DYNAMIC NAVIGATION HIGHLIGHTING
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Evaluates when the middle-upper part of the section intersects the view threshold
            if (window.scrollY >= (sectionTop - 160)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    });

    // 2. BACKEND/CTA INTERACTIVE ACTION HANDLERS
    const exploreBtn = document.getElementById('exploreBtn');
    const demoBtn = document.getElementById('demoBtn');
    const ctaActionBtn = document.getElementById('ctaActionBtn');

    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (demoBtn) {
        demoBtn.addEventListener('click', () => {
            alert('Launching secure interface simulator setup tracking state nodes...');
        });
    }

    if (ctaActionBtn) {
        ctaActionBtn.addEventListener('click', () => {
            alert('Initialization protocol requested. Verification terminal activated!');
        });
    }
});