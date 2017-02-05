/**
 * Created by adrz1 on 1/25/17.
 */
(function(){
    var $keyword1 = $('#keyword1');
    var $inputGroupSearch = $('#inputGroupSearch');

    //a function to detect user input text on search box, and then display suggestions using a dropdown menu
    var showDropdown = function (e) {

        if (e.keyCode === 27){
            $('#suggestionDropdown').css('display', 'none');
        } else {
            var target = e.target;
            var typed = $(target).val();

            if (typed.length >= 2){
                //TODO: populate suggestions
                $('#suggestionDropdown').css('display', 'block');
            } else {
                $('#suggestionDropdown').css('display', 'none');
            }
        }
    }

    //a function to remove keywords from search box
    var removeKeyword = function () {
        $(this).parent().remove();
    }

    var handleWizard = function () {
        var nextStep = step;
        if ($(this).hasClass('next')){
            nextStep++;
        } else {
            nextStep--;
        }

        //find div containing the wizard step and update visibility
        var $nextStepDiv = $wizardBody.find('#modalAddStep' + nextStep);
        $nextStepDiv.removeClass('hidden');
        $nextStepDiv.siblings().addClass('hidden');

        //update buttons visibility
        if (nextStep == 1){
            $prev.addClass('hidden');
        } else if (nextStep == 4){
            $next.addClass('hidden');
        } else {
            $prev.removeClass('hidden');
            $next.removeClass('hidden');
        }

        step = nextStep;
    }

    //registers dropdown function to inputSearch
    $('#inputSearch').on('keyup', showDropdown);

    //a function to take keyword selected by the user, as a part of the search keywords
    $('#suggestionDropdown li a').on('click', function () {
       var suggestion = $(this).text();

        //$keyword1.html(suggestion + ' <span class="glyphicon glyphicon-remove"></span>');
        $inputGroupSearch.html('<span class="input-group-addon">' + suggestion + ' <span class="glyphicon glyphicon-remove"></span></span>' + $inputGroupSearch.html());

        //re register function callbacks on new elements
        $('#inputSearch').on('keyup', showDropdown);
        $('#inputGroupSearch > span.input-group-addon > span').on('click', removeKeyword);

        $('#suggestionDropdown').css('display', 'none');
    });

    $('#inputGroupSearch > span.input-group-addon > span').on('click', removeKeyword);

    var step = 1;

    var $prev = $('#modalAdd > div > div > div.modal-footer > button.btn.prev');
    var $next = $('#modalAdd > div > div > div.modal-footer > button.btn.next');

    var $wizardBody = $('#modalAdd > div > div > div.modal-body');

    $next.on("click", handleWizard);
    $prev.on("click", handleWizard);

})();