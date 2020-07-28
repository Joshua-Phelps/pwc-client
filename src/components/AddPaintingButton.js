import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button } from '@material-ui/core';
import { StateContext } from '../App';

const useStyles = makeStyles(theme => ({
	paintingHeader: {
		textAlign: 'center',
	},

	addPaintButton: {
		padding: theme.spacing(2),
	},
	dividerSpacing: {
		paddingTop: theme.spacing(4),
	},
}));

export default function AddPaintingButton({
	handleOpenBlankForm,
	handleOpenForm,
}) {
	const classes = useStyles();

	return (
		<Button
			className={classes.button}
			variant='contained'
			type='button'
			onClick={() => handleOpenBlankForm(handleOpenForm)}>
			Add Painting
		</Button>
	);
}
