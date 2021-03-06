const Group = require('./group');

/**
 * Track class. It is a navigation type. 
 * 
 * @param {Number} startindex A start track index, that representes the current group. Default is 0
 * @param {Boolean} vertical Defines if the track is vertical or horizontal
 * @param {Number} startGroupIndex A start index at current group. Used to secure the navigation state. Default is 0
 */
function Track(startindex, vertical, startGroupIndex) {
	this.index = startindex;
	this.vertical = vertical;
	this.startGroupIndex = startGroupIndex || 0;

	this.update = function(elements) {
		this.groups = Array(elements.length);
		for (var i = 0, len = elements.length; i < len; i++) {
			const elementsGroup = elements[i];
			if (this.index === i) {
				this.startGroupIndex = this.startGroupIndex < elementsGroup.length ? this.startGroupIndex : 0;
			}
			this.groups[i] = new Group(elementsGroup, this.index === i ? this.startGroupIndex : 0);
		}

		this.index = this.index < elements.length ? this.index : 0;
	}	

	this.up = function() {
		if (this.vertical) {
			const group = this.groups[this.index];
			group.previous();
		} else {
			this.previous();
		}

		this.startGroupIndex = (this.hasElements() && this.groups[this.index]) ? this.groups[this.index].index : 0;
	}

	this.down = function() {
		if (this.vertical) {
			const group = this.groups[this.index];
			group.next();
		} else {
			this.next();
		}

		this.startGroupIndex = (this.hasElements() && this.groups[this.index]) ? this.groups[this.index].index : 0;
	}

	this.left = function() {
		if (this.vertical) {
			this.previous();
		} else {
			const group = this.groups[this.index];
			group.previous();
		}

		this.startGroupIndex = (this.hasElements() && this.groups[this.index]) ? this.groups[this.index].index : 0;
	}

	this.right = function() {
		if (this.vertical) {
			this.next();
		} else {
			const group = this.groups[this.index];
			group.next();
		}

		this.startGroupIndex = (this.hasElements() && this.groups[this.index]) ? this.groups[this.index].index : 0;
	}

	this.next = function() {
		const nextIndex = this.index + 1;
		this.index = nextIndex >= this.groups.length ? this.index : nextIndex;
	}

		this.previous = function() {
		const prevIndex = this.index - 1;
		this.index = prevIndex < 0 ? this.index : prevIndex;
	}

	this.focus = function(element) {
		const group = this.groups[this.index];
		const currentDOM = element || group.elements[group.index];

		if (currentDOM && currentDOM.focus) {
			currentDOM.focus();
		}
	}

	this.isFirst = function() {
		return this.groups.length > 0 && this.index === 0;
	}

	this.isLast = function() {
		return this.groups.length > 0 && this.index === this.groups.length - 1;
	}

	this.hasElements = function() {
		return this.groups && !!this.groups.length;
	}
}

module.exports = Track;
