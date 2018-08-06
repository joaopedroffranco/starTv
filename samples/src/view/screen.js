import React from 'react';
import Plataform from 'startv/tv/plataform';

class Screen extends React.Component {
	constructor() {
		super();

		this.onReturn = this.onReturn.bind(this);
        this.onExit = this.onExit.bind(this);
        this.move = this.move.bind(this);
		
		this.addListeners();
	}

	componentWillUnmount() {
		this.removeListeners();
	}

	addListeners() {
		document.addEventListener('keydown', this.move);
	}

	removeListeners() {
		document.removeEventListener('keydown', this.move);
    }

	move(event) {
		const { keyCode } = event;
		Plataform.current.navigation.move(keyCode);
	}

	onReturn() {
	}

	onExit() {
	}
}

export default Screen;
