var topPos=$(document).scrollTop(),docH=$(window).height(),snb=$(".navbar__block"),footer=$(".footer__block"),footerPos=footer.offset().top;snb.hasClass("is--scroll")&&(150<topPos?snb.addClass("is--hidden"):snb.removeClass("is--hidden"),300<topPos?snb.addClass("is--scrolled"):snb.removeClass("is--scrolled"),footerPos<topPos+docH?snb.addClass("is--opacity"):snb.removeClass("is--opacity"));