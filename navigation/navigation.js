const Track = require('./track');
const Mosaic = require('./mosaic');

function Navigation(controls) {
    this.controls = controls;

    this.set = function(onReturn, onExit, type, animated, startindex, startGroupIndex) {
        this.animated = animated || false;
        this.startindex = startindex || 0;
        this.onReturn = onReturn;
        this.onExit = onExit;
        this.startGroupIndex = startGroupIndex || 0;
        
        switch (type) {
            case Navigation.types.verticaltrack: this.type = new Track(this.startindex, true, this.startGroupIndex, this.animated); break;
            case Navigation.types.horizontaltrack: this.type = new Track(this.startindex, false, this.startGroupIndex, this.animated); break;
            case Navigation.types.mosaic: this.type = new Mosaic(this.animated); break;
            default: this.type = new Track(this.startindex, false, this.startGroupIndex, this.animated); break;
        }
    }
        
    this.update = function(elements) {
        this.type.update(elements);
    }

    this.focus = function() {
        this.type.focus();
    }
        
    this.move = function(keycode) {
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
        }
    }
}

Navigation.types = {
    verticaltrack: 1,
    horizontaltrack: 2,
    mosaic: 3
}

module.exports = Navigation;