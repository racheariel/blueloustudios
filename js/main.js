/* ============================================================
   BLUE LOU STUDIOS — main.js
   Shared across all pages: nav, cart badge, email modal,
   checkout modal, focus trapping, body scroll lock.
   ============================================================ */

'use strict';

/* ============================================================
   CART UTILITIES (read-only — shop.js owns writes)
   ============================================================ */
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('bluelou_cart') || '[]');
  } catch (e) {
    return [];
  }
}

function cartTotal() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const count = cartTotal();
  badge.textContent = count;
  badge.classList.toggle('visible', count > 0);
}

/* ============================================================
   BODY SCROLL LOCK
   ============================================================ */
function lockScroll() { document.body.style.overflow = 'hidden'; }
function unlockScroll() { document.body.style.overflow = ''; }

/* ============================================================
   FOCUS TRAP
   ============================================================ */
function trapFocus(el) {
  const focusable = el.querySelectorAll(
    'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  function onKeydown(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  }

  el.addEventListener('keydown', onKeydown);
  if (first) first.focus();
  return () => el.removeEventListener('keydown', onKeydown);
}

/* ============================================================
   NAVIGATION
   ============================================================ */
function initNav() {
  const header    = document.getElementById('site-header');
  const hamburger = document.getElementById('nav-hamburger');

  // Active page link
  const page = document.body.dataset.page;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href').replace(/\?.*$/, '');
    const map  = { home: 'index.html', about: 'about.html', shop: 'shop.html', contact: 'contact.html' };
    if (map[page] && href.includes(map[page])) link.classList.add('active');
  });

  // Hamburger toggle
  if (hamburger && header) {
    hamburger.addEventListener('click', () => {
      const isOpen = header.hasAttribute('data-menu-open');
      if (isOpen) {
        header.removeAttribute('data-menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
      } else {
        header.setAttribute('data-menu-open', '');
        hamburger.setAttribute('aria-expanded', 'true');
      }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        header.removeAttribute('data-menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ============================================================
   CART DRAWER
   ============================================================ */
function renderCartDrawer() {
  const list     = document.getElementById('cart-items-list');
  const footer   = document.getElementById('cart-footer');
  const subtotal = document.getElementById('cart-subtotal');
  if (!list) return;

  const cart = getCart();
  list.innerHTML = '';

  if (cart.length === 0) {
    list.innerHTML = `
      <li class="cart-empty-state">
        <img src="assets/logo.svg" alt="" aria-hidden="true">
        <p>Your cart is empty — browse the shop and find something you love!</p>
        <a href="shop.html" class="btn btn-ghost btn-sm" style="margin-top:var(--space-md);">Visit the Shop</a>
      </li>`;
    if (footer) footer.style.display = 'none';
    return;
  }

  if (footer) footer.style.display = '';

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      <img class="cart-item-img" src="${item.img}" alt="${item.name}" loading="lazy">
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" data-action="dec" data-id="${item.id}" aria-label="Decrease quantity">−</button>
          <span class="cart-item-qty">${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-id="${item.id}" aria-label="Increase quantity">+</button>
          <button class="cart-item-remove" data-action="remove" data-id="${item.id}" aria-label="Remove ${item.name}">Remove</button>
        </div>
      </div>`;
    list.appendChild(li);
  });

  if (subtotal) subtotal.textContent = `$${total.toFixed(2)}`;

  // Qty / remove buttons
  list.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      const id     = btn.dataset.id;
      if (typeof window.cartAction === 'function') {
        window.cartAction(action, id);
      } else {
        // Fallback when shop.js not loaded
        let c = getCart();
        if (action === 'remove') {
          c = c.filter(i => i.id !== id);
        } else if (action === 'inc') {
          c = c.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i);
        } else if (action === 'dec') {
          c = c.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i)
               .filter(i => i.qty > 0);
        }
        try { localStorage.setItem('bluelou_cart', JSON.stringify(c)); } catch(e) {}
        renderCartDrawer();
        updateCartBadge();
      }
    });
  });
}

let releaseFocusTrap = null;

function openCart() {
  const drawer  = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (!drawer) return;
  renderCartDrawer();
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  overlay?.classList.add('visible');
  overlay?.removeAttribute('aria-hidden');
  const main = document.querySelector('main');
  if (main) main.setAttribute('aria-hidden', 'true');
  lockScroll();
  releaseFocusTrap = trapFocus(drawer);
}

function closeCart() {
  const drawer  = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  drawer?.classList.remove('open');
  drawer?.setAttribute('aria-hidden', 'true');
  overlay?.classList.remove('visible');
  overlay?.setAttribute('aria-hidden', 'true');
  const main = document.querySelector('main');
  if (main) main.removeAttribute('aria-hidden');
  unlockScroll();
  if (releaseFocusTrap) { releaseFocusTrap(); releaseFocusTrap = null; }
  document.getElementById('cart-btn')?.focus();
}

function initCart() {
  document.getElementById('cart-btn')?.addEventListener('click', openCart);
  document.getElementById('cart-close-btn')?.addEventListener('click', closeCart);
  document.getElementById('cart-overlay')?.addEventListener('click', closeCart);

  // Checkout button opens checkout modal
  document.getElementById('cart-checkout-btn')?.addEventListener('click', () => {
    closeCart();
    openCheckout();
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (document.getElementById('cart-drawer')?.classList.contains('open')) closeCart();
    }
  });
}

/* ============================================================
   CHECKOUT MODAL
   ============================================================ */
let checkoutStep = 0;
let releaseFocusTrapCheckout = null;

function openCheckout() {
  const overlay = document.getElementById('checkout-overlay');
  if (!overlay) return;
  checkoutStep = 1;
  renderCheckoutStep();
  overlay.classList.add('visible');
  overlay.setAttribute('aria-hidden', 'false');
  lockScroll();
  const modal = document.getElementById('checkout-modal');
  if (modal) releaseFocusTrapCheckout = trapFocus(modal);
}

function closeCheckout() {
  const overlay = document.getElementById('checkout-overlay');
  overlay?.classList.remove('visible');
  overlay?.setAttribute('aria-hidden', 'true');
  unlockScroll();
  if (releaseFocusTrapCheckout) { releaseFocusTrapCheckout(); releaseFocusTrapCheckout = null; }
  checkoutStep = 0;
}

function renderCheckoutStep() {
  const body  = document.getElementById('checkout-body');
  const title = document.getElementById('checkout-step-title');
  if (!body) return;
  const cart  = getCart();

  if (checkoutStep === 1) {
    if (title) title.textContent = 'Review Your Order';
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    body.innerHTML = `
      <ul style="display:flex;flex-direction:column;gap:var(--space-md);margin-bottom:var(--space-xl);">
        ${cart.map(i => `
          <li style="display:flex;justify-content:space-between;align-items:center;padding-bottom:var(--space-md);border-bottom:1px solid var(--color-light-gray);">
            <span style="font-family:var(--font-display);font-size:1.1rem;">${i.name} <span style="color:var(--color-mid-gray);font-size:0.85rem;">× ${i.qty}</span></span>
            <span style="color:var(--color-accent-warm);font-weight:500;">$${(i.price * i.qty).toFixed(2)}</span>
          </li>`).join('')}
      </ul>
      <div style="display:flex;justify-content:space-between;font-size:1.05rem;font-weight:500;margin-bottom:var(--space-xl);">
        <span>Total</span>
        <span style="color:var(--color-accent-warm);font-family:var(--font-display);font-size:1.3rem;">$${total.toFixed(2)}</span>
      </div>
      <button class="cart-checkout-btn" id="checkout-next-btn">Continue to Shipping</button>`;
    document.getElementById('checkout-next-btn')?.addEventListener('click', () => {
      checkoutStep = 2;
      renderCheckoutStep();
      if (releaseFocusTrapCheckout) releaseFocusTrapCheckout();
      const modal = document.getElementById('checkout-modal');
      if (modal) releaseFocusTrapCheckout = trapFocus(modal);
    });
  } else if (checkoutStep === 2) {
    if (title) title.textContent = 'Shipping & Contact';
    body.innerHTML = `
      <p style="color:var(--color-mid-gray);font-size:0.9rem;margin-bottom:var(--space-xl);">We'll be in touch to arrange payment. No credit card required right now.</p>
      <form id="checkout-form" novalidate>
        <div class="form-row">
          <div class="form-group">
            <label for="co-fname">First Name</label>
            <input type="text" id="co-fname" name="firstName" required>
            <span class="form-error">Please enter your first name.</span>
          </div>
          <div class="form-group">
            <label for="co-lname">Last Name</label>
            <input type="text" id="co-lname" name="lastName" required>
            <span class="form-error">Please enter your last name.</span>
          </div>
        </div>
        <div class="form-group">
          <label for="co-email">Email Address</label>
          <input type="email" id="co-email" name="email" required>
          <span class="form-error">Please enter a valid email.</span>
        </div>
        <div class="form-group">
          <label for="co-address">Street Address</label>
          <input type="text" id="co-address" name="address" required>
          <span class="form-error">Please enter your address.</span>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="co-city">City</label>
            <input type="text" id="co-city" name="city" required>
            <span class="form-error">Please enter your city.</span>
          </div>
          <div class="form-group">
            <label for="co-zip">ZIP Code</label>
            <input type="text" id="co-zip" name="zip" required>
            <span class="form-error">Please enter your ZIP code.</span>
          </div>
        </div>
        <div class="form-group">
          <label for="co-notes">Order Notes (optional)</label>
          <textarea id="co-notes" name="notes" rows="3" placeholder="Gift wrapping requests, custom color preferences, etc."></textarea>
        </div>
        <button type="submit" class="cart-checkout-btn" style="margin-top:var(--space-md);">Place Order</button>
      </form>`;

    document.getElementById('checkout-form')?.addEventListener('submit', e => {
      e.preventDefault();
      const form = e.target;
      let valid = true;
      form.querySelectorAll('[required]').forEach(input => {
        const group = input.closest('.form-group');
        const empty = !input.value.trim();
        const badEmail = input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
        group.classList.toggle('has-error', empty || badEmail);
        if (empty || badEmail) valid = false;
      });
      if (valid) {
        checkoutStep = 3;
        renderCheckoutStep();
        if (releaseFocusTrapCheckout) releaseFocusTrapCheckout();
        const modal = document.getElementById('checkout-modal');
        if (modal) releaseFocusTrapCheckout = trapFocus(modal);
      }
    });
  } else if (checkoutStep === 3) {
    if (title) title.textContent = 'Order Received!';
    body.innerHTML = `
      <div style="text-align:center;padding:var(--space-xl) 0;">
        <img src="assets/logo.svg" alt="Blue Lou the bunny" style="width:90px;margin:0 auto var(--space-xl);">
        <h3 style="color:var(--color-primary-dark);font-size:2rem;margin-bottom:var(--space-md);">Thank you so much!</h3>
        <p style="color:var(--color-mid-gray);max-width:36ch;margin:0 auto var(--space-xl);">We've received your order and will reach out within 1–2 days to arrange payment and shipping. We can't wait to get this to you!</p>
        <button class="btn btn-primary" id="close-confirm-btn">Back to Shopping</button>
      </div>`;
    try { localStorage.removeItem('bluelou_cart'); } catch(e) {}
    updateCartBadge();
    document.getElementById('close-confirm-btn')?.addEventListener('click', closeCheckout);
  }
}

function initCheckout() {
  document.getElementById('checkout-close')?.addEventListener('click', closeCheckout);
  document.getElementById('checkout-overlay')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeCheckout();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.getElementById('checkout-overlay')?.classList.contains('visible')) {
      closeCheckout();
    }
  });
}

/* ============================================================
   EMAIL MODAL
   ============================================================ */
const EMAIL_MODAL_HTML = `
  <div class="email-modal-overlay" id="email-modal-overlay" role="dialog" aria-modal="true" aria-label="Join our email list" aria-hidden="true">
    <div class="email-modal" id="email-modal">
      <button class="email-modal-close" id="email-modal-close" aria-label="Close">✕</button>
      <img src="assets/logo.svg" alt="Blue Lou the bunny" class="email-modal-bunny">
      <h2>Be the first to know</h2>
      <p>New pottery, behind-the-scenes studio updates, and the occasional Blue Lou moment — just for subscribers.</p>
      <form class="email-modal-form" id="email-modal-form" novalidate>
        <input type="text" name="firstName" placeholder="First name" aria-label="First name" required>
        <input type="email" name="email" placeholder="Email address" aria-label="Email address" required>
        <button type="submit" class="btn-subscribe-modal">Subscribe — it's free!</button>
      </form>
      <p class="email-modal-privacy">No spam, ever. Unsubscribe anytime.</p>
    </div>
  </div>`;

let releaseFocusTrapEmail = null;

function injectEmailModal() {
  if (document.getElementById('email-modal-overlay')) return;
  document.body.insertAdjacentHTML('beforeend', EMAIL_MODAL_HTML);
}

function openEmailModal() {
  const overlay = document.getElementById('email-modal-overlay');
  if (!overlay) return;
  overlay.classList.add('visible');
  overlay.setAttribute('aria-hidden', 'false');
  lockScroll();
  const modal = document.getElementById('email-modal');
  if (modal) releaseFocusTrapEmail = trapFocus(modal);
}

function closeEmailModal() {
  const overlay = document.getElementById('email-modal-overlay');
  overlay?.classList.remove('visible');
  overlay?.setAttribute('aria-hidden', 'true');
  unlockScroll();
  if (releaseFocusTrapEmail) { releaseFocusTrapEmail(); releaseFocusTrapEmail = null; }
  try { sessionStorage.setItem('bluelou_email_modal_seen', '1'); } catch(e) {}
}

function initEmailModal() {
  injectEmailModal();

  // Nav / footer email buttons
  document.getElementById('nav-email-btn')?.addEventListener('click', openEmailModal);
  document.getElementById('footer-email-btn')?.addEventListener('click', openEmailModal);

  // Home page banner form — open modal instead
  document.getElementById('home-email-form')?.addEventListener('submit', e => {
    e.preventDefault();
    openEmailModal();
  });

  // Modal close
  document.addEventListener('click', e => {
    if (e.target.id === 'email-modal-close' || e.target.id === 'email-modal-overlay') {
      closeEmailModal();
    }
  });

  // Modal form submit
  document.addEventListener('submit', e => {
    if (e.target.id === 'email-modal-form') {
      e.preventDefault();
      const modal = document.getElementById('email-modal');
      if (modal) {
        modal.innerHTML = `
          <img src="assets/logo.svg" alt="Blue Lou" style="width:70px;margin:0 auto var(--space-lg);">
          <h2 style="color:var(--color-primary-dark);">You're on the list!</h2>
          <p style="color:var(--color-mid-gray);max-width:28ch;margin:var(--space-md) auto var(--space-xl);">Thanks for joining us. We'll be in touch with all the good stuff.</p>
          <button class="btn btn-primary" id="email-success-close">Close</button>`;
        document.getElementById('email-success-close')?.addEventListener('click', closeEmailModal);
      }
      try { sessionStorage.setItem('bluelou_email_modal_seen', '1'); } catch(e) {}
    }
  });

  // Timed trigger (8s, once per session)
  try {
    if (!sessionStorage.getItem('bluelou_email_modal_seen')) {
      setTimeout(openEmailModal, 8000);
    }
  } catch(e) {}

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.getElementById('email-modal-overlay')?.classList.contains('visible')) {
      closeEmailModal();
    }
  });
}

/* ============================================================
   SHOP FILTER (URL param on non-shop pages)
   ============================================================ */
function handleShopFilter() {
  // On shop page: filter-btn already wired by shop.js
  // On other pages: clicking category links with ?filter= passes to shop page
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  initNav();
  initCart();
  initCheckout();
  initEmailModal();
  handleShopFilter();
});

// Expose for shop.js to call after cart updates
window.updateCartBadgeGlobal  = updateCartBadge;
window.renderCartDrawerGlobal = renderCartDrawer;
window.openCartGlobal         = openCart;
