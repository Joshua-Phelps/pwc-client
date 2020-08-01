import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, restricted, permit, ...rest }) => {
	const token = localStorage.getItem('token');

	const publicUrls = ['/login', '/sign-up', '/password-reset-send-email'];

	const isPath = (arr, path) => {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] === path) return true;
		}
		return false;
	};

	return (
		<Route
			{...rest}
			render={props =>
				permit ? <Component {...props} /> : console.log('redirecting')
			}
		/>
		// <Route
		// 	{...rest}
		// 	render={props =>
		// 		token ? (
		// 			<Component {...props} />
		// 		) : (
		// 			!isPath(publicUrls, props.location.pathname) && (
		// 				<Redirect to='/login' />
		// 			)
		// 		)
		// 	}
		// />
	);
};

export default PublicRoute;
