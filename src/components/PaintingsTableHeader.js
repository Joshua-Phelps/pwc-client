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

export default function PaintingsTableHeader({
	handleOpenBlankForm,
	handleOpenForm,
}) {
	const classes = useStyles();

	return (
		<Grid container className={classes.dividerSpacing}>
			<Grid item xs={false} sm={2} className='large-view'></Grid>
			<Grid item xs={12} sm={2}>
				<div className={classes.addPaintButton}>
					<Button
						variant='contained'
						type='button'
						onClick={() => handleOpenBlankForm(handleOpenForm)}>
						Add Painting
					</Button>
				</div>
			</Grid>
			<Grid item xs={12} sm={4}>
				<div className={classes.paintingHeader}>
					<h3>Current Paintings</h3>
				</div>
			</Grid>
			<Grid item xs={false} sm={4} className='large-view'></Grid>
		</Grid>
	);
}
