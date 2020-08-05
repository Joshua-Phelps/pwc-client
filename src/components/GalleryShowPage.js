import React, { useState, useEffect, useContext, useReducer } from 'react';
import { StateContext, DispatchContext } from '../App';
import { api } from '../services/api';
import PaintingCard from './PaintingCard';
import VenueHeader from './VenueHeader';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles(theme => ({
	container: {
		width: '100%',
		margin: 0,
	},
	heading: {
		padding: theme.spacing(2),
	},
	detailsDisplay: {
		padding: theme.spacing(1),
	},
	icon: {
		paddingLeft: theme.spacing(1),
	},
	paintingsDisplay: {
		paddingTop: theme.spacing(3),
	},
	buttonContainer: {
		paddingLeft: theme.spacing(2),
	},
}));

const initialState = {
	id: null,
	address: '',
	name: '',
	max_paintings: null,
	current_paintings: [],
};

export default function GalleryShowPage({ history, location }) {
	const classes = useStyles();
	const { gallery } = useContext(StateContext);
	const { galleryDispatch, paintingFormPropsDispatch } = useContext(
		DispatchContext
	);
	const [loaded, setLoaded] = useState(false);
	const id = parseInt(location.pathname.split('/animals/')[1]);
	const {
		name,
		address,
		email,
		phone_number,
		paintings,
		max_paintings,
	} = gallery;

	useEffect(() => {
		fetchGallery().then(() => setLoaded(true));
	}, [loaded, location.pathname]);

	const fetchGallery = () => {
		let id = parseInt(location.pathname.split('/galleries/')[1]);
		return api.galleries
			.getGalleryById(id)
			.then(gallery => {
				return galleryDispatch({
					type: 'SET',
					payload: { ...gallery },
				});
			})
			.catch(err => console.log(err));
	};

	const handleAddPainting = () => {
		// paintingFormPropsDispatch({type:})
	};

	const renderPaintings = () => {
		return paintings.map(painting => {
			return (
				<Grid key={painting.id} item xs={12} sm={4}>
					<PaintingCard galleryName={name} painting={painting} />
				</Grid>
			);
		});
	};

	return (
		<>
			{loaded && (
				<>
					<VenueHeader
						address={address}
						name={name}
						email={email}
						phone_number={phone_number}
					/>
					<div className={classes.paintingsDisplay}>
						<div className={classes.buttonContainer}>
							<Button
								variant='contained'
								color='secondary'
								onClick={handleAddPainting}>
								Add Painting
							</Button>
						</div>
						{paintings.length > 0 ? (
							<>
								<Typography align='center' variant='h6'>
									Current Paintings - {paintings.length}/{max_paintings}
								</Typography>
								<Grid
									className={classes.container}
									container
									alignItems='center'
									spacing={3}>
									{renderPaintings()}
								</Grid>
							</>
						) : (
							<Typography align='center' variant='h6'>
								There are currently no paintings at this location
							</Typography>
						)}
					</div>
				</>
			)}
		</>
	);
}
