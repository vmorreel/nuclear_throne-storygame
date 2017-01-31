$( function() {
    var buttons = $(".section button");
    var status = $("#status");
    status.hide();
    startGame();

    $("#easter_egg").next().click(function() {
        if ($("#easter_egg").val() == "#hewillnotdivideus") {
            $('img:first-of-type').remove();
            $('img:first-of-type').remove();
            gotoSection("openChest");
        }else{
            $('#fightBandits p').remove();
            $('#fightBandits').append('<p>Try Again !</p>');
        }
    });

    function setCharacter(character){
       switch(character) {
            case 'eyes':
                setImage("Eyes_Sadist.gif", "eyes", 27, -217, false);
                //Beginning
                setButton("#beginning>button", "eyes_story_1", "Let's move!");

                //1st event
                setButton("#strangeEngraving button:first-of-type", "knowEverything", "Know everything");
                setButton("#strangeEngraving button:last-of-type", "showNothing", "Show nothing");
                
                //2nd event
                setButton("#fightBandits button:first-of-type", "useTelekinesis", "Telekineses pushes projectiles away");
                setButton("#fightBandits button:nth-of-type(2)", "eyesSeesEverything", "Eyes sees everything");

                $("#easter_egg").css("display", 'block');
                $("#easter_egg").next().css("display", 'block');


                break;

            case 'yv':

                setImage("Yung_Venuz_Menu.gif", "yv", 25, -180, false);

                //Beginning
                setButton("#beginning>button", "yv_story_1", "Let's move!");

                //1st event
                setButton("#strangeEngraving button:first-of-type", "verifyVenuz", "#verifyVenuz");
                setButton("#strangeEngraving button:last-of-type", "soCool", "So cool");
                
                //2nd event
                setButton("#fightBandits button:first-of-type", "brrrrraaaap", "Brrrrraaaap");
                setButton("#fightBandits button:nth-of-type(2)", "mony", "Mony");
                
                $("#easter_egg").css("display", 'none');
                $("#easter_egg").next().css("display", 'none');

                 break;
            default:
                break;
            }
    }
    
    buttons.click( function() {
        go = $(this).attr('go');

        if (go != undefined){
            var character = $(this).attr('character');
            switch(go) {
                case 'intro':
                    resetInterface();
                    shapeDesign();
                    status.hide();
                    startGame();
                    break;
                case 'intro_2':
                    setInterface();
                    gotoSection(go);
                    break;
                case 'beginning':
                    setCharacter(character);
                    shapeDesign();
                    gotoSection(go);
                    break;
                case 'inTheDesert':
                    status.show();
                    gotoSection(go);
                    break;
                    
                case 'chestOpened':
                    verifCode();
                    break;

                case 'fightBandits':
                    gotoSection(go);
                    setImage("Bandit_idle.gif", "bandit",19, 260, true);
                    setImage("Bandit_idle.gif", "bandit", 19, 280, true);
                    break;

                case 'scorpionHurts':
                    gotoSection(go);
                    setImage("goldenScorpion.gif", "goldenScorpion", 14, 260, true);
                    break;

                default:
                    gotoSection(go);
                    break;
            } 
        }

    });
    
    function verifCode(){
        $('#codeChest p').remove();
        var goodInput = 0;
        var inputs =  $('#codeChest input');
        
        $.each(inputs, function(index,element){
            
            if(index == 0 && $(element).val() == 2){
                $(element).attr('disabled','true');
                goodInput ++;
            }
            
            if(index == 1 && $(element).val() == 0){
                  $(element).attr('disabled','true');
                 goodInput ++;
            }
            
            if(index == 2 && $(element).val() == 1){
                  $(element).attr('disabled','true');
                 goodInput ++;
            }
            if(index == 3 && $(element).val() == 1){
                $(element).attr('disabled','true');
                 goodInput ++;
            }

        });
        
         if(goodInput == 4){
                $.each(inputs, function(index,element){
                    $(element).removeAttr('disabled');
                    $(element).val('6');
                });
                gotoSection(go);
            }else{
                $('#codeChest p').remove();
                $('#codeChest').append('<p>Try Again !</p>');
            }
      
        
       

    }

    function setImage(path, id, top, left, flipped) {
        $('#status').after('<img src="img/' + path + '" id="' + id + '">');
        var img = $('#status+img')

        if (flipped == false) {
            $(img).css({'position':'relative',
                        'top':' ' + top + 'px',
                        'left':' ' + left + 'px'
                    });
        } else {
            $(img).css({
                'position':'relative',
                'top':' ' + top + 'px',
                'left':' ' + left + 'px',
                '-moz-transform': 'scaleX(-1)',
                '-o-transform': 'scaleX(-1)',
                '-webkit-transform': 'scaleX(-1)',
                'transform': 'scaleX(-1)',
                'filter': 'FlipH',
                '-ms-filter': "FlipH"
            });
        }
    }

    function deleteImage(id) {
        $(id).remove();
    }

    function setInterface(){
        $(".section").css('margin-top', '100px');
        $("#logo").remove();
    }

    function resetInterface(){
        $('#status+img').remove();
        $('#status').after('<img src="img/NuclearThrone.png" id="logo">');
    }

    function shapeDesign() {
        $(".section").css('margin-top', '0px');
    }

    function setButton(id,go,message){
        $(id).attr('go', go);
        $(id).html(message);
    }
    
    function recursiveDeletion() {
        while ($("#bandit").length != 0) {
            deleteImage("#bandit");
        }
        while ($("#goldenScorpion").length != 0) 
        {
            deleteImage("#goldenScorpion");
        }
    }


    function gotoSection(key) {
        recursiveDeletion();

        $('.section').hide();
        var section = $('.section#'+key);
        section.show();
        
        var child = section.children('action');
        var actionLose = child.attr('lose');
        var actionWin = child.attr('win');
        
        if(actionWin != undefined)
        {
            winXLife(actionWin);
        }

        if(actionLose != undefined)
        {
            loseXLife(actionLose);
        }
    }
    
    /* LIFE */
    function getLife() {
        var life = status.find('span.value').html();
        return life;

    }

    function setLife(life) {
        status.find('span.value').html(life);
    }
    
    function loseXLife(v) {
        var life = getLife();
        life = life-v;
        if(life <= 0)
        {
            setLife(0);
            endGame();
        }
        else{
            setLife(life);
        }
    }

    function winXLife(v) {
        var life = getLife();
        life = parseInt(life);
        v = parseInt(v);
        life = life+v;
        if(life > 8)
        {
            setLife(8);
        }
        else{
            setLife(life);
        }
    }
    
    
    /*START/END GAME*/
    function startGame() {
        $('.section').hide();
        $('.section#intro').show();
        setLife(8);
    }

    function endGame() {
        resetInterface();
        $('.section').hide();
        $('.section#death').show();        
    }
});
