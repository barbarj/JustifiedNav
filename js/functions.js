//Need to bring over the browser conditional manipulation of the rowContainerWidth variable in the row class.
//define the adjustments as variables to be set depending on the menu. (possibly on run tests to automatically set the adjustments sonehow. Less that must be configured, the better.)
//also, change into switch statement

//DEFINE OUR CLASSES

//jQuery object -> object
//return an item class with properties, created from the given element
function item( element ) {
	this.element = $(element);
	this.padding = ( this.element.padding().left + this.element.padding().right ) / 2;
	this.outer = true;
}

// nothing -> object
// create an empty row object to be used later
function row( containerWidth ) {
	//initial properties
	this.rowWidth = 0;
	this.items = [];
	var rowContainerWidth = containerWidth;
	this.difference = rowContainerWidth - this.rowWidth;
	this.addedPadding = 0;
	this.leftovers = this.difference - (this.addedPadding * 2 * this.items.length);
	this.last = false;

	//methods

	//nothing -> Natural
	//return the containerWidth variable of the row
	this.getContainerWidth = function() {
		return rowContainerWidth;
	}

	//jQuery Object -> Object with 2 values
	//determine based on the width of the item, whether or not to add it to the row.
	this.toAddItem = function( item ) {
		var result = new Object();
		var outerWorkingWidth = this.rowWidth + item.outerWidth(true);
		var innerWorkingWidth = this.rowWidth + item.innerWidth();

		if( outerWorkingWidth < rowContainerWidth ) {
			result.toAdd = true;
			result.outer = true;
		}
		else if( outerWorkingWidth == rowContainerWidth ) {
			result.toAdd = true;
			result.outer = false;
		}
		else { //outerWorkingWidth > rowContainerWidth
			if( innerWorkingWidth <= rowContainerWidth ) {
				result.toAdd = true;
				result.outer = false;
			}
			else {
				result.toAdd = false;
				result.outer = true;	//set to true so that we can use this for next row.
			}
		}

		return result;
	}

	//jQuery object -> nothing
	//push the given object on the items array and adjust rowWidth accordingly
	this.addItem = function( element, useOuter ) {
		var $item = new item( element );

		if( useOuter )
			this.rowWidth += $item.element.outerWidth(true);
		else {
			this.rowWidth += $item.element.innerWidth();
			$item.outer = false;
		}

		this.items.push( $item );
	}

	//jQuery object -> nothing
	//set the padding property of the items in the given row to the new padding based on current padding and paddingtoadd
	this.findNewPadding = function() {
		var currentPadding = this.items[0].padding;
		var newPadding = currentPadding + this.addedPadding;
		$.each(this.items, function() {
			this.padding = newPadding;
		});
		while( this.leftovers > 1 ) {
			var i = 0;
			while( i < this.items.length && this.leftovers > 1 ) {
				this.items[i].padding++;
				this.leftovers -= 2;
				i++;
			}
		}
		return true;
	}

	//jquery object -> nothing
	//set the padding in the css to the padding property of the item
	this.setPadding = function() {
		$.each( this.items, function( key, value ) {
			this.element.css('padding-left', this.padding ).css('padding-right', this.padding );
		});
	}

	//nothing -> nothing
	//reevaluate the properties in the row that depend on those that are fixed
	this.reevaluate = function() {
		var temporaryWidth = 0;
		$.each( this.items, function( key, value) {
			if( this.outer )
				temporaryWidth += this.element.outerWidth(true);
			else
				temporaryWidth += this.element.innerWidth();
		});
		this.rowWidth = temporaryWidth;
		this.difference = rowContainerWidth - this.rowWidth;
		this.addedPadding = Math.floor(this.difference / (this.items.length * 2));
		this.leftovers = this.difference - (this.addedPadding * 2 * this.items.length);
	}
}

//object -> object
//Create an object containing the necessary building blocks for the rest of the program, from the given object
function rowBuilder( container ) {
	this.containerWidth = $(container).width();
	this.$menuItems = $(container + ' > li > a');
	this.rowsArray = [];

	var parent = this;

	//methods

	//nothing -> nothing
	//group $menuItems into rows
	this.createRows = function() {
		this.rowsArray.push( new row( this.containerWidth ) );
		var rowIterator = 0;
		$.each( parent.$menuItems, function( key, value ) {
			var $this = $( this );
			var itemData = parent.rowsArray[rowIterator].toAddItem( $this );
			if( !itemData.toAdd ) {
				parent.rowsArray.push( new row( parent.containerWidth ) );
				rowIterator++
			}
			parent.rowsArray[rowIterator].addItem( this, itemData.outer );
			parent.rowsArray[rowIterator].reevaluate();
		});
	}

	//nothing -> Boolean
	//take everything we've done so far, and use it to stretch the rows, returning true upon success
	this.stretchRows = function() {
		$.each( this.rowsArray, function( key, value ) {
			if( key != [parent.rowsArray.length - 1] ) {
				this.findNewPadding();
				this.setPadding();
				this.items[ this.items.length - 1 ].element.css( 'padding-right', (this.leftovers + this.items[ this.items.length - 1 ].padding ) + "px" ).css( 'margin-right', '0' );
			}
		});
		return true;
	}
}



//DEFINE OUR PRESENTATION FUNCTIONS



//DEFINE OUR GLUE FUNCTIONS

//string -> Boolean
//link everything together under one function so that we only have to call one ourselves.
function justifiedNav( container ) {
	var rowData = new rowBuilder( container );
	rowData.createRows();
	rowData.stretchRows();

	return true;
}