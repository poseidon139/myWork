
// smooth scroll and theme toggle
$(document).ready(function(){
	// smooth scroll for nav links
	$(".nav-link").on('click', function(event) {

    	if (this.hash !== "") {
			var hash = this.hash;

			// Only prevent default and smooth scroll if the target element exists on the current page
			if ($(hash).length) {
				event.preventDefault();

				$('html, body').animate({
					scrollTop: $(hash).offset().top
				}, 700, function(){
					window.location.hash = hash;
				});
			}
      	} 
    });

	// theme handling
	function applyTheme(theme) {
		if (theme === 'dark') {
			$('body').addClass('dark-theme');
			$('#theme-toggle').text('☀️');
		} else {
			$('body').removeClass('dark-theme');
			$('#theme-toggle').text('🌙');
		}
		localStorage.setItem('theme', theme);
	}

	var stored = localStorage.getItem('theme') || 'light';
	applyTheme(stored);

	$('#theme-toggle').on('click', function(){
		var current = $('body').hasClass('dark-theme') ? 'dark' : 'light';
		applyTheme(current === 'dark' ? 'light' : 'dark');
	});
});