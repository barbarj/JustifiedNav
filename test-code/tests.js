//PASSED
// test( 'rowBuilder', function() {
// 	var container = '.menu';
// 	var rowData = new rowBuilder(container);
// 	ok( rowData, 'object creation' );
// 	equal( rowData.containerWidth, 960, 'containerWidth' );
// 	deepEqual( rowData.$menuItems, $(container + ' > li > a'), 'menuItems' );
// 	deepEqual( rowData.rowsArray, [], 'rows array');
// });

//PASSED
// test( 'createRows', function() {
// 	var container = '.menu';
// 	var rowData = new rowBuilder( container );
// 	var containerWidth = 960;

// 	var expectedRows0 = [];
// 	var expectedRows1 = [];
// 	var expectedRowWidth0 = 0;
// 	var expectedRowWidth1 = 0;

// 	$.each( $(container + ' > li > a'), function( key ) {
// 		$this = new item(this);
// 		if( key < 5 ) {
// 			expectedRows0.push( $this );
// 			expectedRowWidth0 += $this.element.outerWidth(true);
// 		}
// 		else if( key == 5 ) {
// 			expectedRows0.push( $this );
// 			expectedRowWidth0 += $this.element.innerWidth();
// 			$this.outer = false;
// 		}
// 		else {
// 			expectedRows1.push( $this );
// 			expectedRowWidth1 += $this.element.outerWidth(true);
// 		}
// 	});

// 	var difference0 = containerWidth - expectedRowWidth0;
// 	var difference1 = containerWidth - expectedRowWidth1;
// 	var addedPadding0 = Math.floor(difference0 / (expectedRows0.length * 2));
// 	var addedPadding1 = Math.floor(difference1 / (expectedRows1.length * 2));
// 	var leftovers0 = difference0 - (addedPadding0 * 2 * expectedRows0.length);
// 	var leftovers1 = difference1 - (addedPadding1 * 2 * expectedRows1.length);

// 	rowData.createRows();

// 	ok( rowData, 'object created' );
// 	deepEqual( rowData.rowsArray[0].items, expectedRows0, 'row 0 array');
// 	deepEqual( rowData.rowsArray[1].items, expectedRows1, 'row 1 array');
// 	equal( rowData.rowsArray[0].rowWidth, expectedRowWidth0, 'row 0 width' );
// 	equal( rowData.rowsArray[1].rowWidth, expectedRowWidth1, 'row 1 width' );
// 	equal( rowData.rowsArray[0].difference, difference0, 'row 0 difference' );
// 	equal( rowData.rowsArray[1].difference, difference1, 'row 1 difference' );
// 	equal( rowData.rowsArray[0].addedPadding, addedPadding0, 'row 0 addedPadding' );
// 	equal( rowData.rowsArray[1].addedPadding, addedPadding1, 'row 1 addedPadding' );
// 	equal( rowData.rowsArray[0].leftovers, leftovers0, 'row 0 leftovers' );
// 	equal( rowData.rowsArray[1].leftovers, leftovers1, 'row 1 leftovers' );
// });

//PASSED
// test( 'row', function() {
// 	var testRow = new row( 960 );
// 	ok( testRow, 'object' );
// 	equal( testRow.rowWidth, 0, 'width');
// 	deepEqual( testRow.items, [], 'items array');
// 	equal( testRow.getContainerWidth(), 960, 'containerWidth' );
// 	equal( testRow.difference, 960, 'difference' );
// 	equal( testRow.addedPadding, 0, 'addedPadding' );
// 	equal( testRow.leftovers, 960, 'leftovers' );
// 	equal( testRow.last, false, 'last' );
// });

// PASSED
// test( 'row.toAddItem', function() {
// 	var testRow = new row( 960 );
// 	ok( testRow.toAddItem, 'existence of method' );

// 	var $testItem = $('.menu > li > a:first');
// 	var result = testRow.toAddItem( $testItem );
// 	ok( result, 'existence of result');

// 	//less than - ADD, outer 
// 	testRow.rowWidth = 0;
// 	equal( result.toAdd, true, '< ADD - toAdd' );
// 	equal( result.outer, true, '< ADD - Outer');

// 	//greater than - ADD, inner
// 	testRow.rowWidth = 880;
// 	var result2 = testRow.toAddItem( $testItem );
// 	equal( result2.toAdd, true, '> ADD -toAdd');
// 	equal( result2.outer, false, '> ADD - Use Inner')

// 	//greater than - DONT, null
// 	testRow.rowWidth = 900;
// 	var result3 = testRow.toAddItem( $testItem );
// 	equal( result3.toAdd, false, '> DONT - toAdd');

// 	//equal - ADD, Inner
// 	testRow.rowWidth = 870;
// 	var result4 = testRow.toAddItem( $testItem );
// 	equal( result4.toAdd, true, '= ADD - toAdd' );
// 	equal( result4.outer, false, '= ADD - Use Inner');

// });

//PASSED
// test('addItem', function() {
// 	var $newItem = $('.menu > li > a:first');
// 	var $item = new item ( $newItem );
// 	var testRow = new row( 960 );
// 	ok( testRow.addItem, 'existence of method' );

// 	testRow.addItem( $newItem, true );
// 	deepEqual( testRow.items, Array( $item ), 'item added' );
// 	//equal( testRow.rowWidth, $newItem.outerWidth(true), 'rowWidth with outer correct' );
// 	//equal( testRow.difference, 870, 'difference reeval' );
// 	//equal( testRow.addedPadding, 435, 'addedPadding reeval' );
// 	//equal( testRow.leftovers, 0, 'leftovers reeval' );


// 	var testRow2 = new row( 960 );
// 	testRow2.addItem( $newItem, false );
// 	//equal( testRow2.rowWidth, $newItem.innerWidth(), 'rowWidth with inner correct' );
// 	strictEqual( testRow2.items[ testRow2.items.length - 1 ].outer, false, 'last item useOuter');
// });


//PASSED
// test('item', function() {
// 	var element = '.menu > li > a:first';
// 	var newItem = new item(element);
// 	ok( newItem, 'object' );
// 	deepEqual( newItem.element, $(element), '.element' );
// 	equal( newItem.padding, 20 );
// 	strictEqual( newItem.lastInRow, false, 'lastInRow' );
// 	strictEqual( newItem.outer, true, 'outer' );
// });


//PASSED
// test('findNewPadding', function() {
// 	var container = '.menu';
// 	var rowData = new rowBuilder( container );
// 	rowData.createRows();

// 	rowData.rowsArray[0].findNewPadding();

// 	var itemPadding0 = 21;
// 	var itemPadding1 = 21;
// 	var itemPadding2 = 21;
// 	var itemPadding3 = 21;
// 	var itemPadding4 = 20;
// 	var itemPadding5 = 20;

// 	equal(rowData.rowsArray[0].items[0].padding, itemPadding0, 'item 0');
// 	equal(rowData.rowsArray[0].items[1].padding, itemPadding1, 'item 1');
// 	equal(rowData.rowsArray[0].items[2].padding, itemPadding2, 'item 2');
// 	equal(rowData.rowsArray[0].items[3].padding, itemPadding3, 'item 3');
// 	equal( rowData.rowsArray[0].items[4].padding, itemPadding4, 'item 4');
// 	equal( rowData.rowsArray[0].items[5].padding, itemPadding5, 'item 5');

// });

//PASSED
// test('setPadding', function() {
// 	var container = '.menu';
// 	var rowData = new rowBuilder( container );
// 	rowData.createRows();

// 	rowData.rowsArray[0].findNewPadding();
// 	rowData.rowsArray[0].setPadding();

// 	var itemPadding0 = '21px';
// 	var itemPadding1 = '21px';
// 	var itemPadding2 = '21px';
// 	var itemPadding3 = '21px';
// 	var itemPadding4 = '20px';
// 	var itemPadding5 = '20px';

// 	equal( rowData.rowsArray[0].items[0].element.css('padding-left'), itemPadding0, 'item 0');
// 	equal( rowData.rowsArray[0].items[1].element.css('padding-left'), itemPadding1, 'item 1');
// 	equal( rowData.rowsArray[0].items[2].element.css('padding-left'), itemPadding2, 'item 2');
// 	equal( rowData.rowsArray[0].items[3].element.css('padding-left'), itemPadding3, 'item 3');
// 	equal( rowData.rowsArray[0].items[4].element.css('padding-left'), itemPadding4, 'item 4');
// 	equal( rowData.rowsArray[0].items[5].element.css('padding-left'), itemPadding5, 'item 5');
// });

//PASSED
// test('stretchRows', function() {
// 	var container = '.menu';
// 	var rowData = new rowBuilder( container );
// 	rowData.createRows();

// 	ok(rowData.stretchRows(), 'method exists');
// 	rowData.stretchRows();

// 	var itemPadding0 = '21px';
// 	var itemPadding1 = '21px';
// 	var itemPadding2 = '21px';
// 	var itemPadding3 = '21px';
// 	var itemPadding4 = '20px';
// 	var itemPadding5 = '20px';

// 	equal( rowData.rowsArray[0].items[0].element.css('padding-left'), itemPadding0, 'item 0');
// 	equal( rowData.rowsArray[0].items[1].element.css('padding-left'), itemPadding1, 'item 1');
// 	equal( rowData.rowsArray[0].items[2].element.css('padding-left'), itemPadding2, 'item 2');
// 	equal( rowData.rowsArray[0].items[3].element.css('padding-left'), itemPadding3, 'item 3');
// 	equal( rowData.rowsArray[0].items[4].element.css('padding-left'), itemPadding4, 'item 4');
// 	equal( rowData.rowsArray[0].items[5].element.css('padding-left'), itemPadding5, 'item 5');
// 	equal( rowData.rowsArray[0].items[ rowData.rowsArray[0].items.length - 1 ].element.css( 'margin-right' ), '0px', 'last item margin-right');


// });


//PASSED
// test('reevalutate', function() {
// 	var container = '.menu';
// 	var rowData = new rowBuilder( container );
// 	rowData.createRows();

// 	rowData.rowsArray[0].findNewPadding();
// 	rowData.rowsArray[0].setPadding();
// 	rowData.rowsArray[0].reevaluate();

// 	var expectedRowWidth = 959;
// 	var expectedDifference = 1;
// 	var expectedAddedPadding = 0;
// 	var expectedLeftovers = 1;

// 	equal( rowData.rowsArray[0].rowWidth, expectedRowWidth, 'row width' );
// 	equal( rowData.rowsArray[0].difference, expectedDifference, 'difference' );
// 	equal( rowData.rowsArray[0].addedPadding, expectedAddedPadding, 'addedPadding' );
// 	equal( rowData.rowsArray[0].leftovers, expectedLeftovers, 'leftovers' );
// });

// test('justifiedNav', function() {
// 	ok( justifiedNav(), 'function execution succeeds');

// 	var container = '.menu';
// 	justifiedNav( container );
// });