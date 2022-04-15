"use strict";

;

(function ($, window, document, undefined) {
	$(function (e) {
		$(".button_in-stock").each(function () {
			$(this).text('Купить');
		});
		// popup
		$("[data-availabe='temporary_unavailable']").on('click', function (e) {
			e.preventDefault();
			$('.senseiq-modal').addClass('senseiq-modal--open');
		});

		$(".senseiq-modal__container").click(function (e) {
			e.stopPropagation();
		});

		$(".senseiq-modal").click(function () {
			$('.senseiq-modal').removeClass('senseiq-modal--open');
		});

		$(".senseiq-modal__close").click(function () {
			$('.senseiq-modal').removeClass('senseiq-modal--open');
		});

		$(document).keydown(function (event) {
			if (event.keyCode == 27) {
				$('.senseiq-modal').removeClass('senseiq-modal--open');
			}
		});

		// табы
		var tabLinks = $('.tab-link');
		var tabs = $('.content-tab');

		var baseURL = '//' + window.location.hostname + window.location.pathname;
		var currentTab = window.location.hash.slice(1);
		var idArr = currentTab.split('-');


		tabs.each(function () {
			if (currentTab == $(this).attr('id')) {
				tabs.attr('hidden', true);
				$('[aria-labelledby="' + idArr[0] + '"]').attr('hidden', false);
			}
		})

		tabLinks.each(function () {
			var hrefValue = $(this).attr("href").slice(1);

			if (currentTab == hrefValue) {
				tabLinks.removeAttr('aria-selected');
				$(this).attr('aria-selected', 'true');
			}
		})

		$('.tab-link').on('click', function (e) {
			e.preventDefault();

			if (!($(this).attr('aria-selected') === 'true')) {
				var selectedTabId = $(this).attr('id');
				tabLinks.removeAttr('aria-selected');
				tabs.attr('hidden', true); //tabs.addClass('visually-hidden');

				$(this).attr('aria-selected', 'true');
				$('[aria-labelledby="' + selectedTabId + '"]').attr('hidden', false);

				window.location.href = baseURL + '#' + selectedTabId + '-tab';

				$('.swiper-container-initialized').each(function () {
					$(this)[0].swiper.update();
				});
			}
		}); // Режимы

		var modeTitles = $('.modes__title');
		var modeDescs = $('.modes__desc');

		function setHoverMode() {
			if (!!navigator.userAgent.match(/Trident.*rv\:11\./)) {
				var modesSection = $('#modes-slider');
				modesSection.find('.swiper-slide').each(function () {
					var title = $(this).find('.modes__title');
					var desc = $(this).find('.modes__desc');
					modesSection.append(title);
					modesSection.append(desc);
				});
				modesSection.find('.swiper-wrapper').remove();
			}

			modeTitles.removeClass('active');
			modeDescs.removeClass('visually-hidden');
			$(".modes__desc:not(:first)").addClass('visually-hidden');
			$(".modes__title:first").addClass('active');
			modeTitles.on('mouseover', function () {
				if (!$(this).hasClass('active')) {
					modeTitles.removeClass('active');
					$(this).addClass('active');
					modeDescs.addClass('visually-hidden');
					$(this).next().removeClass('visually-hidden');
				}
			});
		}

		function setSliderMode() {
			modeTitles.removeClass('active');
			modeDescs.removeClass('visually-hidden');
			modeTitles.off();
		}

		function setModeSection() {
			if ($(window).width() > 767) {
				setHoverMode();
			} else {
				setSliderMode();
			}
		}

		setModeSection();
		$(window).on('resize', function () {
			setModeSection();
		}); // Ссылки на табы

		$('.test-drive__link').click(function () {
			let anchor = $(this).attr('href');
			$('html, body').animate({
				scrollTop: $(anchor).offset().top - 60
			}, 300);
		}); // Якорь до правил акции

		$('.intro__buble a').click(function () {
			let anchor = $(this).attr('href');
			$('html, body').animate({
				scrollTop: $(anchor).offset().top - 60
			}, 300);
		}); // Якорь до блока тест драйв

		$('.anchor-buble a').click(function () {
			let anchor = $(this).attr('href');
			$('html, body').animate({
				scrollTop: $(anchor).offset().top - 60
			}, 300);
		}); // Якорь до подарка

		if (location.hash == '#test-drive') {
			$('html, body').animate({
				scrollTop: $('.test-drive').offset().top - 60
			}, 300);
		}  // Якорь до блока тест драйв при открытие страницы

		var tabSwitchButtons = $('.tab-switch');
		tabSwitchButtons.on('click', function (e) {
			e.preventDefault();
			var tabId = '#' + $(this).data('tab');
			$(tabId).trigger('click');
			$('html, body').stop().animate({
				scrollTop: $(tabId).offset().top - 100
			}, 100);
		});
		document.dispatchEvent(new Event('swiper:load'));
		document.addEventListener('swiper:loaded', function () {

			var hairdryerSwiper = new Swiper('#hairdryer-features', {
				loop: true,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				}
			});
			var rectifierSwiper = new Swiper('#rectifier-features', {
				loop: true,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				}
			});
			var features2Swiper = new Swiper('#features2', {
				loop: true,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				}
			});
		});
		var breakpoint = window.matchMedia('(min-width:768px)');
		var modesSwiper;

		var breakpointChecker = function breakpointChecker() {
			if (breakpoint.matches === true) {
				if (modesSwiper !== undefined) modesSwiper.destroy(true, true);
				return;
			} else if (breakpoint.matches === false) {
				return enableSwiper();
			}
		};

		var enableSwiper = function enableSwiper() {
			document.dispatchEvent(new Event('swiper:load'));
			document.addEventListener('swiper:loaded', function () {
				modesSwiper = new Swiper('#modes-slider', {
					loop: true,
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'
					}
				});
			})
		};

		breakpoint.addListener(breakpointChecker); // kickstart

		breakpointChecker();

		let buttonHair = document.querySelector('#gift-hair .gift__mobile-btn');
		let giftTexts = document.querySelectorAll('#gift-hair .gift__text');
		let giftWrapper = document.querySelector('#gift-hair .gift__inner-wrapper');

		let buttonRectifier = document.querySelector('#gift-rectifier .gift__mobile-btn');
		let giftTextsRectifier = document.querySelectorAll('#gift-rectifier .gift__text');
		let giftWrapperRectifier = document.querySelector('#gift-rectifier .gift__inner-wrapper');

		buttonHair.addEventListener('click', function() {
			buttonHair.style.display = 'none';
			giftTexts.forEach(item => {
				item.style.display = 'block';
			});
			giftWrapper.style.alignSelf = 'center';
		});

		buttonRectifier.addEventListener('click', function() {
			buttonRectifier.style.display = 'none';
			giftTextsRectifier.forEach(item => {
				item.style.display = 'block';
			});
			giftWrapperRectifier.style.alignSelf = 'center';
		});
	});



})(jQuery, window, document);
/* manage videos */


function findVideos() {
	var videos = document.querySelectorAll('.video');

	for (var i = 0; i < videos.length; i++) {
		setupVideo(videos[i]);
	}
}

function setupVideo(video) {
	var link = video.querySelector('.video__link');
	var media = video.querySelector('.video__media');
	var button = video.querySelector('.video__button');
	var id = parseMediaURL(link);
	var title = video.dataset.title;
	video.addEventListener('click', function () {
		var iframe = createIframe(id);
		link.remove();
		button.remove();
		video.appendChild(iframe);

		if (title) {
			iframe.setAttribute('id', title);
			var evt = new CustomEvent('video:loaded', {
				'detail': title
			});
			document.dispatchEvent(evt);
			console.log('video loaded');
		}
	});
	link.removeAttribute('href');
	video.classList.add('video--enabled');
}

function parseMediaURL(link) {
	var url = link.href;
	return url.substr(url.lastIndexOf('/') + 1);
}

function createIframe(id) {
	var iframe = document.createElement('iframe');
	iframe.setAttribute('allowfullscreen', '');
	iframe.setAttribute('allow', 'autoplay');
	iframe.setAttribute('src', generateURL(id));
	iframe.classList.add('video__media');
	return iframe;
}

function generateURL(id) {
	var query = '?rel=0&showinfo=0&autoplay=1';
	return 'https://www.youtube.com/embed/' + id + query;
}

(function () {
	if (!('remove' in Element.prototype)) {
		Element.prototype.remove = function () {
			if (this.parentNode) {
				this.parentNode.removeChild(this);
			}
		};
	}

	if (typeof window.CustomEvent === "function") return false;

	function CustomEvent(event, params) {
		params = params || {
			bubbles: false,
			cancelable: false,
			detail: undefined
		};
		var evt = document.createEvent('CustomEvent');
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
		return evt;
	}

	CustomEvent.prototype = window.Event.prototype;
	window.CustomEvent = CustomEvent;
})();

document.addEventListener('DOMContentLoaded', function () {
	// видео
	findVideos();
});

