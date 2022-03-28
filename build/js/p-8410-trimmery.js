;(function ($, window, document, undefined) {
    $(document).on('ready', function(e) {

        $(document).on('click', '.js-toggle-button', function(evt) {
            evt.preventDefault();
            var $that = $(this);
            var $toggleContent = $that.siblings('.js-toggle-content');

            if ($toggleContent.length) {
                $that.toggleClass('js-toggled');
                $toggleContent.toggleClass('js-toggled');
                $(window).trigger('resize');
            }
        });

        $('.trimmery-sku__slider .catalog__wrapper').addClass('swiper-wrapper');
        $('.trimmery-sku__slider .product-cont').addClass('swiper-slide');

        document.addEventListener('swiper:loaded', function() {
            var trimmerSlider = document.querySelector('.trimmery-card__slider');
            var featuresSlider = document.querySelector('.trimmery-features');
            var skuSlider = document.querySelector('.trimmery-sku__slider');

            if (trimmerSlider && !trimmerSlider.classList.contains('swiper-container-initialized')) {
                new Swiper(trimmerSlider, {
                    loop: true,
                    allowTouchMove: true,
                    slidesPerView: 1,
                    spaceBetween: 0,
                    navigation: {
                        nextEl: '.trimmery-card__slider-btn.swiper-button-next',
                        prevEl: '.trimmery-card__slider-btn.swiper-button-next'
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 15,
                        },
                        1024: {
                            allowTouchMove: false,
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                    },
                })
            }
            if (featuresSlider && !featuresSlider.classList.contains('swiper-container-initialized')) {
                new Swiper(featuresSlider, {
                    loop: true,
                    navigation: {
                        nextEl: '.trimmery-features__btn.swiper-button-next',
                        prevEl: '.trimmery-features__btn.swiper-button-prev'
                    }
                })
            }
            if (skuSlider && !skuSlider.classList.contains('swiper-container-initialized')) {
                new Swiper(skuSlider, {
                    loop: true,
                    slidesPerView: 1,
                    spaceBetween: 0,
                    allowTouchMove: true,
                    navigation: {
                        nextEl: '.trimmery-sku__slider-btn.swiper-button-next',
                        prevEl: '.trimmery-sku__slider-btn.swiper-button-prev'
                    },
                    breakpoints: {
                        574: {
                            slidesPerView: 2,
                            spaceBetween: 15,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 15,
                        },
                        1024: {
                            allowTouchMove: false,
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                    },
                })

                if (getFormConfig('pictureLazyLoad', false)) {
                    document.dispatchEvent(new Event('picture-lazy:reload'));
                }
            }
        });
        document.dispatchEvent(new Event('swiper:load'));

        var desc = $(".trimmery-description__card");

        desc.on('click',function(e) {
            if($(this).hasClass("card-visible")){
                $(this).removeClass('card-visible');
            } else {
                desc.removeClass('card-visible');
                $(this).toggleClass('card-visible');
            }
        });
        $(document.body).on('click', function(event) {
            if($(event.target).closest(desc).length == 0){
                desc.removeClass("card-visible");
            }
        });

        $(document.body).on('click', '.scrollto',function(event){
            event.preventDefault();

            var btn = $(this);

            var el = $(btn.attr('href')).eq(0);
            var diff = parseInt(btn.attr('data-scrollto-diff')) || 0;
            var speed = parseInt(btn.attr('data-scrollto-speed')) || 777;

            $('html, body').animate({
                scrollTop: (el.offset().top + diff)
            }, speed);
        });

        $(".button_in-stock").each(function () {
            $(this).text('Купить');
        });

    });
})(jQuery, window, document);
