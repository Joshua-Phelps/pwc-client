import React from 'react';
import { makeStyles, Typography, Button, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	galleries: {
		borderRight: `1px solid`,
	},
	galleriesContainer: {
		padding: theme.spacing(1),
	},
	button: {
		padding: theme.spacing(1),
	},
}));

function TabPanelDisplayedPaintings({ gallery }) {
	const classes = useStyles();
	return (
		<div>
			<Box borderRadius='borderRadius' border={1}>
				<Typography className={classes.galleriesContainer}>
					<span className={classes.galleries}>{gallery.name} </span>
					<span className={classes.galleriesContainer}>
						Card Stock:{` `} {gallery.card_stock}
					</span>
				</Typography>
				<div className={classes.button}>
					<Button variant='contained'>Update</Button>
				</div>
			</Box>
			<br></br>
		</div>
	);
}

export default TabPanelDisplayedPaintings;
