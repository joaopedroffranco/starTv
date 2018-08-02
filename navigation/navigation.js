const Track = require('./track');
const Mosaic = require('./mosaic');

function Navigation(controls) {
    this.controls = controls;

    this.set = function(onReturn, onExit, type, startindex, startGroupIndex) {
        this.startindex = startindex || 0;
        this.onReturn = onReturn;
        this.onExit = onExit;
        this.startGroupIndex = startGroupIndex || 0;
        
        switch (type) {
            case Navigation.types.verticaltrack: this.type = new Track(this.startindex, true, this.startGroupIndex); break;
            case Navigation.types.horizontaltrack: this.type = new Track(this.startindex, false, this.startGroupIndex); break;
            case Navigation.types.mosaic: this.type = new Mosaic(startindex, startGroupIndex); break;
            default: this.type = new Track(this.startindex, false, this.startGroupIndex); break;
        }
    }
        
    this.update = function(elements) {
        this.type.update(elements);
    }

    this.isFirst = function() {
        return this.type.isFirst();
    }

    this.isLast = function() {
        return this.type.isLast();
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