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
               var img =  $('div:first-of-type').append('coucou');
               $(img).css({'position':'relative','top':'18px','left':'-218px'});
    
                //1st event
                $("#strangeEngraving button:first-of-type").attr('go', 'knowEverything');
                $("#strangeEngraving button:first-of-type").html('Know everything');
                $("#strangeEngraving button:last-of-type").attr('go', 'showNothing');
                $("#strangeEngraving button:last-of-type").html('Show nothing');
                
                //2nd event
                $("#fightBandits button:first-of-type").attr('go', 'useTelekinesis');
                $("#fightBandits button:first-of-type").html('Telekineses pushes projectiles away');
                $("#fightBandits button:nth-of-type(2)").attr('go', 'eyesSeesEverything');
                $("#fightBandits button:nth-of-type(2)").html('Eyes sees everything');

                $("#easter_egg").css("display", 'block');
                $("#easter_egg").next().css("display", 'block');


                //3rd event
                $("#openChest button:first-of-type").attr('go', 'chestOpened');
                $("#openChest button:first-of-type").html('Open the chest');
                $("#openChest button:last-of-type").attr('go', 'letsSleep');
                $("#openChest button:last-of-type").html('Take a break');

                break;

            case 'yv':
                //1st event
                $("#strangeEngraving button:first-of-type").attr('go', 'verifyVenuz');
                $("#strangeEngraving button:first-of-type").html('#verifyVenuz');
                $("#strangeEngraving button:last-of-type").attr('go', 'soCool');
                $("#strangeEngraving button:last-of-type").html('So cool');
                
                //2nd event
                $("#fightBandits button:first-of-type").attr('go', 'brrrrraaaap');
                $("#fightBandits button:first-of-type").html('Brrrrraaaap');
                $("#fightBandits button:nth-of-type(2)").attr('go', 'mony');
                $("#fightBandits button:nth-of-type(2)").html('Mony');

                $("#easter_egg").css("display", 'none');
                $("#easter_egg").next().css("display", 'none');


                //3rd event
                $("#openChest button:first-of-type").attr('go', 'chestOpened');
                $("#openChest button:first-of-type").html('Open the chest');
                $("#openChest button:last-of-type").attr('go', 'letsSleep');
                $("#openChest button:last-of-type").html('Take a break');
                 break;
            default:
                break;
            }
        
         buttons = $(".section button");
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
                case 'inTheDesert':
                    setCharacter(character);
                    status.show();
                    gotoSection(go);
                    break;
                default:
                    gotoSection(go);
                    break;
            } 
        }

    });
    
    
    function setButton(id,go,message){
        var button = $('#'+id).append('<button go="'+go+'">'+message);
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
        $('.section#characters').show();
        setLife(8);
    }

    function endGame() {
        $('.section').hide();
        $('.section#death').show();        
    }
});
