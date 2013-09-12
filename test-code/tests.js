module("Function Creation Tests");
test('createRows', function() {
	var mainNav = '.main-nav';
	var actualResult = createRows( mainNav );
	ok( actualResult );
	console.log( 'createRows Results' );
	console.log( actualResult );
});

test('stretchRows', function() {
	var mainNav = '.main-nav';
	var actualResult = stretchRows( mainNav );
	ok( actualResult );
	console.log( 'stretchRows Results' );
	console.log( actualResult );
});