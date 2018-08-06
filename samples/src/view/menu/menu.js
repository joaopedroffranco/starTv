import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Init from '../start/init';
import Navigation from 'startv/navigation/navigation';
import Track from 'startv/navigation/track';
import './style.css';

class Menu extends React.Component {
	constructor() {
		super();

        this.state = {
            items: [
                {id: 1, name: 'Home', to: Init.routers.home},
                {id: 2, name: 'Trilhos', to: Init.routers.tracks},
                {id: 3, name: 'Mosaico', to: Init.routers.mosaic},
            ]
        }

        this.menuRefs = Array(this.state.items.length);
    }

    componentDidMount() {
        const { current } = this.props;
        this.navigationType = new Track(0, Navigation.types.verticaltrack, current);
        this.navigationType.update([this.menuRefs] || [[]]);
    }

	render() {
        const { items } = this.state;
        const { current } = this.props;
		return (
			<div className="menu-container">
                <p>Menu</p>
                {items.map((item, index) =>
                    <Link
                        onClick={(event) => {
                            if (current === index) {
                                event.preventDefault();
                            }
                        }}
                        key={item.id}
                        to={{ pathname: item.to, state: { current: index } }}
                        className="menu-item"
                        ref={(ref) => { this.menuRefs[index] = ReactDOM.findDOMNode(ref); }}
                    >{item.name}
                    </Link>
                )}
			</div>
		);
	}
}

export default Menu;
