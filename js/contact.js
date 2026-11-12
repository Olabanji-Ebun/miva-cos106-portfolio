/**
 * contact.js
 * Client-side validation + EmailJS integration for the Contact Form:
 * 1. No field is empty
 * 2. Email format is valid
 * 3. Phone number contains only digits
 * 4. Sends email via EmailJS when configured, with instant status feedback
 */

const EMAILJS_CONFIG = {
  publicKey: "It6aWt3wzjVjjYua8",
  serviceId: "service_w4k3188",
  templateId: "template_7dqsc79"
};

document.addEventListener("DOMContentLoaded", () => {
  if (typeof emailjs !== "undefined" && isEmailJsConfigured()) {
    emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
  }

  const form = document.getElementById("contact-form");
  if (!form) return;

  const fields = ["contact-name", "contact-email", "contact-phone", "contact-message"];
  fields.forEach((fieldId) => {
    const input = document.getElementById(fieldId);
    if (input) {
      input.addEventListener("input", () => clearFieldError(fieldId));
    }
  });

  form.addEventListener("submit", handleContactSubmit);
});

function isEmailJsConfigured() {
  return (
    EMAILJS_CONFIG.publicKey !== "YOUR_EMAILJS_PUBLIC_KEY" &&
    EMAILJS_CONFIG.serviceId !== "YOUR_EMAILJS_SERVICE_ID" &&
    EMAILJS_CONFIG.templateId !== "YOUR_EMAILJS_TEMPLATE_ID"
  );
}

async function handleContactSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const phoneInput = document.getElementById("contact-phone");
  const messageInput = document.getElementById("contact-message");
  const feedbackEl = document.getElementById("contact-feedback");
  const submitBtn = document.getElementById("contact-submit-btn");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const message = messageInput.value.trim();

  let isValid = true;

  if (!name) {
    setFieldError("contact-name", "Please enter your full name.");
    isValid = false;
  } else {
    clearFieldError("contact-name");
  }

  if (!email) {
    setFieldError("contact-email", "Please enter your email address.");
    isValid = false;
  } else if (!isValidEmail(email)) {
    setFieldError("contact-email", "Please enter a valid email address (e.g. name@example.com).");
    isValid = false;
  } else {
    clearFieldError("contact-email");
  }

  if (!phone) {
    setFieldError("contact-phone", "Please enter your phone number.");
    isValid = false;
  } else if (!isDigitsOnly(phone)) {
    setFieldError("contact-phone", "Phone number must contain digits only (0-9).");
    isValid = false;
  } else {
    clearFieldError("contact-phone");
  }

  if (!message) {
    setFieldError("contact-message", "Please enter a message.");
    isValid = false;
  } else {
    clearFieldError("contact-message");
  }

  if (!isValid) {
    feedbackEl.hidden = false;
    feedbackEl.className = "form-feedback is-error";
    feedbackEl.textContent = "Please fix the highlighted fields above before submitting.";
    return;
  }

  if (typeof emailjs !== "undefined" && isEmailJsConfigured()) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const SEND_TIMEOUT_MS = 10000;
    let timeoutId;

    try {
      const templateParams = {
        name,
        email,
        phone,
        message,
        time: new Date().toLocaleString()
      };

      const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(new Error("REQUEST_TIMEOUT"));
        }, SEND_TIMEOUT_MS);
      });

      await Promise.race([
        emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          templateParams
        ),
        timeoutPromise
      ]);

      feedbackEl.hidden = false;
      feedbackEl.className = "form-feedback is-success";
      feedbackEl.textContent = `Your message has been sent, ${name}. Thank you for reaching out!`;
      form.reset();
    } catch (error) {
      feedbackEl.hidden = false;
      feedbackEl.className = "form-feedback is-error";
      feedbackEl.textContent =
        error.message === "REQUEST_TIMEOUT"
          ? "Sending is taking longer than expected. Please check your connection or email me directly at ayooluwaebun28@gmail.com."
          : "Unable to send your message right now. Please try again shortly.";
    } finally {
      clearTimeout(timeoutId);
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }
    return;
  }

  feedbackEl.hidden = false;
  feedbackEl.className = "form-feedback is-success";
  feedbackEl.textContent = `Your message has been sent, ${name}. Thank you for reaching out!`;
  form.reset();
}

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function isDigitsOnly(value) {
  const digitsPattern = /^\d+$/;
  return digitsPattern.test(value);
}

function setFieldError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}-error`);
  if (input) input.classList.add("is-invalid");
  if (errorEl) errorEl.textContent = message;
}

function clearFieldError(fieldId) {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}-error`);
  if (input) input.classList.remove("is-invalid");
  if (errorEl) errorEl.textContent = "";
}
