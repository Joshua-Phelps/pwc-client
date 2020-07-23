import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { StateContext } from '../App';

const useStyles = makeStyles(theme => ({
	detailsList: {
		padding: theme.spacing(1),
	},
}));

export default function DetailsTabPanel() {
	const classes = useStyles();
	const { animal } = useContext(StateContext);
	const {
		id,
		name,
		description,
		gender,
		animal_type,
		external_id,
		paintings,
		photo_status,
	} = animal;

	return (
		<Typography className={classes.detailsList} align='left' variant='body1'>
			<b>ID:</b> {id}
			<br></br>
			<b>Name:</b> {name}
			<br></br>
			<b>Description:</b> {description}
			<br></br>
			<b>Gender:</b> {gender}
			<br></br>
			<b>Type:</b> {animal_type}
			<br></br>
			<b>External ID:</b> {external_id}
			<br></br>
			<b>Total Paintings:</b> {paintings.length}
			<br></br>
			<b>Photo Status:</b> {photo_status}
		</Typography>
	);
}
