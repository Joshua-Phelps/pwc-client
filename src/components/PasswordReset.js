import React, { useState } from 'react';
import { api } from '../services/api';
import { TextField, makeStyles } from '@material-ui/core/';

const initialState = {
	password: '',
	retypePassword: '',
};

function PasswordReset({ location }) {
	const [state, setState] = useState({});
	const token = location.pathname.split('/password-reset/')[1];

	const handleChange = ({ target: { name, value } }) => {
		setState(prevState => {
			return { ...prevState, [name]: value };
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		api.auth.updatePassword(state, token);
	};

	return (
		<form onSubmit={handleSubmit}>
			<TextField
				aria-label='Password field'
				variant='outlined'
				label='New Password'
				id='password-field'
				name='password'
				value={state.password}
				onChange={handleChange}
			/>

			<TextField
				aria-label='Retype Password field'
				variant='outlined'
				label='New Password'
				id='retype-password-field'
				name='retypePassword'
				value={state.retypePassword}
				onChange={handleChange}
			/>
		</form>
	);
}

export default PasswordReset;
