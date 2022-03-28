; (function($, window, document, undefined) {
    $(document).on('ready', function(e) {
        var hash = window.location.hash;
        var hashId = hash.replace('#', '');
        if( hash ){
            $('.valentine-card__category .filter__checkbox.cat').removeClass('is-active');
        }
        $('.valentine-card__category .filter__checkbox.cat[data-link="'+hash+'"]').addClass('is-active');

        if (hash  == '#for-woman' || hash  == '#for-men') {
            $('.all_categories.cat-block').addClass('hide');
            $('.all_categories[id="'+hashId+'"]').removeClass('hide');
            $('html, body').animate({
                scrollTop: $('.valentine-card__flex').offset().top - 60
            }, 300);
        }

        var resetButton = document.querySelector('.filters__reset');
        var resetButton2 = document.querySelector('.filters__reset2');
        var filterBtn = document.querySelector('.filter-outter');

        filterBtn.addEventListener('click', function(e) {
            if(e.target.classList.contains('filter-outter') || e.target.classList.contains('filter-outter-img') || e.target.classList.contains('filter-outter-text')) {
                filterBtn.querySelector(".filter").classList.toggle('block');
            }
        });

        var showList = function(event) {
            var checkbox = event.target;
            document.querySelectorAll('.filter__checkbox.cat').forEach(function(item) {
                var target = document.querySelector(item.dataset.link);
                if (!item.checked) {
                    item.classList.remove('is-active');
                    target.classList.add('hide');
                } else {
                    $('.filter__checkbox.cat').removeClass('is-active').prop('checked', false);
                    $('.all_categories.cat-block').addClass('hide');
                    item.classList.add('is-active');
                    target.classList.remove('hide');

                }
            });
        };

        var showSaleList = function (event) {
            if(window.innerWidth > 1024) {

                document.querySelectorAll('.valentine-card__filter .filter__checkbox.sale').forEach(function (item) {

                    var saleTarget = document.querySelectorAll(item.dataset.saleLink);
                    if (!item.checked) {
                        item.classList.remove('is-active');
                        saleTarget.forEach(function (item) {
                            item.classList.add('hide');
                        })
                    } else {
                        item.classList.add('is-active');
                        saleTarget.forEach(function (item) {
                            if(item.innerHTML !== "") {
                                item.classList.remove('hide');
                            }
                            else {
                                item.closest('.all_categories').classList.add('hide');
                            }
                        })

                    }
                });
                if (document.querySelectorAll('.valentine-card__filter .filter__checkbox.sale.is-active').length === 0) {
                    resetSaleFilters();
                }
            }

            else {
                document.querySelectorAll('.filter__checkbox.sale.mob').forEach(function (item) {
                    var saleTarget = document.querySelectorAll(item.dataset.saleLink);
                    if (!item.checked) {
                        item.classList.remove('is-active');
                        saleTarget.forEach(function (item) {
                            item.classList.add('hide');
                        })
                    } else {
                        item.classList.add('is-active');
                        saleTarget.forEach(function (item) {
                            if(item.innerHTML !== "") {
                                item.classList.remove('hide');
                            }
                            else {
                                item.closest('.all_categories').classList.add('hide');
                            }
                        })

                    }
                });
                if (document.querySelectorAll('.filter__checkbox.sale.mob.is-active').length === 0) {
                    resetSaleFilters();
                }
            }


        }

        document.querySelectorAll('.valentine-card__filter-mob .filter__checkbox.sale.mob').forEach(function(item) {
            item.addEventListener('change', showSaleList);
        });

        document.querySelectorAll('.valentine-card__filter .filter__checkbox.sale').forEach(function(item) {
            item.addEventListener('change', showSaleList);
        });

        document.querySelectorAll('.valentine-card__category .filter__checkbox.cat').forEach(function(item) {
            item.addEventListener('change', showList);
        });

        resetButton.addEventListener('click', function(e) {
            resetSaleFilters();
        })
        resetButton2.addEventListener('click', function(e) {
            resetSaleFilters();
        })

        function resetSaleFilters () {
            document.querySelectorAll('.container_widgets .all_categories .sale-block').forEach(function(item) {
                if (item.classList.contains('hide')) {
                    item.classList.remove('hide');
                }
            });
            document.querySelectorAll('.filter__checkbox.sale').forEach(function(item) {
                if(item.classList.contains('is-active')) {
                    item.checked = false;
                    item.classList.remove('is-active');
                }
            });
        }

        var show_more_btns = Array.prototype.slice.call(document.querySelectorAll('.widget-show__more'));
        show_more_btns.forEach(function(item, i) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.target.closest('.all_categories').setAttribute("data-reduced", "false");
            });
        });

        var toTop = $('#promo #to-top');
        var filterBlock = $('.valentine-card__filter-wrap');
        $(window).scroll (function () {
            if ($(this).scrollTop () > 850) {
                toTop.addClass('is-visible');
            } else {
                toTop.removeClass('is-visible');
            }
        });
        toTop.on('click', function(e){
            e.preventDefault();
            $('body, html').animate({
                scrollTop: (filterBlock.offset().top - 100)
            }, 800);
            return false;
        });

    });
})(jQuery, window, document);