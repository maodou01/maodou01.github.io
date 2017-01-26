$(document).ready(function() {
	
	
	$(".start-menu").click(function() {
		$(".menu").toggle(0);
	});
	$('.menu a, .content, .open-app, .nav-apps, .app-icon').click(function() {
		$(".menu").hide(0);
	});


    $( ".content" ).sortable({
    	 items: ".app-icon"
    });
    $( ".col-desktop" ).disableSelection();
    
    //$.removeCookie('wallpaper');
    wallpaperCookie = $.cookie("wallpaper");
    if($.removeCookie('wallpaper')){
    	$('body').css('backgroundImage', 'url("assets/img/wallpapers/'+wallpaperCookie+'")');
    	$.cookie("wallpaper", wallpaperCookie);
    }

   //alert($.cookie("css"));
   
   	if($.cookie("css")) {
		$("#theme").attr("href",$.cookie("css"));
	}  
    
});

function tocApp(id){
	

	$('.app-'+id).toggleClass('selected');
	
	$('.window').css('z-index','1000');
	
	var zindex= $('#'+id).css('z-index');

	$('#'+id).css('z-index',++zindex);

	$("#"+id).toggle(0);
	
}
function openApp(id, title, page, icon, width, height, resizable){
	$('.window').css('z-index','99999');
	var test = $('.nav-apps div').is('.app-'+ id);
	if(test == true){
		$('#'+id).effect( "bounce", {times:3}, 100 );
	}
	else{
		var titleApp = '<div class="open-app app-'+ id +' selected" onclick="tocApp(\''+ id +'\')"><i class="fa '+ icon +'"></i><span class="title"> '+ title +' </span></div>';
		$('.nav-apps').append(titleApp);
		createWindows(id, title, page, icon, width, height, resizable);
	}
}
function createWindows(id, title, page, icon, width, height, resizable){
	
	var window = '<div class="window ui-widget-content" id="'+ id +'" onMouseOver="moveWindows()" onClick="firstWindows(\''+ id +'\')">'+
    			'<div class="header">'+
    				'<div class="title">'+
    					'<h5><i class="fa '+ icon +'"></i> '+ title +'</h5>'+
    				'</div>'+
    				'<div class="move">'+
    				'</div>'+
    				'<div class="action">'+
	    				'<a href="#" class="minus" onclick="minWindows(\''+ id +'\')"><i class="fa fa-minus"></a></i>'+
	    				'<a href="#" class="max" onclick="maxWindows(\''+ id +'\')"><i class="fa fa-plus"></a></i>'+
	    				'<a href="#" class="closer" onclick="closeWindows(\''+ id +'\')"><i class="fa fa-times"></a></i>'+
    				'</div>'+
    			'</div>'+
    			'<div class="window-content-'+ id +'"></div>'+
    		'</div>';
    $('.content').append(window);
    
    $(".window-content-"+id).load('pages/'+page+'?'+Number(new Date()),function(){
        firstWindows(id);
    });
    
    //alert(resizable);
    $( "#"+id ).css({
        'width': width,
        'height': height,
        'min-width': width,
        'min-height': height
    });
    
    if(resizable == true){
    	$( ".window" ).resizable();
    }

    $( "#"+id ).position({
       my: "center center",
       at: "center center",
       of: ".content"
    });

}
function closeWindows(id){
		$('#'+id).hide(100, function(){$(this).detach();});
		$('.app-'+id).hide(100, function(){$(this).detach();});

}
function minWindows(id){
		$('.app-'+id).removeClass('selected');
		
		$( "#"+id ).position({
               my: "center center",
               at: "center center",
               of: ".content"
            });
            
            $('#'+id).hide(100);
}
function maxWindows(id){
		$('#'+id).css("top", "");
		$('#'+id).css("left", "");
		$('#'+id).css("width", "");
		$('#'+id).css("height", "");
		$('#'+id).toggleClass('max');
		$( "#"+id ).position({
               my: "center center",
               at: "center center",
               of: ".content"
            });
}
function moveWindows(){
	$( ".window" ).draggable({
         containment: ".content",
         handle: '.wrapper-title'
    });
}
function firstWindows(id){
	    $('.window').css('z-index','1000');
		$('#'+id).css('z-index','3000');
}
function submitForm(formId, action){
		
		
		var data = [];
		
		
		
		$("#"+formId+" :input").each(function(){
			var id = $(this).attr('id');
		 	data.push({name:$(this).attr('name'), value: $('#'+id).val()});
		});
		//alert(data[0][name]);
		//alert(action);
		
		$.ajax({
		    type: "POST",
		    url: 'pages/'+action,
		    dataType: "html",
		    data: data,
		    success: function(data){
		       $('#content-'+formId).html(data);
		    }
		});
}


