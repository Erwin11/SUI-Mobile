/*===========================
Framework7 Swiper Additions
===========================*/
/* global Zepto:true */
+function($){
    'use strict';
    $.swiper = function (container, params) {
        return new $.Swiper(container, params);
    };
    $.fn.swiper = function (params) {
        return new $.Swiper(this, params);
    };
    $.initSwiper = function (pageContainer) {
        var page = $(pageContainer);
        var swipers = page.find('.swiper-container');
        if (swipers.length === 0) return;
        function destroySwiperOnRemove(slider) {
            function destroySwiper() {
                slider.destroy();
                page.off('pageBeforeRemove', destroySwiper);
            }
            page.on('pageBeforeRemove', destroySwiper);
        }
        for (var i = 0; i < swipers.length; i++) {
            var swiper = swipers.eq(i);
            var params;
            if (swiper.data('swiper')) {
                params = JSON.parse(swiper.data('swiper'));
            }
            else {
                params = swiper.dataset();
            }
            var _slider = $.swiper(swiper[0], params);
            destroySwiperOnRemove(_slider);
        }
    };
    $.reinitSwiper = function (pageContainer) {
        var page = $(pageContainer);
        var sliders = page.find('.swiper-container');
        if (sliders.length === 0) return;
        for (var i = 0; i < sliders.length; i++) {
            var sliderInstance = sliders[0].swiper;
            if (sliderInstance) {
                sliderInstance.update(true);
            }
        }
    };
    
}(Zepto);
