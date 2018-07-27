import TV from './tvs';
import Navigation from '../navigation/navigation';

class Plataform {
    constructor() {
		this.settings = TV.plataforms[window.location.pathname.split('/')[1]] || TV.plataforms.pc;

		const { dependences, controls } = this.settings;
		dependences.get();
		this.navigation = new Navigation(controls);
    }

	router(pathname) {
		const { path } = this.current;
		return `/${path}/${pathname}`;
	}

	static isOnline() {
		return navigator.onLine;
	}
}

export default Plataform;
