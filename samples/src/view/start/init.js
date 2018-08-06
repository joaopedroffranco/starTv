import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Plataform from 'startv/tv/plataform';
import Home from '../home/home';
import Preload from '../preload/preload';
import Tracks from '../tracks/tracks';
import Mosaic from '../mosaic/mosaic';

Plataform.current = new Plataform();

class Init extends React.Component {
	render() {
		return (
			<div>
				<Preload />
				<Switch>
					<Route exact path={`/:device`} render={() => <Redirect to={Plataform.current.router(Init.routers.home)}/>} />
					<Route path={`/:device/${Init.routers.home}`} component={Home} />
					<Route path={`/:device/${Init.routers.tracks}`} component={Tracks} />
					<Route path={`/:device/${Init.routers.mosaic}`} component={Mosaic} />
				</Switch>
			</div>
		);
	}
}

Init.routers = {
	home: 'home',
	tracks: 'tracks',
	mosaic: 'mosaic'
}

export default Init;
