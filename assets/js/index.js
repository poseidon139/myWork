
// smooth scroll and theme toggle
$(document).ready(function(){
	// smooth scroll for nav links
	$(".nav-link").on('click', function(event) {

    	if (this.hash !== "") {

			event.preventDefault();

			var hash = this.hash;

			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 700, function(){
				window.location.hash = hash;
			});
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