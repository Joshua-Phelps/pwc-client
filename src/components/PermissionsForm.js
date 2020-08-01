import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import VenueFormHeader from './VenueFormHeader';
import { states } from '../utils/index';
import { TextField, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	container: {
		padding: theme.spacing(4),
	},
	item: {
		textAlign: 'center',
	},
	input: {
		verticalAlign: 'middle',
		display: 'inline-block',
		padding: theme.spacing(1),
	},
}));

export default function PermissionsForm({ isAdd }) {
	const classes = useStyles();
	const [email, setEmail] = useState('');

	const handleChange = ({ target: { value } }) => {
		setEmail(value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		api.auth
			.updatePermissions(email, isAdd)
			.then(res => {
				console.log(res);
			})
			.catch(err => console.log(err));
	};

	return (
		<>
			<VenueFormHeader
				headerText={isAdd ? 'Add Permissions' : 'Remove Permissions'}
			/>
			<form onSubmit={handleSubmit}>
				<Grid className={classes.container} spacing={2} container>
					<Grid className={classes.item} item xs={12} sm={12}>
						<div className={classes.input}>
							<TextField
								aria-label='email text field'
								variant='outlined'
								label='Email'
								id='email-field'
								name='email'
								value={email}
								onChange={handleChange}
							/>
						</div>

						<div className={classes.input}>
							<Button type='submit' color='secondary' variant='contained'>
								Submit
							</Button>
						</div>
					</Grid>
				</Grid>
			</form>
		</>
	);
}
