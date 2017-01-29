$( function() {
    var buttons = $(".section button");
    var status = $("#status");
    status.hide();
    startGame();
    
    
    

    buttons.click( function() {
        go = $(this).attr('go');
        var character = $(this).attr('character');
        
        switch(go) {
            case 'intro':
                startGame();
                break;
            case 'inTheDesert':
                setCharacter(character);
                status.show();
                gotoSection(go);
                break;
            default:
                gotoSection(go);

        } 
    });

    
    function setCharacter(character){
       switch(character) {
            case 'eyes':
                //faire les set de section
                break;
            case 'yv':
                //set de section aussi
                 break;
            default:
                break;
            }
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
