const Navigation = require('./navigation');

class Group {
	constructor(elements, animated = false) {
		this.index = 0;
		this.elements = elements;
		this.parent = null;
		this.animated = animated;
	}

	next() {
		const nextIndex = this.index + 1;
		this.index = nextIndex >= this.elements.length ? this.index : nextIndex;
	}

	previous() {
		const prevIndex = this.index - 1;
		this.index = prevIndex < 0 ? this.index : prevIndex;
	}

	isFirstElement() {
		return this.elements.length > 0 && this.index === 0;
	}

	isLastElement() {
		return this.index === this.elements.length - 1;
	}
}

module.exports = Group;
