$(function() {
	var xhr      = new XMLHttpRequest();
	var cityData = new Object();
	
	xhr.open('HEAD', '/js/ajax.js', true);	
	xhr.onreadystatechange = function() {
		if (xhr.readyState==4 && xhr.status==200) {		
			var json = xhr.getResponseHeader('X-City-Data');
			cityData = JSON.parse(json);
			if ( !cityData.name ) { 
				// если имя города не определено
				return false;
			}
			if ( cityData.id == undefined ) {
				$('.city a.this').data({
					'title': 'Ваш регион — '+ cityData.name +'?',
					'content': '<p>В этом регионе нет представительств</p>'		
				});
			} else {
				$( '.city a.this' ).data({
					'title': 'Ваш регион — '+ cityData.name +'?',
					'content': '<div class="text-center"><a data-city-id="' + cityData.id + '" class="btn btn-primary btn-sm" href="#">Подтвердить</a></div>'
					//<a data-city-id="' + cityData.id + '" class="button" href="#">Подтвердить</a>'			
				});		
			}
			$( '.city a.this' ).popover( 'show' );			
		}
	}
	xhr.setRequestHeader("X-City-Get", "1");
	xhr.send(null);
	
	$( document ).keydown(function( e ) {
		if( e.which == 45 ) {		
			$('div.city a span').trigger('click');		 
		}
	});
	
	$( '.city' ).on('click', 'a', function() {
		$('.city a.this').popover('hide');
	});
	
	$( '.city' ).on('click', '.bottom', function(e) {
		$('.city a.this span').text(cityData.name);
		$('.city a#countAddress').text(cityData.countAddress);
		$('.city a#countAddress').attr('href', cityData.href);
		var cityId = $( e.target ).data('cityId');
		xhr.open('HEAD', '/js/cid.js', false);
		xhr.setRequestHeader("X-City-Id", cityId);
		xhr.send(null);
	});
	
	
	$( '#listCity' ).on('click', 'ul li a', function() {
		var cityId   = $( this ).data('cityId');
		var cityHref = $( this ).attr('href');	
		xhr.open('HEAD', '/js/cid.js', false);
		xhr.setRequestHeader("X-City-Id", cityId);
		xhr.send(null);
	});
});