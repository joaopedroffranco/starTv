const Navigation = require('./navigation');

class Mosaic {
	constructor(animated = false) {
        this.x = 0;
        this.y = 0;
        this.animated = animated;
        this.elements = [[]];
    }
    
    update(elements) {
        this.elements = elements;
    }

	up() {
        const prevY = this.y - 1;
		this.y = prevY < 0 ? this.y : prevY;
	}

	down() {
		const nextY = this.y + 1;
		this.y = nextY > this.elements.length - 1 ? this.y : nextY;
	}

	left() {
		const nextX = this.x + 1;
		this.x = nextX > this.elements[this.y].length - 1 ? this.x : nextX;
	}

	right() {
		const prevX = this.x - 1;
		this.x = prevX < 0 ? this.x : prevX;
	}

	focus(element = null) {
		const el = this.elements[this.x][this.y];
		const currentDOM = element == null ?
			Navigation.findNode(el) :
			Navigation.findNode(element);

		if (currentDOM !== null) {
			currentDOM.focus();
		}
	}

	hasElements() {
		return !!this.elements.length;
	}
}

module.exports = Mosaic;
