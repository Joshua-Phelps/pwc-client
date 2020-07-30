import React, { useState, useEffect } from 'react';
import VenueFormHeader from './VenueFormHeader';
import { states } from '../utils/index';
import { TextField, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	container: {
		padding: theme.spacing(4),
	},
	item: {
		width: '100%',
		textAlign: 'center',
	},
	input: {
		display: 'inline-block',
		padding: theme.spacing(1),
	},
}));

export default function PermissionsForm() {
	const classes = useStyles();
	const [email, setEmail] = useState('');

	const handleChange = ({ target: { value } }) => {
		setEmail(value);
	};

	return (
		<>
			<VenueFormHeader venueType={'Permissions'} />
			<form>
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
					</Grid>

					<Grid className={classes.item} item xs={12} sm={12}>
						<div className={classes.input}>
							<Button color='secondary' variant='contained'>
								Submit
							</Button>
						</div>
					</Grid>
				</Grid>
			</form>
		</>
	);
}
