function Mosaic(x, y) {
	this.x = x || 0;
	this.y = y || 0;
	this.elements = [[]];
    
	this.update = function(elements) {
		this.elements = elements;
	}

	this.up = function() {
		const prevX = this.x - 1;
		this.x = prevX < 0 ? this.x : prevX;
		this.y = Math.min(this.y, this.elements[this.x].length - 1);
	}

	this.down = function() {
		const nextX = this.x + 1;
		this.x = nextX >= this.elements.length ? this.x : nextX;
		this.y = Math.min(this.y, this.elements[this.x].length - 1);
	}

	this.left = function() {
		const prevY = this.y - 1;
		this.y = prevY < 0 ? this.y : prevY;
	}

	this.right = function() {
		const nextY = this.y + 1;
		this.y = nextY >= this.elements[this.x].length ? this.y : nextY;
	}

	this.focus = function(element) {
		const el = this.elements[this.x][this.y];
		const currentDOM = element || el;

		if (currentDOM && currentDOM.focus) {
			currentDOM.focus();
		}
	}

	this.isFirst = function() {
		return this.elements.length > 0 && this.x === 0;
	}

	this.isLast = function() {
		return this.elements.length > 0 && this.x === this.elements.length - 1;
	}

	this.hasElements = function() {
		return !!this.elements.length;
	}
}

module.exports = Mosaic;
