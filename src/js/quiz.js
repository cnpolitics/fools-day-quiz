var total = 10;
var fullScore = 8;
var tScore = 0;
var record = 0;
var quizRec = "";

function next(t){
    $("div#bd > div.panel-body").hide();
    $("div.js_answer").eq(t).show();
    $("div.js_answer").eq(t).children("input").attr("checked","");
    gotoTop();
}
function result(t){
    share_pop("open",10000);
    $("div#bd > div.panel-body").hide();
    
    $("div.js_result").eq(fullScore - t).show();
	$("div.js_result").eq(fullScore - t).find(".resultscore").eq(0).html($("#totalsc").val());
	gotoTop();
}

function push(){
    // Variable to hold request
	var request;

	

    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $("#collector");

    $('<input />').attr('type', 'hidden')
          .attr('name', "Total")
          .attr('value', tScore)
          .appendTo($form);
          
    for (i=1;i<9; i++){
    
      $('<input />').attr('type', 'hidden')
          .attr('name', "A"+i)
          .attr('value', quizRec[i-1])
          .appendTo($form); 
    }
    
    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // Fire off the request to /form.php
    request = $.ajax({
        url: "http://zwen668.com/git/foolsDayQuiz/php/post.php",
        type: "post",
        data: serializedData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log("Hooray, it worked!");
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
        $inputs.prop("disabled", false);
    });

    // Prevent default posting of form
    event.preventDefault();
}

function toggle(t){
    	$(t).children("input").attr("checked","checked");
  		$("li.list-group-item").removeClass('active')
    	var rt = $(t).children("input:checked").val();
    	var score = rt.match(/\d+/)[0];
      	tScore  = parseInt(tScore) + parseInt(score);
    	
    	quizRec = quizRec + rt.match(/[a-zA-Z]/);
		$("#totalsc").val(tScore);
   		$(t).addClass('active');
    	var t = $("div.js_answer").index($(t).parents("div.js_answer")) + 1;
    	if(t == total){
        	push();
		    modifyTitle(tScore);
        	result(tScore);
    	}else{
        	setTimeout(function(){next(t);},500);
    	}
}

function gotoTop(){
    $("body,html").animate({scrollTop:($("#header").offset().top + $("#header").height())}, 1000);
}