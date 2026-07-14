document.addEventListener('DOMContentLoaded', () => {
    
    // 1. HIGHLIGHT ACTIVE NAV LINK ON SCROLL
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Checks if current scroll window is inside the context of the section
            if (window.scrollY >= (sectionTop - 150)) {
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

    // 2. DEMO REACTION TO CLICKS (Ensuring buttons act responsibly)
    const resumeBtn = document.querySelector('.btn-secondary');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', (e) => {
            // Standard action occurs (emailing back client matching fallback link), adding interactive alert
            console.log('Resume Request triggered successfully.');
        });
    }
});