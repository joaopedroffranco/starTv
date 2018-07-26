import Group from './group';
import Navigation from './navigation';

class Track {
	constructor(startindex, vertical, animated = false) {
        this.startindex =  Number.isInteger(startindex) ? { groupIndex: 0, elementIndex: 0 } : startindex;
		this.animated = animated;
		this.vertical = vertical;
    }
    
    update(elements) {
        this.groupIndex = this.startindex.groupIndex;
		this.groups = Array(elements.length);
		this.parent = null;
		elements.forEach((elementsGroup, index) => {
			this.groups[index] = new Group(elementsGroup, this.animated);
			if (index === this.startindex.groupIndex) {
				this.groups[index].index = this.startindex.elementIndex;
			}
		});
    }

	up() {
		if (this.vertical) {
			const group = this.groups[this.groupIndex];
			group.previous();
		} else {
			this.previous();
		}
	}

	down() {
		if (this.vertical) {
			const group = this.groups[this.groupIndex];
			group.next();
		} else {
			this.next();
		}
	}

	left() {
		if (this.vertical) {
			this.previous();
		} else {
			const group = this.groups[this.groupIndex];
			group.previous();
		}
	}

	right() {
		if (this.vertical) {
			this.next();
		} else {
			const group = this.groups[this.groupIndex];
			group.next();
		}
	}

	next() {
		const nextIndex = this.groupIndex + 1;
		this.groupIndex = nextIndex >= this.groups.length ? this.groupIndex : nextIndex;
	}

	previous() {
		const prevIndex = this.groupIndex - 1;
		this.groupIndex = prevIndex < 0 ? this.groupIndex : prevIndex;
	}

	focus(element = null) {
		const group = this.groups[this.groupIndex];
		const currentDOM = element == null ?
			Navigation.findNode(group.elements[group.index]) :
			Navigation.findNode(element);

		if (currentDOM !== null) {
			currentDOM.focus();
		}
	}

	hasElements() {
		return !!this.groups.length;
	}
}

export default Track;
