import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const token = localStorage.getItem('token');

	let path = window.location.href.split('/')[3];
	const noRedirectList = ['sign-up', 'password-reset'];
	// console.log(noRedirectList.includes(path));
	// console.log(path);

	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to /signin page
		<Route
			{...rest}
			render={props =>
				token ? <Component {...props} /> : <Redirect to='/login' />
			}
		/>
	);
};

export default PrivateRoute;
