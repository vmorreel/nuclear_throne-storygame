$( function() {
    var buttons = $(".section button");
    var status = $("#status");
    var story= "";
    status.hide();
    startGame();
    
    
    
    

    buttons.click( function() {
        go = $(this).attr('go');
        var character = $(this).attr('character');
        
        switch(go) {
            case 'intro':
                startGame();
                break;
             case 'wakeUp':
                setCharacter(character);
                status.show();
                gotoSection(go);
                 break;
            default:
                gotoSection(go);
        }
        
    });

    
    function setCharacter(character){
       story = character;
    }
    
    
    function gotoSection(key) {
        $('.section').hide();
        var section = $('.section#'+key);
        section.show();
        
        var child = section.children('action');
        var actionName = child.attr('name');
        var actionLose = child.attr('lose');
        
        

        if(actionName == "hit"){
            if(actionLose != undefined)
            {
                losexLife(actionLose);
            }
            else
            {
                loseOneLife();
            }
        }

    }
    
    function setSection(){
        
    }
    
    

    /* LIFE */
    function getLife() {
        var life = status.find('span.value').html();
        return life;

    }

    function setLife(life) {
        status.find('span.value').html(life);
    }
    
    function losexLife(v) {
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

    function loseOneLife() {
        var life = getLife();
        life = life-1;
        if(life <= 0)
        {
            setLife(0);
            endGame();
        }
        else{
            setLife(life);
        }

    }
    
    
    /*START/END GAME*/

    function startGame() {
        $('.section').hide();
        $('.section#intro').show();
        setLife(3);
    }

    function endGame() {
        $('.section').hide();
        $('.section#death').show();        
    }
});
