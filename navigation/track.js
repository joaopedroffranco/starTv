import Group from './group';
import Navigation from './navigation';

class Track {
	constructor(startindex, animated = false, vertical = false) {
        this.startindex = startindex === 0 ? { groupIndex: 0, elementIndex: 0 } : startindex;
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
			this.scroll();
		}
	}

	down() {
		if (this.vertical) {
			const group = this.groups[this.groupIndex];
			group.next();
		} else {
			this.next();
			this.scroll();
		}
	}

	left() {
		if (this.vertical) {
			this.previous();
			this.scroll();
		} else {
			const group = this.groups[this.groupIndex];
			group.previous();
		}
	}

	right() {
		if (this.vertical) {
			this.next();
			this.scroll();
		} else {
			const group = this.groups[this.groupIndex];
			group.next();
		}
	}

	next() {
		const nextIndex = this.groupIndex + 1;
		this.groupIndex = nextIndex > this.groups.length - 1 ? this.groupIndex : nextIndex;
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

	scroll() {
		if (this.animated) {
			const group = this.groups[this.groupIndex];
			const element = group.elements[group.index];
			const elementDOM = Navigation.findNode(element);
			if (elementDOM && this.groupIndex > 0) {
				if (!this.parent) {
					this.parent = elementDOM.parentElement.parentElement.parentElement;
				}
				const height = 50;
				this.parent.style.marginTop = `${-height * (this.groupIndex - 1)}px`;
			}
		}
	}
}

export default Track;
