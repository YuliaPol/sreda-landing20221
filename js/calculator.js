jQuery(function ($) {
    $(document).ready(function () {
        $('.show-calculator').click(function(e){
            $('.calculator').fadeIn(300);
            $('html, body').animate({
                scrollTop: $('.calculator').offset().top
            }, 1000);
        });
        setPrice();
        $('.calc-block').on('change', 'select', function(e){
            setPrice();
        });
        function setPrice(){
            let currency =  $('.calc-block').find('.select-currency').val();
            let months =  parseInt($('.calc-block').find('.select-monts').val());
            let people =  parseInt($('.calc-block').find('.select-students').val());
            let monthRate = getMonthRate(currency, months, people);
            let total = monthRate*months;
            if(monthRate > 0 && total > 0){
                $('.calc-block').find('.price-for-month').html(Math.round(monthRate));
                $('.calc-block').find('.total-price').html(Math.round(total));
            }
        }
        function getMonthRate(currency, months, people){
            let rateRUB = 119.671272;
            let percentPeople = 7.5;
            let percentMonth = 2.5;
            let rateRUB8 = 58.63892328;
            let rateRUB9 = 52.65535968;
            let rateRUB10 = 47.86850880;
            let rateMonth = rateRUB;
            let curUAN = 0.370474879;
            let curKZT = 5.983611505;
            let curBYN = 0.034534604;
            if(people < 800 && people > 100) {
                rateMonth = (rateRUB-(rateRUB*percentPeople*(people/100 - 1))/100)*people;
            } else if(people === 800){
                rateMonth = rateRUB8*people;
            } else if(people === 900){
                rateMonth = rateRUB9*people;
            } else if(people === 1000){
                rateMonth = rateRUB10*people;
            } else if(people === 100){
                rateMonth = rateRUB*people;
            }
            if(months > 1){
                rateMonth = rateMonth- (rateMonth*percentMonth*(months - 1))/100
            }
            if(currency === 'UAN'){
                rateMonth = rateMonth*curUAN;
            } else if(currency === 'KZT'){
                rateMonth = rateMonth*curKZT;
            } else if(currency === 'BYN') {
                rateMonth = rateMonth*curBYN;
            }
            return rateMonth;
        }
    });
});