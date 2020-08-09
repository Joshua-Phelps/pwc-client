import React from 'react';
import {
	Grid,
	Typography,
	Divider,
	Button,
	makeStyles,
} from '@material-ui/core';
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
	},
	icon: {
		color: theme.palette.info.main,
	},
	iconSpacing: {
		paddingRight: theme.spacing(1),
	},
	buttons: {
		padding: theme.spacing(1),
		textAlign: 'center',
	},
}));

export default function VenueHeader({
	btnText,
	handleButton,
	name,
	address,
	email,
	phone_number,
}) {
	const classes = useStyles();

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
							onClick={handleButton}>
							{btnText}
						</Button>
					</div>
				</Grid>
			</Grid>
			<Divider className={classes.divider} />
		</>
	);
}
