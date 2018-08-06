import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import Router from './view/start/router';
import './index.css';

ReactDOM.render((
	<BrowserRouter>
		<Router />
	</BrowserRouter>), document.getElementById('root'));

registerServiceWorker();
