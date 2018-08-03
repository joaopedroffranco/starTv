const TV = require('./tvs');
const Navigation = require('../navigation/navigation');

function Plataform() {
	this.settings = TV.plataforms[window.location.pathname.split('/')[1]] || TV.plataforms.pc;

	const dependences = this.settings.dependences;
	const controls = this.settings.controls;
	dependences.get();
	this.navigation = new Navigation(controls);

	this.router = function(pathname) {
		const path = this.settings.path;
		return '/' + path + '/' + pathname;
	}

	this.isOnline = function() {
		return navigator.onLine;
	}
}

module.exports = Plataform;
