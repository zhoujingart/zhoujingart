document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    const status = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(form);
            const submitBtn = form.querySelector('.btn-submit');
            const originalBtnText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';
            status.className = 'form-status';
            status.textContent = '';

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    status.classList.add('success');
                    status.textContent = 'Thank you! Your message has been sent.';
                    form.reset();
                } else {
                    const jsonData = await response.json();
                    status.classList.add('error');
                    if (Object.hasOwn(jsonData, 'errors')) {
                        status.textContent = jsonData.errors.map(error => error.message).join(", ");
                    } else {
                        status.textContent = 'Oops! There was a problem submitting your form.';
                    }
                }
            } catch (error) {
                status.classList.add('error');
                status.textContent = 'Oops! There was a problem submitting your form.';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }
});
