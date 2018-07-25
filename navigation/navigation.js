import Track from './track';

class Navigation {
    constructor(controls) {
        if (!Navigation.findNode) {
            console.error('Navigation is not correctly set. Plase, set the find node function');
        } else {
            this.controls = controls;
        }
    }

    set(onReturn, onExit, type, animated = false, startindex = 0) {
		this.onReturn = onReturn;
        this.onExit = onExit;
        
        switch (type) {
            case Navigation.types.verticaltrack: this.type = new Track(startindex, animated, true); break;
            case Navigation.types.horizontaltrack: this.type = new Track(startindex, animated); break;
            case Navigation.types.mosaic: this.type = new Track(startindex, animated); break;
            default: this.type = new Track(startindex, animated); break;
        }
    }
    
    update(elements) {
        this.type.update(elements);
    }

    focus() {
        this.type.focus();
    }

    isValid(keycode) {
        return Object.values(this.controls).find((e) => e === keycode);
    }
    
    move(keycode) {
		if (this.type.hasElements() && this.isValid(keycode)) {
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

Navigation.findNode = null; // Should be set
Navigation.types = {
    verticaltrack: 1,
    horizontaltrack: 2,
    mosaic: 3
}

export default Navigation;