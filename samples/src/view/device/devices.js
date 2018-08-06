import React from 'react';
import DevicesInteractor from '../../data/interactor/devices';
import Device from './device';
import '../../util/array';

class Devices extends React.Component {
	constructor() {
        super();

        this.state = {
            devices: []
        };
    }
    
    componentDidMount() {
        this.fetchDevices();
    }

    shouldComponentUpdate(props, state) {
        const { devices } = state;
        this.devicesRefs = Array(devices.length);
        return state !== this.state;
    }

    componentDidUpdate() {
        const { updateNavigation } = this.props;
        this.devicesRefs = this.devicesRefs.clean();
        updateNavigation();
    }

    fetchDevices() {
        DevicesInteractor.get((devices) => {
            this.setState({
                devices: devices
            });
        });
    }

	render() {
        const { devices } = this.state;
		return (
            <div className="devices-container">
                {devices && devices.map((device, index) =>
                    <Device
                        navigationref={(ref) => this.devicesRefs[index] = ref}
                        key={index}
                        device={device}
                    />
                )}
			</div>
		);
	}
}

export default Devices;
