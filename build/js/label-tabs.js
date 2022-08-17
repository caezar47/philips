;(function ($, window, document, undefined) {
	$(document).on('ready', function(e) {
		$('.js-tab-trigger').click(function() {
			var id = $(this).attr('data-tab'),
				content = $('.js-tab-content[data-tab="'+ id +'"]'),
				link = $(this).data('link'),
				wrap = $(this).closest($('.js-tab-wrap')),
				card = $(this).closest($('.js-card')),
				card_link = $('.js-card-link');

			wrap.find($('.js-tab-trigger.active')).removeClass('active');
			$(this).addClass('active');

			wrap.find($('.js-tab-content.active')).removeClass('active');
			content.addClass('active');
			card.find(card_link).attr("href",link);
		});
	});
})(jQuery, window, document);
