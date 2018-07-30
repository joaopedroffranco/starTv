const TV = require('./tvs');
const Navigation = require('../navigation/navigation');

class Plataform {
    constructor(findNode) {
		this.settings = TV.plataforms[window.location.pathname.split('/')[1]] || TV.plataforms.pc;

		const { dependences, controls } = this.settings;
		dependences.get();
		this.navigation = new Navigation(controls, findNode);
    }

	router(pathname) {
		const { path } = this.current;
		return `/${path}/${pathname}`;
	}

	static isOnline() {
		return navigator.onLine;
	}
}

module.exports = Plataform;
