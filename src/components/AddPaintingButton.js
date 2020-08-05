import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

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
