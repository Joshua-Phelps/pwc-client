import React, { useContext } from 'react';
import { makeStyles, Typography, Button, Box } from '@material-ui/core';
import { StateContext } from '../App';

const useStyles = makeStyles(theme => ({
	galleries: {
		borderRight: `1px solid`,
	},
	galleriesContainer: {
		padding: theme.spacing(1),
	},
	button: {
		padding: theme.spacing(1),
		textAlign: 'center',
	},
	imageContainer: {
		textAlign: 'center',
		overflow: 'auto',
	},
	image: {
		width: '300px',
	},
}));

function TabPanelDisplayedPaintings({ galleryName, painting }) {
	const classes = useStyles();
	const { animal } = useContext(StateContext);

	return (
		<div>
			<Box borderRadius='borderRadius' border={1}>
				<Typography className={classes.galleriesContainer}>
					<span className={classes.galleries}>{galleryName} </span>
					<span className={classes.galleriesContainer}>
						Card Stock:{` `} {painting.card_stock}
					</span>
				</Typography>
				<div className={classes.imageContainer}>
					<img
						className={classes.image}
						alt='painting'
						src={painting.visible_url}
					/>
				</div>
				<div className={classes.button}>
					<Button variant='contained' color='secondary'>
						Update
					</Button>
				</div>
			</Box>
			<br></br>
		</div>
	);
}

export default TabPanelDisplayedPaintings;
