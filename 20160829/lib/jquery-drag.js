$(function() {
	$.drag=function(element,title_element,coor,parent){
		var parent = parent ? parent : element;
		$(document).mousemove(function(e) {
			if (!!this.move) {
				var posix = !document.move_target ? {'x': 0, 'y': 0} : document.move_target.posix,
					callback = document.call_down || function() {
						$(this.move_target).css({
							'top': e.pageY - posix.y,
							'left': e.pageX - posix.x
						});
					};
				callback.call(this, e, posix);
			}
		}).mouseup(function(e) {
			if (!!this.move) {
				var callback = document.call_up || function(){};
				callback.call(this, e);
				$.extend(this, {
					'move': false,
					'move_target': null,
					'call_down': false,
					'call_up': false
				});
			}
		});

		var $box = $(element).on('mousedown',title_element,function(e) {
		    var offset = $(this).offset();
		    
		    $(parent)[0].posix = {'x': e.pageX - offset.left, 'y': e.pageY - offset.top};
		    $.extend(document, {'move': true, 'move_target': $(parent)[0]});
		});
		$(parent).on('mousedown', coor, function(e) {
		    var $parent = $(parent),
		    	posix = {
		            'w': $parent.width(), 
		            'h': $parent.height(), 
		            'x': e.pageX, 
		            'y': e.pageY
		        };
		    
		    $.extend(document, {'move': true, 'call_down': function(e) {
		        $parent.css({
		            'width': Math.max(30, e.pageX - posix.x + posix.w),
		            'height': Math.max(30, e.pageY - posix.y + posix.h)
		        });
		    }});
		    return false;
		});
	}
});