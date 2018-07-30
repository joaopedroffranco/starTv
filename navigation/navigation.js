const Track = require('./track');
const Mosaic = require('./mosaic');

function Navigation(controls, findNode) {
    this.findNode = findNode;
    this.controls = controls;
}

Navigation.prototype.set(onReturn, onExit, type, animated = false, startindex = 0) {
    this.onReturn = onReturn;
    this.onExit = onExit;
    
    switch (type) {
        case Navigation.types.verticaltrack: this.type = new Track(startindex, true, this.findNode, animated); break;
        case Navigation.types.horizontaltrack: this.type = new Track(startindex, false, this.findNode, animated); break;
        case Navigation.types.mosaic: this.type = new Mosaic(this.findNode, animated); break;
        default: this.type = new Track(startindex, false, this.findNode, animated); break;
    }
}
    
Navigation.prototype.update = function(elements) {
    this.type.update(elements);
}

Navigation.prototype.focus = function() {
    this.type.focus();
}
    
Navigation.prototype.move = function(keycode) {
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

Navigation.types = {
    verticaltrack: 1,
    horizontaltrack: 2,
    mosaic: 3
}

module.exports = Navigation;