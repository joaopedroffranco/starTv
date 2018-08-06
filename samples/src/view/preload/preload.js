import React from 'react';
import './style.css';

class Preload extends React.PureComponent {
	render() {
		return (
			<div className="fonts">
				<div className="icon-on" />
				<div className="icon-off" />
			</div>
		);
	}
}

export default Preload;