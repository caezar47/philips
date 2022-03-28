;(function ($, window, document, undefined) {
	$(document).ready(function() {
		var header = $('.header-bottom');
		var header_size = 0;
		var scrollBtn = $('[data-scrollto]');
		var hash = window.location.hash;
		var hashId = hash.replace('#', '');

		if (header.length > 0) {
			header_size = header.outerHeight();
		}
		if (scrollBtn.length > 0) {
			scrollBtn.on('click', function (e) {
				e.preventDefault();
				var btn = $(this);
				var block = $(btn.attr('href')).eq(0);
				var diff = parseInt(btn.attr('data-scrollto-diff')) || 0;
				var speed = parseInt(btn.attr('data-scrollto-speed')) || 777;
				$('body, html').animate({
					scrollTop: (block.offset().top - header_size + diff)
				}, speed);
				return false;
			});
		}
	});
})(jQuery, window, document);