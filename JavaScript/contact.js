/* ============================================
   EASY EVENT HIRE — contact.js
   Contact form with JS validation + mailto
   ============================================ */

const form    = document.getElementById('contact-form');
const success = document.getElementById('contact-success');

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; el.classList.add('show'); }
}

function clearErrors() {
  document.querySelectorAll('.error-msg').forEach(e => e.classList.remove('show'));
  document.querySelectorAll('.error').forEach(e => e.classList.remove('error'));
}

function validate() {
  let ok = true;

  const name    = document.getElementById('ct-name');
  const email   = document.getElementById('ct-email');
  const phone   = document.getElementById('ct-phone');
  const type    = document.getElementById('ct-type');
  const message = document.getElementById('ct-message');

  if (!name.value.trim() || name.value.trim().length < 2) {
    showError('ct-err-name', 'Full name is required (at least 2 characters).'); ok = false;
  }

  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRx.test(email.value.trim())) {
    showError('ct-err-email', 'Please enter a valid email address.'); ok = false;
  }

  const phoneRx = /^[0-9\s+\-()]{9,15}$/;
  if (!phoneRx.test(phone.value.trim())) {
    showError('ct-err-phone', 'Please enter a valid South African phone number.'); ok = false;
  }

  if (!type.value) {
    showError('ct-err-type', 'Please select a message type.'); ok = false;
  }

  if (message.value.trim().length < 10) {
    showError('ct-err-message', 'Your message must be at least 10 characters.'); ok = false;
  }

  return ok;
}

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();
    if (!validate()) return;

    const name    = document.getElementById('ct-name').value.trim();
    const email   = document.getElementById('ct-email').value.trim();
    const phone   = document.getElementById('ct-phone').value.trim();
    const type    = document.getElementById('ct-type').value;
    const message = document.getElementById('ct-message').value.trim();

    const subject  = encodeURIComponent(`Easy Event Hire — ${type}: Message from ${name}`);
    const body     = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nType: ${type}\n\nMessage:\n${message}`
    );

    // Open mail client
    window.location.href = `mailto:easyevent89@gmail.com?subject=${subject}&body=${body}`;

    success.classList.add('show');
    form.reset();
    success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const messageType = document.getElementById("messageType").value;
    const message = document.getElementById("message").value.trim();

    // Name Validation
    if (name.length < 3) {
        showToast("Name must be at least 3 characters long.", "error");
        return;
    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showToast("Please enter a valid email address.", "error");
        return;
    }

    // Phone Validation
    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(phone)) {
        showToast("Phone number must contain 10 digits.", "error");
        return;
    }

    // Message Type Validation
    if (messageType === "") {
        showToast("Please select a message type.", "error");
        return;
    }

    // Message Validation
    if (message.length < 10) {
        showToast("Message must be at least 10 characters long.", "error");
        return;
    }

    // EmailJS Submission
    emailjs.init("DOFFIb1R1nJ-o2k5d")
    emailjs.sendForm(
        "service_gwdteri",
        "template_7z48kl9",
        this
    )
    .then(() => {
        alert("Enquiry sent successfully!", "success");
        document.getElementById("contact-form").reset();
    })
    .catch((error) => {
        alert("Failed to send message.", "error");
        console.error(error);
    });
});