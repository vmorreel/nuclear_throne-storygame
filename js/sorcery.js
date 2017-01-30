$( function() {
    var buttons = $(".section button");
    var status = $("#status");
    status.hide();
    startGame();
    

    function setCharacter(character){
       switch(character) {
            case 'eyes':
               setSection('strangeEngraving','knowEverything','knowEverything');  
               setSection('fightBandits','useTelekinesis','Use Telekinesis'); 
               setSection('fightBandits','eyesSeesEverything','Eyes sees everything'); 
                
                break;
            case 'yv':
                setSection('strangeEngraving','verifyVenuz','verifyVenuz');  
                setSection('strangeEngraving','soCool','soCool');  
                setSection('fightBandits','brrrrraaaap','brrrrraaaap');  
                setSection('fightBandits','mony','mony');  
                setSection('openChest','chestOpened','Open the chest');  
                setSection('openChest','letsSleep','Sleep zzzZZ');  
                 break;
            default:
                break;
            }
        
         buttons = $(".section button");
    }
    
    buttons.click( function() {
        go = $(this).attr('go');
        var character = $(this).attr('character');
        switch(go) {
            case 'intro':
                status.hide();
                deleteButtonCharacter();
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
    
    
    function setSection(id,go,message){
        var button = $('#'+id).append('<button go="'+go+'">'+message);
    }
    
    function deleteButtonCharacter(){
        var strangeEngraving =  $('#strangeEngraving').find('button');
        var fightBandits =  $('#fightBandits').find('button');
        var openChest =  $('#openChest').find('button');
        $(strangeEngraving).remove(); 
        $(fightBandits).remove(); 
        $(openChest).remove(); 
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
