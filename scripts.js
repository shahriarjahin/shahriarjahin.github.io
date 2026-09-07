document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img[src^="/imgs/"]').forEach((image) => {
        image.addEventListener('error', () => image.classList.add('asset-missing'), { once: true });
        image.src = `.${image.getAttribute('src')}`;
    });

    const menuToggle = document.querySelector('#menuToggle');
    const navLinks = document.querySelector('#navLinks');
    const menuIcon = menuToggle?.querySelector('i');

    menuToggle?.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuIcon.className = isOpen ? 'fas fa-xmark' : 'fas fa-bars';
    });

    document.querySelectorAll('.nav-links a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks?.classList.remove('open');
            if (menuIcon) menuIcon.className = 'fas fa-bars';
        });
    });

    const sections = [...document.querySelectorAll('section[id]')];
    const links = [...document.querySelectorAll('.nav-links a')];
    const activeSections = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            links.forEach((link) => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
        });
    }, { rootMargin: '-35% 0px -55% 0px' });

    sections.forEach((section) => activeSections.observe(section));
});