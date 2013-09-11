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
	rows[i] = [];

	$.each( $menuItems, function( key, value ) {
		var $this = $( this );

		workingArrayWidth += $this.outerWidth( true );
		if( workingArrayWidth < maxRowWidth )
			rows[i].push( $this );

		if ( workingArrayWidth == maxRowWidth ) {
			workingArrayWidth -= $this.outerWidth( true );
			workingArrayWidth += $this.outerWidth( false );
			if( workingArrayWidth > maxRowWidth ) {
				i++;
				rows.push( [] );	//create the next array in rows
				rows[i].push( $this );
				workingArrayWidth = $this.outerWidth( true );
			}
			else {
				rows[i].push( $this );
				i++;
				rows.push( [] );	//create the next array in rows
			}
		}

		if ( workingArrayWidth > maxRowWidth ) {
			i++;
			rows.push( [] );	//create the next array in rows
			rows[i].push( $this );
			workingArrayWidth = $this.outerWidth( true );
		}
	});

	return rows;
}