import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext, MessageContext } from '../App';
import { api } from '../services/api';
import PaintingCard from './PaintingCard';
import VenueHeader from './VenueHeader';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

export default function GalleryShowPage({ location }) {
	const classes = useStyles();
	const { gallery } = useContext(StateContext);
	const { galleryDispatch } = useContext(DispatchContext);
	const { errorMessage } = useContext(MessageContext);
	const [loaded, setLoaded] = useState(false);
	const id = parseInt(location.pathname.split('/galleries/')[1]);
	const {
		name,
		address,
		email,
		phone_number,
		paintings,
		max_paintings,
	} = gallery;

	useEffect(() => {
		console.log('using effect in gallery show');
		api.galleries
			.getGalleryById(id)
			.then(res => {
				if (res.error) {
					return errorMessage();
				} else {
					galleryDispatch({
						type: 'SET',
						payload: { ...res },
					});
					return true;
				}
			})
			.then(cont => cont && setLoaded(true))
			.catch(err => console.log(err));
	}, [id, galleryDispatch, errorMessage]);

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
							{/* <Button
								variant='contained'
								color='secondary'
								onClick={handleAddPainting}>
								Add Painting
							</Button> */}
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
