;(function($, window, document, undefined) {
  $(document).ready(function() {

    var hash = window.location.hash;     
    if (hash) {
      setTimeout(function(){ 
        $('html, body').animate({
          scrollTop: $(hash).offset().top - $('.header').outerHeight()
        }, 300);
      }, 1000);
    }

    let active = ['all_sales', 'all_categories'];
    let patterns = {
      category: /cat+/,
      sale: /sale+/
    }

    let show_filters = document.querySelector('.manage_filters');
    let filters = document.querySelector('.filter');
    let filtersWrapper = document.querySelector('.filter_wrapper');
    let goods = document.querySelector('.goods .container_widgets').children // all the widgets
    let checkboxes = document.querySelectorAll('.filter__checkbox');
    //let resetAll = document.querySelector('.reset__button');

    show_filters.addEventListener('click', () => {
      filtersWrapper.classList.toggle('hide');
      show_filters.classList.toggle('reverse');
      filters.classList.toggle('unactive')
    })

    $(document.body).on('click', function(event) {
      if($(event.target).closest('.filter').length == 0){  
        filtersWrapper.classList.add('hide');
        show_filters.classList.add('reverse');
        filters.classList.add('unactive')
      }   
    }); 

    // resetAll.addEventListener('click', () => {
    //   checkboxes.forEach((item, i) => {
    //     item.checked = false;
    //   });
    //   active = ['all_sales', 'all_categories'];
    //   printWidgets();
    // })

    checkboxes.forEach((item, i) => {
      item.addEventListener('change', () => {
        refresh();
        scrollTop();
        if (active.length == 0) {
          active = ['all_sales', 'all_categories'];
        }
        printWidgets();
      })
    });

    function refresh() {
      active.length = 0;
      checkboxes.forEach((elem, i) => {
        if (elem.checked === true) {
          active.push(elem.getAttribute('id'))
        }
      });

      // functions to check if the array already contains category or/and sale

      function isCat(item) {
        return patterns.category.test(item);
      }

      function isSale(item) {
        return patterns.sale.test(item);
      }

      // check if indeed contain any of them

      if (!active.some(isSale) && !active.some(isCat)) {
        active.push('all_sales');
        active.push('all_categories');
      }

      if (!active.some(isCat)) {
        active.push('all_categories');
      }

      if (!active.some(isSale)) {
        active.push('all_sales');
      }
    }

    function printWidgets(attr) {
      for (let i = 0; i < goods.length; i++) { // clears all the previous filters
        goods[i].classList.remove('hide');
      }

      active = active.sort().reverse()

      let categories = [];
      categories.length = 0;
      let sales = [];
      sales.length = 0;

      for (let i = 0; i < active.length; i++) {
        if (patterns.category.test(active[i])) {
          categories.push(active[i])
        } else {
          sales.push(active[i])
        }
      }

      if (active[0] == 'all_sales'){
        active.shift()

      }

      categories.length == 0 ? categories.push('all_categories') : categories
      sales.length == 0 ? sales.push('all_sales') : sales
      active.length = 0

      if (sales[0] == 'all_sales'){
        sales.shift()
        sales.unshift('sale_1','sale_2','sale_3','sale_4','sale_5','sale_6','sale_7')
      }

      for (let i = 0; i < sales.length; i++) {
        for (let j = 0; j < categories.length; j++) {
          let curr = sales[i] + ' ' + categories[j];
          active.push(curr);
        }
      }

      for (let i = 0; i < goods.length; i++) {
        goods[i].classList.remove('show');
        goods[i].classList.add('hide');
      }

      for (let i = 0; i < goods.length; i++) {

        // delete hode class
        let cur_class = goods[i].getAttribute('class').split(' ');
        cur_class.length = cur_class.length - 1
        cur_class = cur_class.join(' ')

        for (let j = 0; j < active.length; j++) {
          if (active[j] == cur_class) {
            goods[i].classList.remove('hide');
          }
        }
      }
    }

    // making the filter fixed
    sale_filter = document.querySelector('.sales')
    category_filter = document.querySelector('.category')
    filter_wrapper = document.querySelector('.filter_wrapper')
    let filters_height = filters.offsetHeight;

    window.addEventListener('scroll', (e) => {

      if (window.scrollY >= 700 && window.scrollY <= filters.offsetHeight + 130) { // виджеты
        filter_wrapper.classList.add('fixed');
        filters.classList.remove('flex-end');
        filters_height = filters.offsetHeight;
        filters.classList.remove('flex-end');
      } else if (window.scrollY <= 700 && window.scrollY <= filters.offsetHeight + 130){ // не долистал до виджетов
        filter_wrapper.classList.remove('fixed');
        filters.classList.remove('flex-end');
        filters_height = filters.offsetHeight;
      } else { // пролистал виджеты
        filters.classList.add('flex-end');
        filter_wrapper.classList.remove('fixed');
        filters_height = filters.offsetHeight;
      }

    })
    function scrollTop (){
      if (window.screen.width > 600){
        window.scrollTo({
          top: 500,
          behavior: "smooth"
        });
        // } else if (window.screen.width <= 991 && window.screen.width > 600) {
        //   window.scrollTo({
        //       top: 500,
        //       behavior: "smooth"
        //   });
      }
    }


    if($(window).width() <= 769 && !(filtersWrapper.classList.contains('hide'))) {
      filtersWrapper.classList.add('hide')
      show_filters.classList.add('reverse')
      filters.classList.add('unactive')
    }

    let show_more_btns = Array.prototype.slice.call(document.querySelectorAll('.widget-show__more'));
    show_more_btns.forEach((item, i) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        e.target.closest('.all_categories').setAttribute("data-reduced", "false");
      })
    });




  });
})(jQuery, window, document);
