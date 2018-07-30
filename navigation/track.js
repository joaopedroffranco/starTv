const Group = require('./group');

class Track {
	constructor(startindex, vertical, findNode, animated = false) {
        this.index = startindex;
		this.animated = animated;
		this.vertical = vertical;
		this.startGroupIndex = 0;
		this.findNode = findNode;
    }
    
    update(elements) {
		this.groups = Array(elements.length);
		this.parent = null;
		elements.forEach((elementsGroup, index) => {
			if (this.index === index) {
				this.startGroupIndex = this.startGroupIndex < elementsGroup.length ? this.startGroupIndex : 0;
			}
			this.groups[index] = new Group(elementsGroup, this.index === index ? this.startGroupIndex : 0, this.animated);
		});
		this.index = this.index < elements.length ? this.index : 0;
    }

	up() {
		if (this.vertical) {
			const group = this.groups[this.index];
			group.previous();
		} else {
			this.previous();
		}

		this.startGroupIndex = (this.hasElements() && this.groups[this.index]) ? this.groups[this.index].index : 0;
	}

	down() {
		if (this.vertical) {
			const group = this.groups[this.index];
			group.next();
		} else {
			this.next();
		}

		this.startGroupIndex = (this.hasElements() && this.groups[this.index]) ? this.groups[this.index].index : 0;
	}

	left() {
		if (this.vertical) {
			this.previous();
		} else {
			const group = this.groups[this.index];
			group.previous();
		}

		this.startGroupIndex = (this.hasElements() && this.groups[this.index]) ? this.groups[this.index].index : 0;
	}

	right() {
		if (this.vertical) {
			this.next();
		} else {
			const group = this.groups[this.index];
			group.next();
		}

		this.startGroupIndex = (this.hasElements() && this.groups[this.index]) ? this.groups[this.index].index : 0;
	}

	next() {
		const nextIndex = this.index + 1;
		this.index = nextIndex >= this.groups.length ? this.index : nextIndex;
	}

	previous() {
		const prevIndex = this.index - 1;
		this.index = prevIndex < 0 ? this.index : prevIndex;
	}

	focus(element = null) {
		const group = this.groups[this.index];
		const currentDOM = element == null ?
			this.findNode(group.elements[group.index]) :
			this.findNode(element);

		if (currentDOM !== null) {
			currentDOM.focus();
		}
	}

	hasElements() {
		return this.groups && !!this.groups.length;
	}
}

module.exports = Track;
