$( function() {
	var buttons = $(".section button");
	var status = $("#status");
    startGame();

	buttons.click( function() {
        var go = $(this).attr('go');
        if(go == "intro"){
            startGame();
        }else{
            gotoSection(go);    
        }
          
        
    });
	
	
	
	function gotoSection(key) {
        $('.section').hide();
        var section = $('.section#'+key);
		section.show();
        var child = section.children('action');
        var actionName = child.attr('name');
        var actionLose = child.attr('lose');
            
        
        if(actionName == "hit"){
            if(actionLose != undefined){
                setLife(actionLose);
            }else{
                loseOneLife();
            }
        }
        
        if(section.children('a').html() != undefined){
            
            var button = section.children('button');
            button.css({"display":"none"});
            var chance = 0;
            
            section.children('a').click(function(){
                var reponse = $('input#question_'+key).val();
                chance ++;
                
                if(reponse == "reponse"){
                    button.css({"display":"block"});
                    $('a#lose').remove();
                }else{
                    if(chance == 1)
                        $(this).after('<p><a id="lose">Faire apparaître le bouton en échange d\'une vie.</a></p>')
                    
                }
                
                
                $('a#lose').click(function(){
                    button.css({"display":"block"});
                    loseOneLife();
                    $(this).remove();
                });
            });
        }
        
	}
	
	function getLife() {
		var life = status.find('span.value').html();
        return life;
  
	}
    
	function setLife(v) {
		var life = getLife();
        life = life-v;
        status.find('span.value').html(life);
        if(life <= 0){
             status.find('span.value').html("0");
            endGame();
        }else{
             status.find('span.value').html(life);
        }
	}
	
	function loseOneLife() {
		var life = getLife();
        life = life-1;
        if(life <= 0){
             status.find('span.value').html("0");
            endGame();
        }else{
             status.find('span.value').html(life);
        }
            
	}
	
	function startGame() {
		$('.section').hide();
        $('.section#intro').show();
        status.find('span.value').html("3");
	}
	
	function endGame() {
		$('.section').hide();
        $('.section#death').show();        
	}
	
} );