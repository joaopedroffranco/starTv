const TV = require('./tvs');
const Navigation = require('../navigation/navigation');

function Plataform() {
	this.settings = TV.plataforms[window.location.pathname.split('/')[1]] || TV.plataforms.pc;

	const dependences = this.settings.dependences;
	const controls = this.settings.controls;
	dependences.get();
	this.navigation = new Navigation(controls);
}

Plataform.prototype.router = function(pathname) {
	const path = this.settings.path;
	return '/' + path + '/' + pathname;
}

Plataform.prototype.isOnline = function() {
	return navigator.onLine;
}

module.exports = Plataform;
