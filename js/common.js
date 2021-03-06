'use strict';
if (!window.console) window.console = {};
if (!window.console.memory) window.console.memory = function () {
};
if (!window.console.debug) window.console.debug = function () {
};
if (!window.console.error) window.console.error = function () {
};
if (!window.console.info) window.console.info = function () {
};
if (!window.console.log) window.console.log = function () {
};

// sticky footer
//-----------------------------------------------------------------------------
if (!Modernizr.flexbox) {
    (function () {
        var
            $pageWrapper = $('#page-wrapper'),
            $pageBody = $('#page-body'),
            noFlexboxStickyFooter = function () {
                $pageBody.height('auto');
                if ($pageBody.height() + $('#header').outerHeight() + $('#footer').outerHeight() < $(window).height()) {
                    $pageBody.height($(window).height() - $('#header').outerHeight() - $('#footer').outerHeight());
                } else {
                    $pageWrapper.height('auto');
                }
            };
        $(window).on('load resize', noFlexboxStickyFooter);
    })();
}
if (ieDetector.ieVersion == 10 || ieDetector.ieVersion == 11) {
    (function () {
        var
            $pageWrapper = $('#page-wrapper'),
            $pageBody = $('#page-body'),
            ieFlexboxFix = function () {
                if ($pageBody.addClass('flex-none').height() + $('#header').outerHeight() + $('#footer').outerHeight() < $(window).height()) {
                    $pageWrapper.height($(window).height());
                    $pageBody.removeClass('flex-none');
                } else {
                    $pageWrapper.height('auto');
                }
            };
        ieFlexboxFix();
        $(window).on('load resize', ieFlexboxFix);
    })();
}

$(function () {

// placeholder
//-----------------------------------------------------------------------------
    $('input[placeholder], textarea[placeholder]').placeholder();

    var shownOverlay = false;
    $('.js-show-menu').on('click', function (e) {
        e.preventDefault();

        if ($(window).outerWidth() < 767){
            $('.menu').addClass('mobile-menu-active')
        } else {
            $('.menu').addClass('active')

            if (shownOverlay) {
                setTimeout(function(){
                    $('.overlay').fadeIn(600)
                })
            } else {
                shownOverlay = true;
                setTimeout(function () {
                    html2canvas($('.header-container'), {
                        onrendered: function (canvas) {
                            var data = canvas.toDataURL();
                            $('.overlay image').attr('xlink:href', data)
                            $('.overlay').fadeIn(600)
                        }
                    });
                }, 1200)
            }
        }

    })

    $('.js-close-menu').on('click',function(e){
        e.preventDefault();
        closeMenu()
    })
    function closeMenu(){
        if ($('.menu').hasClass('mobile-menu-active')){
            $('.menu').removeClass('mobile-menu-active')
        } else {
            $('.menu').addClass('close')
            $('.overlay').fadeOut(600)
            setTimeout(function(){
                $('.menu').removeClass('active close')
            },2000)
        }

    }


});

