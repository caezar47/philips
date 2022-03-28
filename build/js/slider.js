;(function ($, window, document, undefined) {
	$(document).on('ready', function(e) {
		//slider
		$('.catalog-products__slider .catalog__wrapper').addClass('swiper-wrapper');
		$('.catalog-products__slider .product-cont').addClass('swiper-slide');

		const productSwipers = [];
		document.addEventListener('swiper:loaded', initProductWidgetSliders);
		document.dispatchEvent(new Event('swiper:load'));

		function productWidgetLoading() {
			var productWidgetCont = document.querySelectorAll('.swiper-section');


			if (productWidgetCont.length) {

				Array.prototype.forEach.call(productWidgetCont, function (item) {
					var container = item.querySelector('.swiper-container');
					var slides = container.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)');
					var slidesQty = container.dataset.slidesQty ? container.dataset.slidesQty : '';
					var theme = container.dataset.theme ? container.dataset.theme : '';
					var desktopLoop = container.dataset.desktopLoop == 'false' ? false : true;
					var autoplay = container.dataset.autoplay == 'true' ? true : false;
					var mobileWidth = container.dataset.mobileWidth;
					var disableSlider = container.dataset.disableSlider == 'true' ? true : false;
					var dataSlider = container.dataset.widget;
					var sliderScrollbar = document.querySelector('.product-widget-scrollbar-' + dataSlider);
					var sliderPagination = document.querySelector('.product-widget-pagination-' + dataSlider);
					var sliderNextBtn = document.querySelector('.slider-btn-next-' + dataSlider);
					var sliderPrevBtn = document.querySelector('.slider-btn-prev-' + dataSlider);
					if (disableSlider) {
						return;
					}
					var breakpoints = {
						0: {
							slidesPerView: 1,
							spaceBetween: 15,
						},
						768: {
							slidesPerView: 3,
							spaceBetween: 15,
						},
						1024: {
							slidesPerView: 4,
							spaceBetween: 15,
						}
					}
					if (theme == 'limited'){
						breakpoints = {
							0: {
								slidesPerView: 2,
								spaceBetween: 15,
							},
							768: {
								slidesPerView: 6,
								spaceBetween: 15,
							},
						}
					}
					if (slides.length > slidesQty || window.innerWidth <= mobileWidth) {
						var productWidget = new Swiper(container, {
							slidesPerView: 1,
							speed: 600,
							spaceBetween: 0,
							loop: desktopLoop,
							autoplay: (autoplay == true ? {delay: 5000, disableOnInteraction: false} : false),
							navigation: {
								nextEl: sliderNextBtn,
								prevEl: sliderPrevBtn,
							},
							scrollbar: {
								el: sliderScrollbar,
								draggable: true,
							},
							pagination: {
								el: sliderPagination,
								clickable: true,
							},
							breakpoints: breakpoints
						});
						productSwipers.push(productWidget);
					}
					if (getFormConfig('pictureLazyLoad', false)) {
						document.dispatchEvent(new Event('picture-lazy:reload'));
					}
					/*
					if (window.innerWidth > mobileWidth && theme) {
						productSwipers.forEach(function(item) {
							if (item.slides && slides.length <= slidesQty) {
								item.destroy(false, true);
							}
						});
					}
					*/
				});
			}
		}

		function initProductWidgetSliders() {
			productWidgetLoading();
			window.addEventListener('resize', productWidgetLoading);
		}
		//slider end's
	});
})(jQuery, window, document);
