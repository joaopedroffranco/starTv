function Group(elements, startindex = 0, animated = false) {
	this.index = startindex;
	this.elements = elements;
	this.parent = null;
	this.animated = animated;
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
