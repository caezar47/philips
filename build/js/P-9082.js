;(function($, window, document, undefined) {
  $(document).ready(function() {
    $('.product-extended__picture').append($('.product-extended__bottom'));
    $(".reviews-list__item").each(function () {
      var revRec = $(this).find('.review-item__recommend');
      $(this).find($('.review-item__right')).append(revRec);
    });
    $(".reviews__show-more-btn").each(function () {
      $(this).text('Все отзывы');
    });
    $(".btn-in-stock").each(function () {
      $(this).text('Купить');
    });
    $(".button_in-stock").each(function () {
      $(this).text('Купить');
    });
    $(".widget-product-link-inline a").each(function () {
      var newLink = $(this).attr('href').replace('?___store=philips_lite_store_view','');
      $(this).attr({'href':newLink, 'target': '_blank'});
    });
    var revTitle = $('.reviews__title').text().replace('Отзывы','<span>Отзывы</span>');
    $('.reviews__title').html(revTitle);
  });
})(jQuery, window, document);
