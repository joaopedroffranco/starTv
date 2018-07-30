const TV = require('./tvs');
const Navigation = require('../navigation/navigation');

function Plataform(findNode) {
	this.settings = TV.plataforms[window.location.pathname.split('/')[1]] || TV.plataforms.pc;

	const { dependences, controls } = this.settings;
	dependences.get();
	this.navigation = new Navigation(controls, findNode);
}

Plataform.prototype.router = function(pathname) {
	const { path } = this.current;
	return `/${path}/${pathname}`;
}

Plataform.prototype.isOnline = function() {
	return navigator.onLine;
}

module.exports = Plataform;
