import React, { useContext } from 'react';
import { StateContext } from '../App';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles(theme => ({
	center: {
		textAlign: 'center',
	},
}));

export default function Detailanel() {
	const classes = useStyles();
	const { animal } = useContext(StateContext);
	const { shelter } = animal;

	return (
		<>
			<div className={classes.center}>
				<h3>{shelter.name}</h3>
			</div>

			<Grid className={classes.center} container>
				<Grid item xs={12} sm={12} md={4}>
					<div>
						<PhoneIcon />
					</div>
					{shelter.phone_number}
				</Grid>

				<Grid item xs={12} sm={12} md={4}>
					<div>
						<HomeIcon />
					</div>
					{shelter.address}
				</Grid>

				<Grid item xs={12} sm={12} md={4}>
					<div>
						<EmailIcon />
					</div>
					{shelter.email}
				</Grid>
			</Grid>
		</>
	);
}
