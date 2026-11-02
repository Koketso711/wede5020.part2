/* Lulu's Pet Store - Part 3 JavaScript */
'use strict';

const DATA_URL = '../js/products.json';
const CONTACT_RECIPIENT = 'info@lulupetstore.co.za';
// Free demo API used to show AJAX submission (replace with Formspree/your own backend for real use)
const FORM_ENDPOINT = 'https://jsonplaceholder.typicode.com/posts';

/* ---------- Data loading (AJAX) ---------- */
let dataPromise = null;
function loadData() {
    if (!dataPromise) {
        dataPromise = fetch(DATA_URL).then(res => {
            if (!res.ok) throw new Error('Could not load data');
            return res.json();
        });
    }
    return dataPromise;
}

function formatRand(n) {
    return 'R' + Number(n).toFixed(2);
}

/* ---------- Footer year ---------- */
function initYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
}

/* ---------- Scroll reveal animation ---------- */
function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        items.forEach(i => i.classList.add('visible'));
        return;
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    items.forEach(i => observer.observe(i));
}

/* ---------- Back to top button (created with DOM manipulation) ---------- */
function initBackToTop() {
    const btn = document.createElement('button');
    btn.id = 'backToTop';
    btn.type = 'button';
    btn.textContent = '\u2191';
    btn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(btn);
    window.addEventListener('scroll', () => {
        btn.classList.toggle('show', window.scrollY > 300);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------- Accordion ---------- */
function initAccordion() {
    document.querySelectorAll('.accordion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const panel = btn.nextElementSibling;
            const isOpen = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', String(!isOpen));
            panel.style.maxHeight = isOpen ? null : panel.scrollHeight + 'px';
        });
    });
}

/* ---------- Modal ---------- */
function initModal() {
    const openBtn = document.getElementById('openHours');
    const modal = document.getElementById('hoursModal');
    if (!openBtn || !modal) return;
    const close = () => {
        modal.classList.remove('open');
        openBtn.focus();
    };
    openBtn.addEventListener('click', () => modal.classList.add('open'));
    modal.querySelector('.modal-close').addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('open')) close();
    });
}

/* ---------- Gallery lightbox ---------- */
function initLightbox() {
    const imgs = Array.from(document.querySelectorAll('.gallery img'));
    if (!imgs.length) return;

    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.innerHTML =
        '<button class="lb-close" type="button" aria-label="Close">&times;</button>' +
        '<button class="lb-prev" type="button" aria-label="Previous image">&#10094;</button>' +
        '<img alt="">' +
        '<button class="lb-next" type="button" aria-label="Next image">&#10095;</button>';
    document.body.appendChild(overlay);

    const big = overlay.querySelector('img');
    let index = 0;

    const show = i => {
        index = (i + imgs.length) % imgs.length;
        big.src = imgs[index].src;
        big.alt = imgs[index].alt;
        overlay.classList.add('open');
    };
    const hide = () => overlay.classList.remove('open');

    imgs.forEach((img, i) => img.addEventListener('click', () => show(i)));
    overlay.querySelector('.lb-close').addEventListener('click', hide);
    overlay.querySelector('.lb-prev').addEventListener('click', () => show(index - 1));
    overlay.querySelector('.lb-next').addEventListener('click', () => show(index + 1));
    overlay.addEventListener('click', e => { if (e.target === overlay) hide(); });
    document.addEventListener('keydown', e => {
        if (!overlay.classList.contains('open')) return;
        if (e.key === 'Escape') hide();
        if (e.key === 'ArrowLeft') show(index - 1);
        if (e.key === 'ArrowRight') show(index + 1);
    });
}

/* ---------- Dynamic products: load, search, filter, sort ---------- */
function initProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    const search = document.getElementById('productSearch');
    const category = document.getElementById('productCategory');
    const sort = document.getElementById('productSort');
    const count = document.getElementById('productCount');
    let products = [];

    function render() {
        const term = search.value.trim().toLowerCase();
        const list = products.filter(p =>
            p.name.toLowerCase().includes(term) &&
            (category.value === 'all' || p.category === category.value)
        );

        if (sort.value === 'price-asc') list.sort((a, b) => a.price - b.price);
        else if (sort.value === 'price-desc') list.sort((a, b) => b.price - a.price);
        else list.sort((a, b) => a.name.localeCompare(b.name));

        grid.replaceChildren();
        count.textContent = list.length + (list.length === 1 ? ' product found' : ' products found');

        if (!list.length) {
            const none = document.createElement('p');
            none.textContent = 'No products match your search.';
            grid.appendChild(none);
            return;
        }

        list.forEach(p => {
            const card = document.createElement('article');
            card.className = 'product-card';
            const title = document.createElement('h3');
            title.textContent = p.name;
            const cat = document.createElement('p');
            cat.className = 'product-cat';
            cat.textContent = p.category;
            const price = document.createElement('p');
            price.className = 'product-price';
            price.textContent = formatRand(p.price);
            const stock = document.createElement('span');
            stock.className = 'stock ' + (p.inStock ? 'in' : 'out');
            stock.textContent = p.inStock ? 'In stock' : 'Out of stock';
            card.append(title, cat, price, stock);
            grid.appendChild(card);
        });
    }

    loadData()
        .then(data => { products = data.products; render(); })
        .catch(() => { grid.textContent = 'Sorry, products could not be loaded right now.'; });

    search.addEventListener('input', render);
    category.addEventListener('change', render);
    sort.addEventListener('change', render);
}

/* ---------- Interactive map (Leaflet + OpenStreetMap) ---------- */
function initMap() {
    const mapEl = document.getElementById('map');
    if (!mapEl || typeof L === 'undefined') return;

    const branches = [
        { name: 'Main Branch', address: '78 Jan Smuts Avenue, Rosebank', lat: -26.1467, lng: 28.0436 },
        { name: 'Second Branch', address: '12 Rivonia Road, Sandton', lat: -26.1076, lng: 28.0567 }
    ];

    const map = L.map('map').setView([-26.127, 28.05], 12);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const markers = branches.map(b =>
        L.marker([b.lat, b.lng]).addTo(map)
            .bindPopup('<strong>' + b.name + '</strong><br>' + b.address)
    );

    document.querySelectorAll('[data-branch]').forEach(btn => {
        btn.addEventListener('click', () => {
            const i = Number(btn.dataset.branch);
            map.flyTo([branches[i].lat, branches[i].lng], 15);
            markers[i].openPopup();
        });
    });
}

/* ---------- Form validation helpers ---------- */
const validators = {
    name: v => (v.trim().length >= 2 && /^[A-Za-z\u00C0-\u024F' -]+$/.test(v.trim()))
        ? '' : 'Please enter your full name (letters only, at least 2 characters).',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
        ? '' : 'Please enter a valid email address, e.g. name@example.com.',
    phone: v => /^0\d{9}$/.test(v.replace(/[\s-]/g, ''))
        ? '' : 'Please enter a valid 10-digit South African number, e.g. 011 234 5678.',
    message: v => (v.trim().length >= 10 && v.trim().length <= 500)
        ? '' : 'Your message must be between 10 and 500 characters.',
    required: v => v ? '' : 'Please choose an option.',
    quantity: v => (/^\d+$/.test(v) && Number(v) >= 1 && Number(v) <= 20)
        ? '' : 'Please enter a quantity between 1 and 20.',
    date: v => {
        if (!v) return 'Please choose a date.';
        const chosen = new Date(v + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return chosen >= today ? '' : 'The date cannot be in the past.';
    }
};

function showError(field, msg) {
    const group = field.closest('.form-group');
    group.querySelector('.error').textContent = msg;
    field.classList.toggle('invalid', Boolean(msg));
    field.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
}

function validateField(field) {
    const rule = validators[field.dataset.validate];
    return showError(field, rule ? rule(field.value) : '');
}

function validateForm(form) {
    let ok = true;
    form.querySelectorAll('[data-validate]').forEach(f => {
        if (!validateField(f)) ok = false;
    });
    if (!ok) {
        const firstBad = form.querySelector('.invalid');
        if (firstBad) firstBad.focus();
    }
    return ok;
}

function attachLiveValidation(form) {
    form.querySelectorAll('[data-validate]').forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('change', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.classList.contains('invalid')) validateField(field);
        });
    });
}

/* ---------- Enquiry form: validate, AJAX submit, show cost + availability ---------- */
function initEnquiryForm() {
    const form = document.getElementById('enquiryForm');
    if (!form) return;
    const typeSelect = document.getElementById('enquiryType');
    const itemSelect = document.getElementById('item');
    const result = document.getElementById('enquiryResult');
    let data = null;

    attachLiveValidation(form);

    function fillItems() {
        itemSelect.replaceChildren(new Option('-- Select --', ''));
        if (!data || !typeSelect.value) return;
        const list = typeSelect.value === 'service' ? data.services : data.products;
        list.forEach(it => itemSelect.add(new Option(it.name + ' (' + formatRand(it.price) + ')', it.id)));
    }

    loadData().then(d => { data = d; fillItems(); }).catch(() => {});
    typeSelect.addEventListener('change', fillItems);

    form.addEventListener('submit', async e => {
        e.preventDefault();
        result.className = 'result';
        result.replaceChildren();
        if (!validateForm(form)) return;

        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Sending...';

        try {
            if (!data) throw new Error('Price data not loaded');
            const payload = Object.fromEntries(new FormData(form).entries());

            const res = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error('Submission failed');

            const list = payload.enquiryType === 'service' ? data.services : data.products;
            const item = list.find(i => i.id === Number(payload.item));
            const qty = Number(payload.quantity);
            const total = item.price * qty;

            let availability;
            if (payload.enquiryType === 'product') {
                availability = item.inStock
                    ? 'In stock and ready for collection.'
                    : 'Currently out of stock. We will contact you as soon as it arrives.';
            } else {
                const day = new Date(payload.date + 'T00:00:00').getDay();
                availability = day === 0
                    ? 'We are closed on Sundays. Please choose another date and we will confirm.'
                    : 'Available on your requested date, subject to confirmation.';
            }

            const heading = document.createElement('h3');
            heading.textContent = 'Thank you, ' + payload.name.trim().split(' ')[0] + '!';
            const p1 = document.createElement('p');
            p1.textContent = 'Your enquiry for ' + qty + ' x ' + item.name + ' has been received.';
            const p2 = document.createElement('p');
            p2.textContent = 'Estimated cost: ' + formatRand(total);
            const p3 = document.createElement('p');
            p3.textContent = 'Availability: ' + availability;
            result.append(heading, p1, p2, p3);
            result.classList.add('success');

            form.reset();
            fillItems();
        } catch (err) {
            result.textContent = 'Sorry, something went wrong sending your enquiry. Please try again.';
            result.classList.add('fail');
        } finally {
            btn.disabled = false;
            btn.textContent = 'Submit Enquiry';
        }
    });
}

/* ---------- Contact form: validate, then compile an email to the recipient ---------- */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const status = document.getElementById('contactStatus');
    attachLiveValidation(form);

    form.addEventListener('submit', e => {
        e.preventDefault();
        status.className = 'result';
        status.textContent = '';
        if (!validateForm(form)) return;

        const d = Object.fromEntries(new FormData(form).entries());
        const subject = '[' + d.messageType + '] Message from ' + d.name.trim();
        const body =
            'Name: ' + d.name.trim() + '\n' +
            'Email: ' + d.email.trim() + '\n' +
            'Phone: ' + d.phone.trim() + '\n' +
            'Message type: ' + d.messageType + '\n\n' +
            d.message.trim();

        window.location.href = 'mailto:' + CONTACT_RECIPIENT +
            '?subject=' + encodeURIComponent(subject) +
            '&body=' + encodeURIComponent(body);

        status.textContent = 'Your email app should now open with your message ready to send to ' + CONTACT_RECIPIENT + '.';
        status.classList.add('success');
    });
}

/* ---------- Start everything ---------- */
document.addEventListener('DOMContentLoaded', () => {
    [initYear, initReveal, initBackToTop, initAccordion, initModal, initLightbox,
     initProducts, initMap, initEnquiryForm, initContactForm].forEach(fn => fn());
});