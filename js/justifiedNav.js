//Get the width of the menu we are dealing with
// String -> Natural
function findWrapperWidth( menu ) {
	return $(menu).width();
}

//create an array of rows of items in the given menu
// String -> Array
function createRows( menu ) {
	//create necessary initial variables
	var rows = []
	var maxRowWidth = findWrapperWidth( menu );
	var $menuItems = $( menu + ' li a');

	//the variable used in the .each function below to keep track of the width of our current row.
	var workingArrayWidth = 0;

	var i = 0;
	rows[i] = [];	//create the first row we are working with

	$.each( $menuItems, function( key, value ) {
		var $this = $( this );	//cache the current object so we can run jquery functions on it.

		workingArrayWidth += $this.outerWidth( true );
		if( workingArrayWidth < maxRowWidth ){
			rows[i].push( $this );	//if workingArrayWidth is less than our maxRowWidth, add the current item to the row

			if( key == ($menuItems.length - 1) ) {
				//if this is the last item in menuItems, add a rowWidth property to the current row so we can use it later.
				rows[i].rowWidth = workingArrayWidth
			}
		}

		/*If workingArrayWidth is greater than or equal to maxRowWidth, remove the margin from the width calculation by removing the width of the last item, and then adding it back without the margin included. If workingArrayWidth is now less than our maxWidth, add the current item to the row. If it is still more, iterate to the next row, add the item to that row, and set workingArrayWidth to the width of that item with margins included.*/
		if ( workingArrayWidth >= maxRowWidth ) {
			workingArrayWidth -= $this.outerWidth( true );
			workingArrayWidth += $this.outerWidth( false );
			if( workingArrayWidth > maxRowWidth ) {
				//add a rowWidth property to the current row so we can use it later.
				rows[i].rowWidth = workingArrayWidth

				i++;
				rows.push( [] );	//create the next row
				rows[i].push( $this );
				workingArrayWidth = $this.outerWidth( true );
			}
			else {
				rows[i].push( $this );

				//add a rowWidth property to the current row so we can use it later.
				rows[i].rowWidth = workingArrayWidth

				i++;
				rows.push( [] );	//create the next row
				workingArrayWidth = 0;
			}
		}
	});

	return rows;
}