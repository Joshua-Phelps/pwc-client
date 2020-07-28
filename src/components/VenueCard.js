import React from 'react';
import { Box, Button, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles(theme => ({
	box: {
		background: theme.palette.secondary.grey.light,
		padding: theme.spacing(2),
		paddingTop: theme.spacing(0),
		margin: theme.spacing(2),
	},
	button: {
		textAlign: 'center',
	},
	details: {
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(2),
	},
	icon: {
		color: theme.palette.info.main,
	},
	container: {
		padding: theme.spacing(2),
	},
	gridSpacing: {
		paddingBottom: theme.spacing(2),
	},
	title: {
		paddingBottom: theme.spacing(2),
	},
}));

export default function VenueCard({
	venue: { name, phone_number, email, address },
	history,
	pushPath,
	buttonText,
	totalPaintings,
}) {
	const classes = useStyles();

	const handleClick = () => {
		history.push(pushPath);
	};

	return (
		<>
			<Box className={classes.box} borderRadius='borderRadius' border={1}>
				<Grid className={classes.container} container>
					<Grid className={classes.title} item sm={12} xs={12}>
						<Typography align='center' variant='h6'>
							{name} {totalPaintings ? `- (${totalPaintings} paintings)` : null}
						</Typography>
					</Grid>

					<Grid className={classes.gridSpacing} item xs={1} sm={1}>
						<PhoneIcon className={classes.icon} />{' '}
					</Grid>
					<Grid className={classes.details} item xs={11} sm={11}>
						<Typography variant='body1'>{phone_number}</Typography>
					</Grid>

					<Grid className={classes.gridSpacing} item xs={1} sm={1}>
						<EmailIcon className={classes.icon} />{' '}
					</Grid>
					<Grid className={classes.details} item xs={11} sm={11}>
						<Typography variant='body1'>{email}</Typography>
					</Grid>

					<Grid className={classes.gridSpacing} item xs={1} sm={1}>
						<HomeIcon className={classes.icon} />{' '}
					</Grid>
					<Grid className={classes.details} item xs={11} sm={11}>
						<Typography variant='body1'>
							{address.street_address} <br></br>
							{address.city}, {address.state} {address.zip}
						</Typography>
					</Grid>

					<Grid className={classes.button} item xs={12} sm={12}>
						<Button onClick={handleClick} color='secondary' variant='contained'>
							{buttonText}
						</Button>
					</Grid>
				</Grid>
			</Box>
		</>
	);
}
