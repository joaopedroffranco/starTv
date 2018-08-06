import React from 'react';
import Devices from '../device/devices';
import Main from '../main';
import Navigation from 'startv/navigation/navigation';
import Mosaic from 'startv/navigation/mosaic';
import './style.css';

class Tracks extends React.Component {
	constructor() {
		super();
		this.tracks = Array(3);
		this.navigationSettings = {
			type: Navigation.types.mosaic,
			elementsRef: [[]],
			startIndex: 0,
			startGroupIndex: 0
		}
		this.navigationType = null;
	}

	componentDidMount() {
		this.navigationType = new Mosaic();
	}

	updateNavigation() {
		const tracks = [];
		this.tracks.forEach((track) => {
			const elements = track ? track.devicesRefs : []
			tracks.push(elements)
		});
		this.navigationType.update(tracks);
	}

	render() {
		return (
			<Main
				content={this}
				menuIndex={2}
			>
				<div className="mosaic-container">
					{[0,1,2].map((index) =>
						<Devices
							key={index}
							ref={(ref) => { this.tracks[index] = ref}}
							updateNavigation={this.updateNavigation.bind(this)}
						/>
					)}
				</div>
			</Main>
		);
	}
}

export default Tracks;
