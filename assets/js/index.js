
// smooth scroll, Material Web theme toggle, and FAB
$(document).ready(function(){
	// smooth scroll for nav links & anchor buttons
	$('a.nav-link, a[href^="#"]').on('click', function(event) {
		if (this.hash !== "") {
			var hash = this.hash;
			var $target = $(hash);

			// Only prevent default and smooth scroll if target element exists
			if ($target.length) {
				event.preventDefault();
				$('html, body').animate({
					scrollTop: $target.offset().top - 20
				}, 600, function(){
					window.location.hash = hash;
				});
			}
		}
	});

	// Material Web theme toggle
	function applyTheme(theme) {
		var $icon = $('#theme-icon');
		if (theme === 'dark') {
			$('body').addClass('dark-theme');
			if ($icon.length) {
				$icon.text('light_mode');
			}
			$('#theme-toggle').attr('title', 'Switch to light mode');
		} else {
			$('body').removeClass('dark-theme');
			if ($icon.length) {
				$icon.text('dark_mode');
			}
			$('#theme-toggle').attr('title', 'Switch to dark mode');
		}
		localStorage.setItem('theme', theme);
	}

	var stored = localStorage.getItem('theme') || 'light';
	applyTheme(stored);

	$(document).on('click', '#theme-toggle', function(){
		var current = $('body').hasClass('dark-theme') ? 'dark' : 'light';
		applyTheme(current === 'dark' ? 'light' : 'dark');
	});

	// Back to Top FAB
	var $backToTop = $('#back-to-top');
	if ($backToTop.length) {
		$(window).on('scroll', function() {
			if ($(this).scrollTop() > 350) {
				$backToTop.addClass('visible');
			} else {
				$backToTop.removeClass('visible');
			}
		});

		$backToTop.on('click', function() {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	}

	// Contact Form submission handler for Material Web text fields & Formspree AJAX
	var $contactForm = $('#contact-form');
	if ($contactForm.length) {
		$contactForm.on('submit', async function(e) {
			e.preventDefault();

			var emailEl = document.getElementById('contact-email');
			var messageEl = document.getElementById('contact-message');
			var $statusBanner = $('#contact-form-status');
			var $submitBtn = $('#contact-submit-btn');
			var $btnText = $('#contact-btn-text');

			var emailVal = emailEl ? (emailEl.value || '').trim() : '';
			var messageVal = messageEl ? (messageEl.value || '').trim() : '';

			function showStatus(msg, type) {
				$statusBanner
					.removeClass('status-success status-error')
					.addClass('status-' + type)
					.text(msg)
					.fadeIn(200);
			}

			// Client-side validation
			if (!emailVal) {
				showStatus('Please enter your email address.', 'error');
				if (emailEl) emailEl.focus();
				return;
			}

			var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(emailVal)) {
				showStatus('Please enter a valid email address.', 'error');
				if (emailEl) emailEl.focus();
				return;
			}

			if (!messageVal) {
				showStatus('Please enter a message before sending.', 'error');
				if (messageEl) messageEl.focus();
				return;
			}

			// Update button to sending state
			$submitBtn.prop('disabled', true);
			if ($btnText.length) {
				$btnText.text('Sending...');
			}
			$statusBanner.hide().removeClass('status-success status-error');

			try {
				var actionUrl = $contactForm.attr('action') || 'https://formspree.io/f/mzzzkrlk';
				var response = await fetch(actionUrl, {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: emailVal,
						message: messageVal
					})
				});

				if (response.ok) {
					showStatus('✓ Thank you! Your message has been sent successfully.', 'success');
					if (emailEl) emailEl.value = '';
					if (messageEl) messageEl.value = '';
				} else {
					var data = await response.json().catch(function() { return {}; });
					var errorMsg = 'Oops! There was a problem submitting your form.';
					if (data && data.errors && data.errors.length) {
						errorMsg = data.errors.map(function(err) { return err.message; }).join(', ');
					}
					showStatus(errorMsg + ' You can also email me directly at suryavardhan261@gmail.com.', 'error');
				}
			} catch (err) {
				showStatus('Could not send message. Please check your network connection or email me at suryavardhan261@gmail.com.', 'error');
			} finally {
				$submitBtn.prop('disabled', false);
				if ($btnText.length) {
					$btnText.text('Send Message');
				}
			}
		});
	}
});