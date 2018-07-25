import Navigation from "./navigation";

class Group {
	constructor(elements, animated = false) {
		this.index = 0;
		this.elements = elements;
		this.parent = null;
		this.animated = animated;
	}

	next() {
		const nextIndex = this.index + 1;
		this.index = nextIndex > this.elements.length - 1 ? this.index : nextIndex;
        this.scroll();
	}

	previous() {
		const prevIndex = this.index - 1;
		this.index = prevIndex < 0 ? this.index : prevIndex;
        this.scroll();
	}

	isFirstElement() {
		return this.index !== 0;
	}

	isLastElement() {
		return this.index !== this.elements.length - 1;
	}

	scroll() {
		if (this.animated) {
			const element = this.elements[this.index];
			const elementDOM = Navigation.findNode(element);

			if (elementDOM) {
				if (!this.parent) {
					this.parent = elementDOM.parentElement;
				}
				const width = 50;
				this.parent.style.marginLeft = `${-width * this.index}px`;
			}
		}
	}
}

export default Group;
