import React, { useState, useContext } from 'react';
import { DispatchContext } from '../App';
import { useHistory } from 'react-router-dom';
import { api } from '../services/api';
import {
	TextField,
	Button,
	Grid,
	makeStyles,
	Typography,
} from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
	container: {
		padding: theme.spacing(3),
		justifyContent: 'center',
		alignItems: 'center',
	},
	item: {
		textAlign: 'center',
	},
	buttonContainer: {
		padding: theme.spacing(2),
		justifyContent: 'center',
	},
	text: {
		padding: theme.spacing(2),
	},
}));

function PasswordSendEmail() {
	const classes = useStyles();
	const [email, setEmail] = useState('');
	const { dialogDispatch } = useContext(DispatchContext);
	const history = useHistory();

	const visitLogin = () => history.push('/login');

	const handleSubmit = e => {
		console.log(email);
		e.preventDefault();
		api.auth
			.sendPasswordResetEmail(email)
			.then(res => {
				if (res.error) {
					// error handle
				} else {
					return dialogDispatch({
						type: 'SET',
						payload: {
							title: 'Password reset link was sent!',
							message: 'Please check your email inbox',
							// buttonText: 'Login Page',
							// handleButton: visitLogin,
							open: true,
						},
					});
				}
			})
			.then(() => history.push('/login'))
			.catch(err => console.log(err));
	};

	const handleChange = ({ target: { value } }) => setEmail(value);

	return (
		<Grid className={classes.container} spacing={3} container>
			<Grid className={classes.item} item xs={12} sm={12}>
				<Typography variant='subtitle1'>
					Please enter your email address for a password reset link
				</Typography>
			</Grid>
			<Grid className={classes.item} item xs={12} sm={12}>
				<form onSubmit={handleSubmit}>
					<span className={classes.text}>
						<TextField
							aria-label='Email field'
							variant='outlined'
							label='Email'
							id='email-field'
							name='email'
							value={email}
							onChange={handleChange}
						/>
					</span>
					<span className={classes.buttonContainer}>
						<Button type='submit' variant='contained' color='secondary'>
							Submit
						</Button>
					</span>
				</form>
			</Grid>
		</Grid>
	);
}

export default PasswordSendEmail;
