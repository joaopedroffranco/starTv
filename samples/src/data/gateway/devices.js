import axios from 'axios';
import mock from '../mock/devices';

class Devices {
	static api() {
		const baseURL = 'http://api.sambavideos.sambatech.com/v1';

		return axios.create({
			baseURL: `${baseURL}/api/Devices`
		});
	}

	static devices() {
		return new Promise((resolve) => {
			resolve({ data: mock.examples });
		});
		// return Devices.api().get('/Devices');
	}
}

export default Devices;
