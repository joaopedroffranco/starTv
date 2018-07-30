function Mosaic(findNode, animated) {
	this.x = 0;
	this.y = 0;
	this.animated = animated || false;
	this.elements = [[]];
	this.findNode = findNode;
}
    
Mosaic.prototype.update = function(elements) {
	this.elements = elements;
}

Mosaic.prototype.up = function() {
	const prevY = this.y - 1;
	this.y = prevY < 0 ? this.y : prevY;
}

Mosaic.prototype.down = function() {
	const nextY = this.y + 1;
	this.y = nextY > this.elements.length - 1 ? this.y : nextY;
}

Mosaic.prototype.left = function() {
	const nextX = this.x + 1;
	this.x = nextX > this.elements[this.y].length - 1 ? this.x : nextX;
}

Mosaic.prototype.right = function() {
	const prevX = this.x - 1;
	this.x = prevX < 0 ? this.x : prevX;
}

Mosaic.prototype.focus = function(element) {
	const el = this.elements[this.x][this.y];
	const currentDOM = element ?
		this.findNode(el) :
		this.findNode(element);

	if (currentDOM !== null) {
		currentDOM.focus();
	}
}

Mosaic.prototype.hasElements = function() {
	return !!this.elements.length;
}

module.exports = Mosaic;
