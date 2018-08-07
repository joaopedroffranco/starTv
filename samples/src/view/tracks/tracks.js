import React from 'react';
import ReactDOM from 'react-dom';
import Devices from '../device/devices';
import Plataform from 'startv/tv/plataform';
import Main from '../main';
import Navigation from 'startv/navigation/navigation';
import Track from 'startv/navigation/track';
import Animator from '../../util/animator';
import './style.css';

class Tracks extends React.Component {
	constructor() {
		super();
		this.tracks = Array(4);
		this.navigationType = null;
	}

	componentDidMount() {
		this.navigationType = new Track(0, Navigation.types.horizontaltrack, 0);
	}

	updateNavigation() {
		const tracks = [];
		this.tracks.forEach((track) => {
			const elements = track ? track.devicesRefs : []
			tracks.push(elements)
		});
		this.navigationType.update(tracks);
	}

	scroll(keyCode) {
		const horizontal = keyCode === Plataform.current.navigation.controls.right || keyCode === Plataform.current.navigation.controls.left;
		const vertical = !horizontal && (keyCode === Plataform.current.navigation.controls.down || keyCode === Plataform.current.navigation.controls.up);

		if (horizontal) {
			const currentIndex = Plataform.current.navigation.type.index;
			const element = ReactDOM.findDOMNode(this.tracks[currentIndex]);
			const groupIndex = Plataform.current.navigation.type.groups[currentIndex].index;
			const to = -Math.round(groupIndex * 240);
			Animator.start(element, to, 'left');
		} else if (vertical) {
			const element = ReactDOM.findDOMNode(this.parent);
			const index = Plataform.current.navigation.type.index;
			const to = -Math.round(index * 250);
			Animator.start(element, to, 'top');
		}
	}

	render() {
		return (
			<Main
				content={this}
				menuIndex={1}
				scroll={this.scroll.bind(this)}
			>
				<div
					className="tracks-container"
					ref={(ref) => { this.parent = ref; }}
				>
					<div className="scrollable">
						{[0,1,2,3].map((index) =>
							<Devices
								key={index}
								ref={(ref) => { this.tracks[index] = ref}}
								updateNavigation={this.updateNavigation.bind(this)}
							/>
						)}
					</div>	
				</div>
			</Main>
		);
	}
}

export default Tracks;
