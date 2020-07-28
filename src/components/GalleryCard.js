import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
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
	center: {
		textAlign: 'center',
	},
	details: {
		paddingLeft: theme.spacing(1),
	},
	icon: {
		color: theme.palette.info.main,
	},
}));

export default function GalleryCard({
	gallery: { name, address, id, phone_number, email, max_paintings, paintings },
	history,
}) {
	const classes = useStyles();

	const handleClick = () => {
		history.push(`/galleries/${id}`);
	};

	return (
		<>
			<Box className={classes.box} borderRadius='borderRadius' border={1}>
				<Typography align='center' variant='h6'>
					{name}
				</Typography>
				<p>
					<PhoneIcon className={classes.icon} />{' '}
					<span className={classes.details}>{phone_number}</span>
				</p>
				<p>
					{' '}
					<EmailIcon className={classes.icon} />{' '}
					<span className={classes.details}>{email}</span>
				</p>
				<p>
					{' '}
					<HomeIcon className={classes.icon} />{' '}
					<span className={classes.details}>{address}</span>
				</p>
				<div className={classes.center}>
					<Button onClick={handleClick} color='secondary' variant='contained'>
						Visit Gallery
					</Button>
				</div>
			</Box>
		</>
	);
}
