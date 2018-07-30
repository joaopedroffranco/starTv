function Group(elements, startindex, animated) {
	this.index = startindex || 0;
	this.elements = elements;
	this.animated = animated || false;

	this.next = function() {
		const nextIndex = this.index + 1;
		this.index = nextIndex >= this.elements.length ? this.index : nextIndex;
	}

	this.previous = function() {
		const prevIndex = this.index - 1;
		this.index = prevIndex < 0 ? this.index : prevIndex;
	}

	this.isFirstElement = function() {
		return this.elements.length > 0 && this.index === 0;
	}

	this.isLastElement = function() {
		return this.index === this.elements.length - 1;
	}
}

module.exports = Group;
