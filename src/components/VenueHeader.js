import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../App';
import { api } from '../services/api';
import PaintingForm from './PaintingForm';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider, Button } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles(theme => ({
	heading: {
		padding: theme.spacing(2),
		textAlign: 'center',
	},
	detailsDisplay: {
		padding: theme.spacing(1),
		// textAlign: 'center',
	},
	icon: {
		color: theme.palette.info.main,
	},
	iconSpacing: {
		paddingRight: theme.spacing(1),
		// textAlign: 'center',
	},
	buttons: {
		padding: theme.spacing(1),
		textAlign: 'center',
	},
}));

export default function VenueHeader({
	history,
	name,
	address,
	email,
	phone_number,
}) {
	const classes = useStyles();

	const handleUpdate = id => {
		// add edit form
		// history.push(pushPath);
	};

	const handleDelete = () => {
		// api.galleries.
	};

	return (
		<>
			<Grid container>
				<Grid item xs={12} sm={12}>
					<Typography className={classes.heading} variant='h3'>
						{name}
					</Typography>
				</Grid>

				<Grid item sm={1} xs={false}></Grid>

				<Grid className={classes.detailsDisplay} item xs={12} sm={3}>
					<Grid className={classes.detailsDisplay} container>
						<Grid className={classes.iconSpacing} item xs={1} sm={2}>
							<PhoneIcon className={classes.icon} />
						</Grid>
						<Grid item xs={11} sm={10}>
							<Typography variant='body1'>{phone_number}</Typography>
						</Grid>

						<Grid className={classes.iconSpacing} item xs={1} sm={2}>
							<EmailIcon className={classes.icon} />
						</Grid>
						<Grid item xs={11} sm={10}>
							<Typography variant='body1'>{email}</Typography>
						</Grid>

						<Grid className={classes.iconSpacing} item xs={1} sm={2}>
							<HomeIcon className={classes.icon} />
						</Grid>
						<Grid item xs={11} sm={10}>
							<Typography variant='body1'>
								{address.street_address} <br></br>
								{address.city}, {address.state} {address.zip}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item sm={6} xs={false}></Grid>
				<Grid item sm={2} xs={12}>
					<div className={classes.buttons}>
						<Button
							variant='contained'
							color='secondary'
							onCLick={handleUpdate}>
							Update Gallery
						</Button>
					</div>
					<div className={classes.buttons}>
						<Button
							variant='contained'
							color='secondary'
							onClick={handleDelete}>
							Delete Gallery
						</Button>
					</div>
				</Grid>
			</Grid>
			<Divider className={classes.divider} />
		</>
	);
}
