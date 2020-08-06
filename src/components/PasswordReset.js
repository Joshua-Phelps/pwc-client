import React, { useState, useContext } from 'react';
import { api } from '../services/api';
import { MessageContext } from '../App';
import {
	TextField,
	Grid,
	Button,
	makeStyles,
	Typography,
} from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
	heading: {
		textAlign: 'center',
		paddingTop: theme.spacing(10),
	},
	item: {
		textAlign: 'center',
	},
	formSpacing: {
		padding: theme.spacing(1),
	},
}));

const initialState = {
	password: '',
	retypePassword: '',
};

function PasswordReset({ location, history }) {
	const classes = useStyles();
	const [state, setState] = useState(initialState);
	const { message, errorMessage } = useContext(MessageContext);
	const resetToken = location.pathname.split('/password-reset/')[1];

	const visitLogin = () => history.push('/login');

	const handleChange = ({ target: { name, value } }) => {
		setState(prevState => {
			return { ...prevState, [name]: value };
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		api.auth
			.updatePassword(state, resetToken)
			.then(res => {
				if (res.error) {
					return errorMessage();
				} else {
					message(
						'Password Successfully Changed!',
						'Please login again',
						'Login Page',
						visitLogin
					);
				}
			})
			.catch(err => console.log(err));
	};

	return (
		<Grid container>
			<Grid className={classes.heading} item xs={12} sm={12}>
				<Typography variant='subtitle1'>
					Please enter your new password
				</Typography>
			</Grid>
			<Grid item xs={12} sm={2}></Grid>
			<Grid className={classes.item} item xs={12} sm={8}>
				<form onSubmit={handleSubmit}>
					<div className={classes.formSpacing}>
						<TextField
							aria-label='Password field'
							variant='outlined'
							label='New Password'
							id='password-field'
							name='password'
							type='password'
							value={state.password}
							onChange={handleChange}
						/>
					</div>
					<div className={classes.formSpacing}>
						<TextField
							aria-label='Retype Password field'
							variant='outlined'
							label='Confirm Password'
							id='retype-password-field'
							name='retypePassword'
							type='password'
							value={state.retypePassword}
							onChange={handleChange}
						/>
					</div>
					<div className={classes.formSpacing}>
						<Button type='submit' variant='contained' color='secondary'>
							Submit
						</Button>
					</div>
				</form>
			</Grid>
			<Grid item xs={false} sm={2}></Grid>
		</Grid>
	);
}

export default PasswordReset;
