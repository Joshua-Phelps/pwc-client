import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	box: {
		padding: theme.spacing(2),
		paddingTop: theme.spacing(0),
		margin: theme.spacing(2),
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
		<div onClick={handleClick}>
			<Box className={classes.box} borderRadius='borderRadius' border={1}>
				<h3>{name}</h3>
				<p> Address: {address}</p>
				<p> Phone Number: {phone_number}</p>
				<p> Email: {email}</p>
				<button>Visit Gallery</button>
			</Box>
		</div>
	);
}
