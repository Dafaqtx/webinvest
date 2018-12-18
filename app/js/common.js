$(function() {

    const width = $(window).width(); // ширина экрана

    // липки фильтры и блок с информацие о вакансии
    function stickyPanel() {
        let blockTopHeight     = $('.page__jobs').offset().top;
        let scrollHeight       = $(window).scrollTop();
        let filters            = $('.desktop-sticky');
        let jobsInfo           = $('.jobs-info');
        if (width > 1024) {
            if (scrollHeight >= blockTopHeight) {
                filters.addClass('desktop-sticky--active');
            } else {
                filters.removeClass('desktop-sticky--active');
            }

            if (scrollHeight >= blockTopHeight) {
                jobsInfo.addClass('jobs-info--active').css({
                    top: scrollHeight - 26 + 'px',
                });
            } else {
                jobsInfo.removeClass('jobs-info--active');
            }
           
        } else if (width > 768 && width < 1024) {
            if (scrollHeight >= blockTopHeight) {
                jobsInfo.addClass('jobs-info--active').css({
                    top: scrollHeight - 160 + 'px',
                });
            } else {
                jobsInfo.removeClass('jobs-info--active');
            }
        }
        
    }

    $(window).on('scroll resize', function() {
        stickyPanel();
    })


    // добавленые в избранное
    function addToFavorite(item) {
        $(item).toggleClass('selected');
    }

    // табы
    function jobsTabs(item) {
        $(item)
          .addClass("jobs-info-tabs__list-item--active")
          .siblings()
          .removeClass("jobs-info-tabs__list-item--active")
          .closest("div.jobs-info-tabs")
          .find("div.jobs-info-tabs__content-item")
          .removeClass("jobs-info-tabs__content-item--active")
          .eq($(item).index())
          .addClass("jobs-info-tabs__content-item--active");
    }

    // показ подробной информации
    function showInfo(container, target) {
        if ( !target.hasClass('jobs-item__favorite') && width < 768) {
            $('body').addClass('overflow-hidden');
            $(container).addClass('jobs--show');
            $('.jobs-info__actions').addClass('jobs-info__actions--active');
        }
        
        if ( !target.hasClass('jobs-item__favorite') && width >= 768 ) {
            $('.jobs-info__actions').addClass('jobs-info__actions--active');
        }
    }

    // выбор элемента
    function selectItem(item) {
        let searchItem = $('.jobs-item');
        let index = searchItem.index(item);
        
        $('.jobs-info__item').removeClass('jobs-info__item--active');
        $('.jobs-info__item:eq(' + index + ')').addClass('jobs-info__item--active');
        
        $('.jobs-item').removeClass('jobs-item--selected');
        $(item).addClass('jobs-item--selected');
    }
    
    // скрытие подробной информации
    function hideInfo(container) {
        $('body').removeClass('overflow-hidden');
        $(container).removeClass('jobs--show');
        $('.jobs-info__actions').removeClass('jobs-info__actions--active');
    }

    // убрать конкретный фильтр
    function removeFilter(item) {
        let allFilteItems = $('.current-filters__item');
        let filterItem = $(item).closest('.current-filters__item');
        
        if (allFilteItems.length == 1) {
            removeAllFilters();
        }
        
        filterItem.remove();
    }


    // убрать все фильтры
    function removeAllFilters(items) {
        $('.current-filters').remove();
    }
	
    $('.jobs-item__favorite').on('click', function() {
        addToFavorite(this);
    });

    $('.jobs-info__actions-favorite').on('click', function() {
        addToFavorite(this);
    });

    $('.jobs-info-tabs__list').on('click', 'li:not(.jobs-info-tabs__list-item--active)', function() {
        jobsTabs(this);
    });

    $('.jobs__item').on('click', function(e) {
        let target = $(e.target);
        let container = $(this).closest('.jobs');

        showInfo(container, target);
        selectItem(this);
    });

    $('.jobs-info__close').on('click', function(e) {
        let container = $(this).closest('.jobs');

        hideInfo(container);   
    });

    $('.current-filters__item-del').on('click', function() {
        removeFilter(this);
    });

    $('.current-filters__clear').on('click', function() {
        removeAllFilters();
    });
      
})

