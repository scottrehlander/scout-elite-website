// Handles AJAX submission for the Brevo (sib) form on the support page

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('sib-form');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';

    // Gather form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Send AJAX request
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData
      });
      if (response.ok) {
        form.reset();
        form.innerHTML = '<div class="form-success">Thank you for contacting us! We have received your message.</div>';
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      form.querySelector('.error-message').textContent = 'There was a problem submitting the form. Please try again.';
      form.querySelector('.error-message').style.display = 'block';
    } finally {
      if (form.querySelector('.btn-text')) btnText.style.display = 'inline';
      if (form.querySelector('.btn-loading')) btnLoading.style.display = 'none';
    }
  });
});
