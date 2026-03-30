document.addEventListener('DOMContentLoaded', () => {
    // WeChat Modal Logic
    const wechatTrigger = document.querySelector('.wechat-trigger');
    const wechatModal = document.getElementById('wechat-modal');
    const modalClose = document.querySelector('.modal-close');

    if (wechatTrigger && wechatModal) {
        wechatTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            wechatModal.classList.add('active');
        });

        modalClose.addEventListener('click', () => {
            wechatModal.classList.remove('active');
        });

        wechatModal.addEventListener('click', (e) => {
            if (e.target === wechatModal) {
                wechatModal.classList.remove('active');
            }
        });
    }

    // Contact Form Handling
    const form = document.querySelector('.contact-form');
    const status = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(form);
            const submitBtn = form.querySelector('.btn-submit');
            const originalBtnText = submitBtn.textContent;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
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
                submitBtn.textContent = originalBtnText;
            }
        });
    }
});
