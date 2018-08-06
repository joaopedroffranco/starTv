import React from 'react';
import Devices from '../device/devices';
import Main from '../main';
import Navigation from 'startv/navigation/navigation';
import Track from 'startv/navigation/track';
import './style.css';

class Home extends React.Component {
	constructor() {
		super();
		this.navigationType = null;
	}

	componentDidMount() {
		this.navigationType = new Track(0, Navigation.types.horizontaltrack, 0);
	}

	updateNavigation() {
		const elements = this.devicesComponent ? [this.devicesComponent.devicesRefs] : [[]];
		this.navigationType.update(elements);
	}

	render() {
		return (
			<Main
				content={this}
				menuIndex={0}
			>
				<div className="home-container">
					<Devices
						ref={(ref) => { this.devicesComponent = ref}}
						updateNavigation={this.updateNavigation.bind(this)}
					/>
				</div>
			</Main>
		);
	}
}

export default Home;
