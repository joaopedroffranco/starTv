function Mosaic(animated) {
	this.x = 0;
	this.y = 0;
	this.animated = animated || false;
	this.elements = [[]];
    
	this.update = function(elements) {
		this.elements = elements;
	}

	this.up = function() {
		const prevY = this.y - 1;
		this.y = prevY < 0 ? this.y : prevY;
		this.x = Math.min(this.x, this.elements[this.y].length - 1);
	}

	this.down = function() {
		const nextY = this.y + 1;
		this.y = nextY >= this.elements.length ? this.y : nextY;
		this.x = Math.min(this.x, this.elements[this.y].length - 1);
	}

	this.left = function() {
		const prevX = this.x - 1;
		this.x = prevX < 0 ? this.x : prevX;
	}

	this.right = function() {
		const nextX = this.x + 1;
		this.x = nextX >= this.elements[this.y].length ? this.x : nextX;
	}

	this.focus = function(element) {
		const el = this.elements[this.x][this.y];
		const currentDOM = element || el;

		if (currentDOM !== null) {
			currentDOM.focus();
		}
	}

	this.hasElements = function() {
		return !!this.elements.length;
	}
}

module.exports = Mosaic;
