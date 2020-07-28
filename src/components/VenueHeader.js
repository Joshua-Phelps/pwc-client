import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../App';
import { api } from '../services/api';
import PaintingForm from './PaintingForm';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles(theme => ({
	container: {
		width: '100%',
		margin: 0,
	},
	heading: {
		padding: theme.spacing(2),
	},
	detailsDisplay: {
		padding: theme.spacing(1),
	},
	icon: {
		color: theme.palette.info.main,
	},
	paintingsDisplay: {
		paddingTop: theme.spacing(3),
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

	const handleEdit = id => {
		// add edit form
		// history.push(pushPath);
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

				<Grid className={classes.detailsDisplay} item xs={12} sm={11}>
					<Grid alignItems='center' spacing={1} container>
						<Grid item xs={1} sm={1}>
							<PhoneIcon className={classes.icon} />
						</Grid>
						<Grid item xs={11} sm={11}>
							<Typography variant='body1'>{phone_number}</Typography>
						</Grid>

						<Grid item xs={1} sm={1}>
							<EmailIcon className={classes.icon} />
						</Grid>
						<Grid item xs={11} sm={11}>
							<Typography variant='body1'>{email}</Typography>
						</Grid>

						<Grid item xs={1} sm={1}>
							<HomeIcon className={classes.icon} />
						</Grid>
						<Grid item xs={11} sm={11}>
							<Typography variant='body1'>
								{address.street_address} <br></br>
								{address.city}, {address.state} {address.zip}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Divider className={classes.divider} />
		</>
	);
}
