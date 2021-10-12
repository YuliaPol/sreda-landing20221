jQuery(function ($) {
    $(document).ready(function () {
        $('.owl-carousel').owlCarousel({
            items: 1,
            margin: 35,
            loop: true,
            center: true,
            stagePadding: 350,
            nav: true,
            lazyLoad: true,
            autoHeight : false,
            responsive : {
                0: {
                    stagePadding: 30,
                    margin: 30,
                },
                451: {
                    stagePadding: 40,
                    margin: 35,
                },
                769: {
                    stagePadding: 100,
                    margin: 35,
                },
                1025: {
                    stagePadding: 200,
                    margin: 35,
                },
                1201: {
                    stagePadding: 350,
                    margin: 35,
                }
            },
        });
        // preloader
        window.onload = function () {
            $('.load-wrapper').fadeOut();
        }
    });
});