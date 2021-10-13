customSelectActive();
function customSelectActive(){
    $('.customselect').each(function(){
        if(!$(this).hasClass('select-hidden')){
            if($(this).attr('multiple')){
                $(this).parent().addClass('customselect-wrapper');
                var $this = $(this),
                numberOfOptions = $(this).children('option').length;
                $this.addClass('select-hidden'); 
                $this.wrap('<div class="select"></div>');
                $this.after('<div class="select-styled"></div>');
                var $styledSelect = $this.next('div.select-styled');
                if($this.find('option:selected').length == 0){
                    $styledSelect.html('<div class="default">Выберите ответ</div>');
                }
                var $list = $('<ul />', {
                    'class': 'select-options'
                }).insertAfter($styledSelect);
                for (var i = 0; i < numberOfOptions; i++) {
                    var lioption;
                    var id = Math.floor(Math.random() * 100000);
                    $this.children('option').eq(i).attr('data-id', id);
                    if(!$($this.children('option').eq(i)[0]).attr('disabled')){
                        if($this.children('option').eq(i)[0].selected){
                            $styledSelect.append('<div class="selectvalue" data-value="' + $this.children('option').eq(i).text() + '" data-id="'+ id + '">' + $this.children('option').eq(i).text() + '</div>');
                            lioption = '<li rel="'+ $this.children('option').eq(i).val() + '" data-id="'+ id + '"><div class="checked active"></div><div class="text">'+ $this.children('option').eq(i).text() + '</div></li>';
                        }
                        else {
                            lioption = '<li rel="'+ $this.children('option').eq(i).val() + '" data-id="'+ id + '" ><div class="checked"></div><div class="text">'+ $this.children('option').eq(i).text() + '</div></li>';
                        }
                    }
                    $(lioption).appendTo($list);
                }
            
                var $listItems = $list.children('li');
            
                $styledSelect.click(function(e) {
                    e.stopPropagation();
                    $('div.select-styled.active').not(this).each(function(){
                        $(this).removeClass('active').next('ul.select-options').hide();
                    });
                    $(this).toggleClass('active').next('ul.select-options').toggle();
                });
            
                $listItems.click(function(e) {
                    e.stopPropagation();
                    if($(e.currentTarget).find('.checked').hasClass('active')) {
                        $(e.currentTarget).find('.checked').removeClass('active');
                        var id = $(e.currentTarget).attr('data-id');
                        $styledSelect.find('.selectvalue[data-id="' + id + '"]').remove();
                        if($styledSelect.find('.selectvalue').length == 0){
                            $styledSelect.html('<div class="default">Выберите ответ</div>');
                        }
                        $this.find('option[value="' + $(e.currentTarget).attr('rel') + '"][data-id="' + id + '"]').prop("selected", false)
                    }
                    else {
                        $(e.currentTarget).find('.checked').addClass('active');
                        var id = $(e.currentTarget).attr('data-id');
                        if($styledSelect.find('.default').length > 0){
                            $styledSelect.find('.default').remove();
                        }
                        $styledSelect.append('<div class="selectvalue" data-value="' + $(e.currentTarget).attr('rel') + '" data-id="'+ id + '">' + $(e.currentTarget).attr('rel') + '</div>');
                        $this.find('option[value="' + $(e.currentTarget).attr('rel') + '"][data-id="' + id + '"]').prop("selected", true)
                    }
                    $this.change();
                });

                $(document).mousedown(function(e) {
                    if($(e.target).parents('.customselect-wrapper').length == 0) {
                        $styledSelect.removeClass('active');
                        $list.hide();
                    }
                });

                $(document).click(function() {
                    $styledSelect.removeClass('active');
                    $list.hide();
                });
            }
            else {
                $(this).parent().addClass('customselect-wrapper');
                var $this = $(this),
                numberOfOptions = $(this).children('option').length;
                $this.addClass('select-hidden'); 
                $this.wrap('<div class="select"></div>');
                $this.after('<div class="select-styled"></div>');
                var $styledSelect = $this.next('div.select-styled');
                if($this.find('option:selected').length>0){
                    $styledSelect.text($this.find('option:selected').text());
                }
                else {
                    $styledSelect.text('Выберите ответ');
                }
            
                var $list = $('<ul />', {
                    'class': 'select-options'
                }).insertAfter($styledSelect);
            
                for (var i = 0; i < numberOfOptions; i++) {
                    if(!$this.children('option').eq(i).attr('disabled')){
                        var id = Math.floor(Math.random() * 100000);
                        $this.children('option').eq(i).attr('data-id', id);
                        lioption = '<li rel="'+ $this.children('option').eq(i).val() + '" data-id="'+ id + '">'+ $this.children('option').eq(i).text() + '</li>';
                        $(lioption).appendTo($list);
                    }
                }
            
                var $listItems = $list.children('li');
            
                $styledSelect.click(function(e) {
                    e.stopPropagation();
                    $('div.select-styled.active').not(this).each(function(){
                        $(this).removeClass('active').next('ul.select-options').hide();
                    });
                    $(this).toggleClass('active').next('ul.select-options').toggle();
                });
            
                $listItems.click(function(e) {
                    e.stopPropagation();
                    $styledSelect.text($(this).text()).removeClass('active');
                    $this.val($(this).attr('rel'));
                    $(this).parents('ul').find('li').removeClass('active');
                    $(this).addClass('active')
                    $list.hide();
                    $this.change();
                });
                $(document).mousedown(function(e) {
                    if($(e.target).parents('.customselect-wrapper').length == 0) {
                        $styledSelect.removeClass('active');
                        $list.hide();
                    }
                });
                $(document).click(function() {
                    $styledSelect.removeClass('active');
                    $list.hide();
                });
            }
        }
    });   
}