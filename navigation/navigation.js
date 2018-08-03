const Track = require('./track');
const Mosaic = require('./mosaic');

function Navigation(controls) {
    this.controls = controls;

    this.set = function(onReturn, onExit) {
        this.onReturn = onReturn;
        this.onExit = onExit;
    }

    this.setType = function(type) {
        this.type = type;
    }
        
    this.update = function(elements) {
        if (this.type) {
            this.type.update(elements);
        } else {
            console.error('Please, set navigation type');
        }
    }

    this.isFirst = function() {
        return this.type && this.type.isFirst();
    }

    this.isLast = function() {
        return this.type && this.type.isLast();
    }

    this.focus = function() {
        if (this.type) this.type.focus();
    }
        
    this.move = function(keycode) {
        if (this.type) {
            if (this.type.hasElements()) {
                switch (keycode) {
                case this.controls.left:
                    this.type.left();
                    break;
                case this.controls.up:
                    this.type.up();
                    break;
                case this.controls.down:
                    this.type.down();
                    break;
                case this.controls.right:
                    this.type.right();
                    break;
                case this.controls.return:
                case 8:
                    this.onReturn();
                    break;
                default: break;
                }
                this.focus();
            } else {
                console.error('Please, set navigation type');
            }
        }
    }
}

Navigation.types = {
    verticaltrack: true,
    horizontaltrack: false
}

module.exports = Navigation;