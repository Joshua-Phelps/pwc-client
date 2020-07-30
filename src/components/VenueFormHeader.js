import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	heading: {
		textAlign: 'center',
	},
}));

export default function VenueFormHeader({ venueType, editMode }) {
	const classes = useStyles();

	return (
		<div className={classes.heading}>
			<Typography variant='h3'>
				{editMode ? 'Edit' : 'Add'} {venueType}
			</Typography>
		</div>
	);
}
