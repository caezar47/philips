;(function ($, window, document, undefined) {
	$(document).ready(function() {
		$.fn.simpleScroll = function(options) {
			options = $.extend({
				topOffset: 10,
				speed: 1000
			}, options);
			return this.each(function () {
				var $target = $(this);
				$('html, body').animate({
					scrollTop: $target.offset().top - options.topOffset
				}, options.speed);
			});
		};
		const MOBILE_WIDTH = 768;
		const $toggleBtns = $('.slide-toggle__btn');
		const hash = window.location.hash;

		var header = $('.header-bottom');
		var header_size = 0;
		if (header.length > 0) {
			header_size = header.outerHeight();
		}

		if ($toggleBtns.length > 0){
			$toggleBtns.on('click', function(evt) {
				var $btn = $(this);
				if ($(window).width() <= MOBILE_WIDTH || $btn.data('desktop')) {
					evt.preventDefault();
					var $toggleContainer = $btn.closest('.slide-toggle');
					if ($btn.hasClass('js-active-toggle')) {
						$btn.removeClass('js-active-toggle');
					} else {
						var $currentActiveBtn = $toggleContainer.find('.js-active-toggle');
						var $currentActiveList = $currentActiveBtn.siblings('.slide-toggle__list');
						$currentActiveList.slideToggle(400);
						$currentActiveBtn.removeClass('js-active-toggle')
						$btn.addClass('js-active-toggle');
					}

					var $toggleContent = $btn.siblings('.slide-toggle__list');

					$toggleContent.slideToggle(400, function() {
						if (!$toggleContent.data('noscroll')) {
							$btn.simpleScroll({
								topOffset: 150,
								speed: 500
							});
						}
					});
				}
			});
			if (hash) {
				const toggleBtn = document.querySelector('.content-accordion' + hash);
				const btnPosition = toggleBtn.getBoundingClientRect().top + window.pageYOffset;
				$('body, html').animate({
					scrollTop: (btnPosition - header_size)
				}, 500);
			}
		}

	});
})(jQuery, window, document);
