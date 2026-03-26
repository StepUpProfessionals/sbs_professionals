/* ==========================================
   STEP UP — PLAN ESSENTIAL PROFESIONALES
   script.js
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- CURRENT YEAR ---------- */
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- HEADER SCROLL ---------- */
    const header = document.getElementById('siteHeader');
    const updateHeader = () => {
        if (window.scrollY > 20) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    /* ---------- MOBILE MENU ---------- */
    const toggle = document.getElementById('mobileToggle');
    const nav = document.getElementById('mainNav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            nav.classList.toggle('open');
            document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
        });
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                nav.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    /* ---------- SMOOTH SCROLL ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const id = anchor.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                const offset = header ? header.offsetHeight : 72;
                window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset - 16, behavior: 'smooth' });
            }
        });
    });

    /* ---------- FAQ ACCORDION ---------- */
    document.querySelectorAll('.faq-item').forEach(item => {
        const q = item.querySelector('.faq-question');
        q.addEventListener('click', () => {
            const open = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-question').setAttribute('aria-expanded','false');
            });
            if (!open) { item.classList.add('active'); q.setAttribute('aria-expanded','true'); }
        });
    });

    /* ---------- ENTRANCE ANIMATIONS ---------- */
    const els = document.querySelectorAll('[data-animate]');
    if (els.length && 'IntersectionObserver' in window) {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        els.forEach(el => obs.observe(el));
    } else { els.forEach(el => el.classList.add('visible')); }
});
