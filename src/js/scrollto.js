;(function ($, window, document, undefined) {
	$(document).ready(function() {
		var header_size = 0;
		var scrollBtn = $('[data-scrollto]');
		var hash = window.location.hash;
		var hashId = hash.replace('#', '');
		var scrollDiff = 0;
		var scrollSpeed = 600;

		$(window).scroll(function() {
			var header = $('.header-fixed .header-bottom');
			if (header.length > 0) {
				header_size = header.outerHeight();
			}
		}).scroll();

		if (scrollBtn.length > 0) {
			scrollBtn.on('click', function (e) {
				e.preventDefault();
				var btn = $(this);
				var block = $(btn.attr('href')).eq(0);
				var diff = parseInt(btn.attr('data-scrollto-diff')) || scrollDiff;
				var speed = parseInt(btn.attr('data-scrollto-speed')) || scrollSpeed;
				$('body, html').animate({
					scrollTop: (block.offset().top - header_size + diff)
				}, speed);
				return false;
			});
		}
		if (hash) {
			$('html, body').animate({
				scrollTop: $(hash).offset().top - header_size + scrollDiff
			}, scrollSpeed);
		}
	});
})(jQuery, window, document);