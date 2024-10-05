const scriptURL = 'https://script.google.com/macros/s/AKfycbw_GBp1I2PcvwtVjvdmc2Kjvl5MF92uIyt7YwLukz8WHfHiJ95LWs90zp7AuXWezfMD/exec';

const form = document.forms['contact-form'];
const loadingMessage = document.getElementById('loading');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', e => {
  e.preventDefault();

  // Set the current date in the hidden input
  const currentDate = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
  document.getElementById('submission-date').value = currentDate;

  // Capture the consent checkbox status
  const consentChecked = document.getElementById('consent').checked;
  const consentValue = consentChecked ? "Accepted" : "Rejected"; // Set to Accepted or Rejected

  // Append the consent value to the form data
  const formData = new FormData(form);
  formData.append('consent', consentValue); // Add consent value to FormData

  // Show the spinner
  loadingMessage.style.display = 'block';
  successMessage.style.display = 'none'; // Hide any previous success message

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(response => {
      if (response.ok) {
        successMessage.textContent = "Thank you for contacting us! Your form has been successfully submitted.";
        successMessage.style.display = 'block'; // Show success message
        form.reset(); // Clear the form
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .catch(error => {
      console.error('Error!', error.message);
      alert('There was an error submitting your form. Please try again.');
    })
    .finally(() => {
      // Hide the spinner
      loadingMessage.style.display = 'none';
    });
});
