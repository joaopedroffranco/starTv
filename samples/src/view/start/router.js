import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Init from './init';


class Router extends React.Component {
	render() {
		return (
			<div>
				<Switch>
					<Route path="/:device" component={Init} />
				</Switch>
			</div>
		);
	}
}

export default Router;
