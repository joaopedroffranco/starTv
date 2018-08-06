let canMove = true;
let start = null;

var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
								|| window[vendors[x]+'CancelRequestAnimationFrame'];
}

if (window.requestAnimationFrame) {
	window.requestAnimationFrame = function(callback, element) {
		var currTime = new Date();
		var timeToCall = Math.max(0, 16 - (currTime - lastTime));
		lastTime = currTime + timeToCall;
		return window.setTimeout(function() { callback(currTime + timeToCall); }, 
			timeToCall);
	};
}

if (!window.cancelAnimationFrame) {
	window.cancelAnimationFrame = function(id) {
		clearTimeout(id);
	};
}

class Animator {
    static canMove() {
        return canMove;
    }

    static start(element, to, property) {
		element.style[property] = `${to}px`;
	}
	
	static startRAF(element, from, side, to, duration, property) {
		window.requestAnimationFrame((timestamp) => { this.step(timestamp, element, from, side, to, duration, property); });
	}

	static step(timestamp, element, from, side, to, duration, property) {
		if (!start) start = timestamp;
		const progress = timestamp - start;
		if (progress < duration) {
			canMove = false;

			const percent = progress/duration;
			const distance = Math.abs(to - from);
			const left = Math.round(from + side*percent*distance);
			element.style[property] = `-${left}px`;

			window.requestAnimationFrame((timestamp) => this.step(timestamp, element, from, side, to, duration, property));
		} else {
            canMove = true;
			start = null;
		}
	}
}

export default Animator;