function Group(elements, startindex, animated) {
	this.index = startindex || 0;
	this.elements = elements;
	this.animated = animated || false;
}

Group.prototype.next = function() {
	const nextIndex = this.index + 1;
	this.index = nextIndex >= this.elements.length ? this.index : nextIndex;
}

Group.prototype.previous = function() {
	const prevIndex = this.index - 1;
	this.index = prevIndex < 0 ? this.index : prevIndex;
}

Group.prototype.isFirstElement = function() {
	return this.elements.length > 0 && this.index === 0;
}

Group.prototype.isLastElement = function() {
	return this.index === this.elements.length - 1;
}

module.exports = Group;
