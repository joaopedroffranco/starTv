const Group = './group';
const Navigation = './navigation';

class Track {
	constructor(startindex, vertical, animated = false) {
        this.index = startindex;
		this.animated = animated;
		this.vertical = vertical;
		this.startGroupIndex = 0;
    }
    
    update(elements) {
		this.groups = Array(elements.length);
		this.parent = null;
		elements.forEach((elementsGroup, index) => {
			this.groups[index] = new Group(elementsGroup, this.index === index && this.startGroupIndex < elementsGroup.length ? this.startGroupIndex : 0, this.animated);
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
	}

	down() {
		if (this.vertical) {
			const group = this.groups[this.index];
			group.next();
		} else {
			this.next();
		}
	}

	left() {
		if (this.vertical) {
			this.previous();
		} else {
			const group = this.groups[this.index];
			group.previous();
		}
	}

	right() {
		if (this.vertical) {
			this.next();
		} else {
			const group = this.groups[this.index];
			group.next();
		}
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
			Navigation.findNode(group.elements[group.index]) :
			Navigation.findNode(element);

		if (currentDOM !== null) {
			currentDOM.focus();
		}

		this.startGroupIndex = (this.hasElements() && this.groups[this.index]) ? this.groups[this.index].index : 0;
	}

	hasElements() {
		return this.groups && !!this.groups.length;
	}
}

module.exports = Track;
