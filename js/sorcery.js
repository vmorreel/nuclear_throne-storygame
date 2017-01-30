$( function() {
    var buttons = $(".section button");
    var status = $("#status");
    status.hide();
    startGame();

    $("#easter_egg").next().click(function() {
        if ($("#easter_egg").val() == "#hewillnotdivideus") {
            gotoSection("openChest");
        }
    });
    
    function setCharacter(character){
       switch(character) {
            case 'eyes':
                setImage("Eyes_Sadist.gif");
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

                setImage("Yung_Venuz_Menu.gif");

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
                    status.hide();
                    startGame();
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
                default:
                    gotoSection(go);
                    break;
            } 
        }

    });
    
    function setImage(path) {
        $('#status').after('<img src="img/' + path + '">');
               var img = $('#status+img').css({'position':'relative',
                            'top':'18px',
                            'left':'-217px'
                        });
    }

    function shapeDesign() {
        $(".section").css('margin-top', '0px');
    }

    
    function setButton(id,go,message){
        $(id).attr('go', go);
        $(id).html(message);
    }
    
    
    function gotoSection(key) {
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
        $('.section').hide();
        $('.section#death').show();        
    }
});
