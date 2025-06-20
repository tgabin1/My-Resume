// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });

  // Dark mode toggle
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Load saved theme from localStorage (optional persistence)
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggleBtn.textContent = 'â˜€ï¸ Light Mode';
  }

  themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      themeToggleBtn.textContent = 'â˜€ï¸ Light Mode';
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggleBtn.textContent = 'í¼™ Dark Mode';
      localStorage.setItem('theme', 'light');
    }
  });

  // Contact form validation and submission handling
  const form = document.getElementById('contact-form');
  const successModal = document.getElementById('success-modal');
  const closeModalBtn = successModal.querySelector('.close-modal');

  const fields = [
    { id: 'name', errorId: 'name-error', validate: val => val.trim() !== '' },
    { id: 'email', errorId: 'email-error', validate: val => /^\S+@\S+\.\S+$/.test(val) },
    { id: 'subject', errorId: 'subject-error', validate: val => val.trim() !== '' },
    { id: 'message', errorId: 'message-error', validate: val => val.trim() !== '' }
  ];

  function clearErrors() {
    fields.forEach(({ errorId }) => {
      document.getElementById(errorId).textContent = '';
    });
  }

  function validateForm() {
    let isValid = true;
    fields.forEach(({ id, errorId, validate }) => {
      const input = document.getElementById(id);
      const errorEl = document.getElementById(errorId);
      if (!validate(input.value)) {
        errorEl.textContent = 'Please enter a valid value';
        isValid = false;
      } else {
        errorEl.textContent = '';
      }
    });
    return isValid;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();
    if (validateForm()) {
      // Normally, here you'd send the data to a server (e.g. via fetch)
      // For now, just show success modal and reset form
      successModal.style.display = 'flex';
      form.reset();
      navMenu.classList.remove('show'); // Close mobile menu if open
    }
  });

  // Close modal handlers
  closeModalBtn.addEventListener('click', () => {
    successModal.style.display = 'none';
  });

  // Close modal when clicking outside modal content
  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
      successModal.style.display = 'none';
    }
  });
});
