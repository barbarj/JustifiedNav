//create an array of rows of items in the given menu
// String -> Array
function createRows( menu ) {
	//create necessary initial variables
	var rows = []
	var maxRowWidth = $( menu ).width();
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

//stretch the rows in the given menu to the full width of the menu container
//String -> Boolean
function stretchRows( menu ) {
	var $rows = $( createRows( menu ) );

	$.each( $rows, function( key, value ) {
		if( key != $rows.length - 1 ) {
			var $thisRow = $( this );

			$thisRow[ $thisRow.length -1 ].css( 'margin-right', '0' );

			//find widthToAdd by finding the differce between this row's width and the container width and dividing by the number of items in the row, and then by 2, then rounding down to avoid any decimals.
			//must use "this" as apposed to "$this" when using rowWidth because rowWidth property does not transfer over when converted to a jQuery object

			addPadding( menu, this.rowWidth, $thisRow );
		}


	});
}

function addPadding( menu, rowWidth, $thisRow ) {
	var widthToAdd = Math.floor( ( ( $( menu ).width() - rowWidth ) / $thisRow.length ) /  2 );

	$.each( $thisRow, function() {
		var $this = $( this );

		//add paddings together and divide by 2, so that in all cases, left and right padding will be the same, then remove the 'px' so we can do math with it.
		//this is also where the jquery.sizes plugin comes in.
		var currentPadding = ( $this.padding().left + $this.padding().right ) / 2; 
		var newPadding = ( currentPadding + widthToAdd ) + "px";

		$this.css( 'padding-left',  newPadding ).css( 'padding-right', newPadding );
	});
	var newWidth = rowWidth + ( widthToAdd * $thisRow.length * 2 );
	var difference = $( menu ).width() - newWidth;

	//iterate through each element in the row and add a pixel to both sides of the padding. Once difference hits one, add that pixel to the padding-right of the current element and force break from the each loop by returning false.
	$.each( $thisRow, function() {
		var $this = $( this );	

		//add paddings together and divide by 2, so that in all cases, left and right padding will be the same, then remove the 'px' so we can do math with it.
		//this is also where the jquery.sizes plugin comes in.
		currentPadding = ( $this.padding().left + $this.padding().right ) / 2; 
		newPadding = ( currentPadding + 1 ) + "px";

		if( difference > 1 ) {
			$this.css( 'padding-left',  newPadding ).css( 'padding-right', newPadding );
			difference -= 2;
		}
		else {
			$this.css( 'padding-right', newPadding );
			return false;
		}
	});
}