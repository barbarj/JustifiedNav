test("findWrapperWidth", function() {
	var $mainNav = $('.main-nav');
	var result = findWrapperWidth( $mainNav );
	equal( result, 960, 'Width of the "main-nav" class equals 960 pixels');

	var $menu = $('header ul');
	var result2 = findWrapperWidth( $menu );
	equal( result2, 960, 'Width of the "header ul" equals 960 pixels');

	var $menu2 = $('.menu');
	var result3 = findWrapperWidth( $menu2 );
	equal( result3, 960, 'Width of the "menu" class equals 960 pixels');
});