import React from 'react';
import './style.css';

class Device extends React.Component {
    constructor() {
        super();

        this.state = {
            on: false
        };
    }

    toggle() {
        this.setState((prevState, props) => { return {
            on: !prevState.on
        }});
    }

	render() {
        const { on } = this.state;
        const { device, navigationref } = this.props;
        const { name } = device;
        const buttonIsOn = on ? 'on' : 'off';

		return (
            <button
                className={`device-button`}
                ref={navigationref}
                onClick={this.toggle.bind(this)}
            >
                <p>{name}</p>
                <div className={`device-toggle ${buttonIsOn}`} />
            </button>
		);
	}
}

export default Device;
