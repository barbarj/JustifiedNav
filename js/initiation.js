$(document).ready(function() {
	justifiedNav('.menu');
});

var resizeTimer;
$(window).resize( function() {
	if( $( window ).width() > 650 ) {
	    clearTimeout(resizeTimer);
	    resizeTimer = setTimeout( function() {
	    	clearStyles( '.menu' );
	    	justifiedNav('.menu');
	    }, 100);

	    console.log('resizing');
		// justifiedNav('.menu');
	}
});