import React, { useState, useContext } from 'react';
import { SetStateContext, DispatchContext } from '../App';
import { api } from '../services/api';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
	CssBaseline,
	Paper,
	TextField,
	Link,
	Grid,
	Typography,
	makeStyles,
	Avatar,
	Button,
} from '@material-ui/core';

const initialState = {
	username: '',
	email: '',
	password: '',
	retypePassword: '',
};

export default function SignUp(props) {
	const { dialogDispatch } = useContext(DispatchContext);
	const [state, setState] = useState(initialState);
	const classes = useStyles();

	const handleChange = ({ target: { name, value } }) => {
		setState(prevState => {
			return { ...prevState, [name]: value };
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (state.password !== state.retypePassword)
			return alert('Your passwords do not match');
		api.auth.signup(state).then(res => {
			if (res.error) {
				// set Dialog failure message
			} else {
				// set Dialod success message
				props.history.push('/login');
			}
		});
	};

	return (
		<Grid container component='main' className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className='login-image' />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign up
					</Typography>
					<form className={classes.form} onSubmit={handleSubmit} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									variant='outlined'
									required
									fullWidth
									id='email'
									label='Email'
									name='email'
									value={state.email}
									autoComplete='email'
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant='outlined'
									required
									fullWidth
									id='username'
									label='Username'
									name='username'
									value={state.username}
									autoComplete='username'
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant='outlined'
									required
									fullWidth
									name='password'
									value={state.password}
									label='Password'
									type='password'
									id='password'
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant='outlined'
									required
									fullWidth
									value={state.retypePassword}
									name='retypePassword'
									label='Confirm Password'
									type='password'
									id='retype-password'
									onChange={handleChange}
								/>
							</Grid>
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}>
							Sign Up
						</Button>
						<Grid container justify='flex-end'>
							<Grid item>
								<Link href='/login'>{'Already have an account? Sign in'}</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Grid>
		</Grid>
	);
}

const useStyles = makeStyles(theme => ({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: 'white',
		padding: theme.spacing(8),
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	root: {
		height: '100vh',
	},
}));
