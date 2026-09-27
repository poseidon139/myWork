
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

	// Contact Form submission handler for Material Web text fields
	var $contactForm = $('#contact-form');
	if ($contactForm.length) {
		$contactForm.on('submit', function(e) {
			var emailEl = document.getElementById('contact-email');
			var messageEl = document.getElementById('contact-message');

			if (emailEl && !emailEl.value) {
				e.preventDefault();
				emailEl.focus();
				return false;
			}
			if (messageEl && !messageEl.value) {
				e.preventDefault();
				messageEl.focus();
				return false;
			}

			// Ensure standard form inputs exist for native POST
			var $hiddenEmail = $contactForm.find('input[name="_replyto"][type="hidden"]');
			if (!$hiddenEmail.length) {
				$hiddenEmail = $('<input type="hidden" name="_replyto">').appendTo($contactForm);
			}
			$hiddenEmail.val(emailEl ? emailEl.value : '');

			var $hiddenMsg = $contactForm.find('input[name="message"][type="hidden"]');
			if (!$hiddenMsg.length) {
				$hiddenMsg = $('<input type="hidden" name="message">').appendTo($contactForm);
			}
			$hiddenMsg.val(messageEl ? messageEl.value : '');
		});
	}
});