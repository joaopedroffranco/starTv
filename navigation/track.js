const Group = require('./group');

function Track(startindex, vertical, findNode, animated = false) {
	this.index = startindex;
	this.animated = animated;
	this.vertical = vertical;
	this.startGroupIndex = 0;
	this.findNode = findNode;
}
Track.prototype.update = function(elements) {
	this.groups = Array(elements.length);
	elements.forEach((elementsGroup, index) => {
		if (this.index === index) {
			this.startGroupIndex = this.startGroupIndex < elementsGroup.length ? this.startGroupIndex : 0;
		}
		this.groups[index] = new Group(elementsGroup, this.index === index ? this.startGroupIndex : 0, this.animated);
	});
	this.index = this.index < elements.length ? this.index : 0;
}

Track.prototype.up = function() {
	if (this.vertical) {
		const group = this.groups[this.index];
		group.previous();
	} else {
		this.previous();
	}

	this.startGroupIndex = (this.hasElements() && this.groups[this.index]) ? this.groups[this.index].index : 0;
}

Track.prototype.down = function() {
	if (this.vertical) {
		const group = this.groups[this.index];
		group.next();
	} else {
		this.next();
	}

	this.startGroupIndex = (this.hasElements() && this.groups[this.index]) ? this.groups[this.index].index : 0;
}

Track.prototype.left = function() {
	if (this.vertical) {
		this.previous();
	} else {
		const group = this.groups[this.index];
		group.previous();
	}

	this.startGroupIndex = (this.hasElements() && this.groups[this.index]) ? this.groups[this.index].index : 0;
}

Track.prototype.right = function() {
	if (this.vertical) {
		this.next();
	} else {
		const group = this.groups[this.index];
		group.next();
	}

	this.startGroupIndex = (this.hasElements() && this.groups[this.index]) ? this.groups[this.index].index : 0;
}

Track.prototype.next = function() {
	const nextIndex = this.index + 1;
	this.index = nextIndex >= this.groups.length ? this.index : nextIndex;
}

Track.prototype.previous = function() {
	const prevIndex = this.index - 1;
	this.index = prevIndex < 0 ? this.index : prevIndex;
}

Track.prototype.focus = function(element = null) {
	const group = this.groups[this.index];
	const currentDOM = element == null ?
		this.findNode(group.elements[group.index]) :
		this.findNode(element);

	if (currentDOM !== null) {
		currentDOM.focus();
	}
}

Track.prototype.hasElements = function() {
	return this.groups && !!this.groups.length;
}

module.exports = Track;
