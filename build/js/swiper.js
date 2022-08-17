;(function ($, window, document, undefined) {
	$(document).on('ready', function(e) {

		if (typeof window.initUniversalSlider === 'function') {
			function preInitCallback() {};

			document.querySelectorAll('.js-slider').forEach((slider) => {
				const sliderBlock = window.initUniversalSlider(slider, {
					on: {
						transitionEnd: function () {
							document.dispatchEvent(new Event('productCardSlider:transitionEnd'));
						}
					}
				}, preInitCallback);
				sliderBlock.create();
			});
		}
	});
})(jQuery, window, document);
