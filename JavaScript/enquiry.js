/* ============================================
   EASY EVENT HIRE — enquiry.js
   Quote enquiry form with JS validation
   ============================================ */

const PRICING = {
  tent:    { name: 'Tent (Large)',     price: 1800, unit: 'per day' },
  chairs:  { name: 'Chairs (per 50)', price: 350,  unit: 'per day' },
  fridge:  { name: 'Mobile Fridge',   price: 950,  unit: 'per day' },
  sound:   { name: 'Sound System',    price: 1200, unit: 'per day' },
  tables:  { name: 'Tables (per 10)', price: 400,  unit: 'per day' },
};

const form    = document.getElementById('enquiry-form');
const result  = document.getElementById('quote-result');
const success = document.getElementById('enquiry-success');

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; el.classList.add('show'); }
  const input = document.querySelector(`[data-error="${id}"]`);
  if (input) input.classList.add('error');
}

function clearErrors() {
  document.querySelectorAll('.error-msg').forEach(e => e.classList.remove('show'));
  document.querySelectorAll('.error').forEach(e => e.classList.remove('error'));
}

function validate() {
  let ok = true;
  const name    = document.getElementById('eq-name');
  const email   = document.getElementById('eq-email');
  const phone   = document.getElementById('eq-phone');
  const date    = document.getElementById('eq-date');
  const service = document.getElementById('eq-service');
  const guests  = document.getElementById('eq-guests');

  if (!name.value.trim() || name.value.trim().length < 2) {
    showError('err-name', 'Please enter your full name (at least 2 characters).'); ok = false;
  }

  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRx.test(email.value.trim())) {
    showError('err-email', 'Please enter a valid email address.'); ok = false;
  }

  const phoneRx = /^[0-9\s+\-()]{9,15}$/;
  if (!phoneRx.test(phone.value.trim())) {
    showError('err-phone', 'Please enter a valid phone number (9–15 digits).'); ok = false;
  }

  const today = new Date(); today.setHours(0,0,0,0);
  const chosen = new Date(date.value);
  if (!date.value || chosen <= today) {
    showError('err-date', 'Please select a future event date.'); ok = false;
  }

  if (!service.value) {
    showError('err-service', 'Please select a service.'); ok = false;
  }

  const g = parseInt(guests.value, 10);
  if (isNaN(g) || g < 1 || g > 2000) {
    showError('err-guests', 'Please enter expected guests between 1 and 2000.'); ok = false;
  }

  return ok;
}

function buildQuote() {
  const service  = document.getElementById('eq-service').value;
  const guests   = parseInt(document.getElementById('eq-guests').value, 10);
  const date     = document.getElementById('eq-date').value;
  const name     = document.getElementById('eq-name').value.trim();

  const item     = PRICING[service];
  let basePrice  = item.price;

  // Scale price with guest count
  if (service === 'chairs' && guests > 50)  basePrice += Math.ceil((guests - 50) / 50) * 350;
  if (service === 'tables' && guests > 10)  basePrice += Math.ceil((guests - 10) / 10) * 400;
  if (service === 'tent'   && guests > 100) basePrice += Math.floor(guests / 100) * 400;

  const vat      = Math.round(basePrice * 0.15);
  const total    = basePrice + vat;
  const dateStr  = new Date(date).toLocaleDateString('en-ZA', { day:'numeric', month:'long', year:'numeric' });

  document.getElementById('q-name').textContent     = name;
  document.getElementById('q-service').textContent  = item.name;
  document.getElementById('q-guests').textContent   = guests + ' guests';
  document.getElementById('q-date').textContent     = dateStr;
  document.getElementById('q-base').textContent     = `R ${basePrice.toLocaleString()}`;
  document.getElementById('q-vat').textContent      = `R ${vat.toLocaleString()}`;
  document.getElementById('q-total').textContent    = `R ${total.toLocaleString()}`;
  

  result.classList.add('show');
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();
    if (validate()) {
      buildQuote();
      success.classList.add('show');
      form.querySelectorAll('input, select, textarea').forEach(el => {
        if (el.id !== 'eq-service' && el.id !== 'eq-guests' && el.id !== 'eq-date') {
          // keep service data for quote display
        }
      });
    }
  });
}

emailjs.init("dOFFIb1R1nJ-o2kSd");

function showToast(message, type) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.className = "show " + type;

    setTimeout(() => {
        toast.className = "";
    }, 3000);
}

