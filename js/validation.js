jQuery(function ($) {
    $(document).ready(function () {

        $('.show-hidden').on('change', 'input', function(e){
            let inputs = $(this).parents('.show-hidden').find('input');
            for (let i = 0; i < inputs.length; i++) {
                if($(inputs[i]).attr('data-hidden')){
                    if($(inputs[i]).is(':checked')){
                        $($(inputs[i]).attr('data-hidden')).fadeIn(300);   
                    }
                    else {
                        if($(this).attr('data-hidden') !== $(inputs[i]).attr('data-hidden')){
                            $($(inputs[i]).attr('data-hidden')).fadeOut(300);   
                        }
                    }
                }
            }
        });

        $('.show-promocode').click(function(e){
            $(this).parents('.form-group').fadeOut(0);
            $('.promocode-group').fadeIn(300);
        });
         //validation
        var formValid = document.getElementsByClassName('form-valid')[0];
        $('.valid-form-send').click(function () {
            $(this).parents('form').submit(function (e) {
                e.preventDefault();
                var el = document.querySelectorAll('.form-valid [data-reqired]');
                var erroreArrayElemnts = [];
                for (var i = 0; i < el.length; i++) {
                    if (el[i].value === '' || el[i].value === ' ' || el[i].value === '-') {
                        if($(el[i]).parents('.form-group').is(":visible")){
                            erroreArrayElemnts.push(el[i]);
                            $(el[i]).parents('.form-group').find('.error-text').html('Поле обязательное для заполнения');
                            $(el[i]).parents('.form-group').addClass('has-error');
                            $(el[i]).focus(function(e){
                                $(this).parents('.form-group').removeClass('has-error');
                            });
                        }
                    }
                }

                var el = document.querySelectorAll('.form-valid input[type="radio"][data-reqired=reqired]');
                for (var i = 0; i < el.length; i++) {
                    if (el[i].tagName === 'INPUT') {
                        var name = el[i].getAttribute('name');
                        if (document.querySelectorAll('[name=' + name + ']:checked').length === 0) {
                            erroreArrayElemnts.push(el[i]);
                            $(el[i]).parents('.form-group').addClass('has-error');
                            var inputname = $(el[i]).attr('name');
                            $('input[name='+ inputname + ']').change(function (e) {
                                $(this).parents('.form-group').removeClass('has-error');
                            });
                        }
                    }
                }

                var el = document.querySelectorAll('.form-valid select[data-reqired=reqired]');
                for (var i = 0; i < el.length; i++) {
                    if (el[i].tagName === 'SELECT') {
                      if (!$(el[i]).val()) {
                            erroreArrayElemnts.push(el[i]);
                            $(el[i]).parents('.form-group').addClass('has-error');
                            $(el[i]).change(function (e) {
                                $(this).parents('.form-group').removeClass('has-error');
                            });
                        }
                    }
                }

                var phones = $('.form-valid .phone');
                for (var i = 0; i < phones.length; i++) {
                    if ($(phones[i]).val()) {
                        if(!validatePhone($(phones[i]).val())){
                            erroreArrayElemnts.push(phones[i]);
                            $(phones[i]).parents('.form-group').find('.error-text').html('Ввведите номер телефона в верном формате');
                            $(phones[i]).parents('.form-group').addClass('has-error');
                            $(phones[i]).focus(function(e){
                                $(this).parents('.form-group').removeClass('has-error');
                            });
                        } 
                    }
                }
                if (erroreArrayElemnts.length == 0) {
                    formValid.submit();
                }
                if (erroreArrayElemnts.length > 0) {
                    console.log('Valid error');
                    console.log(erroreArrayElemnts);
                    var scroolTO = parseInt($(erroreArrayElemnts[0]).parents('.form-group').offset().top);
                    $("html, body").animate({ scrollTop: scroolTO }, 600);
                }
            });
        });

        $('form').on('change', 'input[type=email]', function(e){
            if($(this).val()){
                if(!isEmail($(this).val())){
                    $(this).parents('.form-group').find('.error-text').html('Ввведите email в верном формате');
                    $(this).parents('.form-group').addClass('has-error');
                    $(this).focus(function(e){
                        $(this).parents('.form-group').removeClass('has-error');
                    });
                }
            }
        });
        $('form').on('change', '.phone', function(e){
            if($(this).val()){
                if(!validatePhone($(this).val())){
                    $(this).parents('.form-group').find('.error-text').html('Ввведите номер телефона в верном формате');
                    $(this).parents('.form-group').addClass('has-error');
                    $(this).focus(function(e){
                        $(this).parents('.form-group').removeClass('has-error');
                    });
                } 
            }
        });
        function isEmail(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }
        function validatePhone(txtPhone) {
            var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
            if (filter.test(txtPhone)) {
                return true;
            }
            else {
                return false;
            }
        }
    });
});

