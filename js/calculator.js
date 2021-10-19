jQuery(function ($) {
    $(document).ready(function () {
        $('.show-calculator').click(function(e){
            $('.calculator').fadeIn(300);
            $('html, body').animate({
                scrollTop: $('.calculator').offset().top
            }, 1000);
        });
    });
});