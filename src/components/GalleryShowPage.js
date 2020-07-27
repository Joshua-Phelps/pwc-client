import React, { useState, useEffect, useContext, useReducer } from 'react';
import { StateContext, DispatchContext } from '../App';
import { api } from '../services/api';
import PaintingCard from './PaintingCard';
import { Grid, Typography, Divider } from '@material-ui/core';
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
	const { galleryDispatch } = useContext(DispatchContext);
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
					type: 'SET_GALLERY',
					payload: { ...gallery },
				});
			})
			.catch(err => console.log(err));
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
					<Grid container>
						<Grid item xs={12} sm={12}>
							<Typography className={classes.heading} variant='h1'>
								{name}
							</Typography>
						</Grid>
						<Grid item sm={2} xs={false}></Grid>
						<Grid className={classes.detailsDisplay} item xs={12} sm={10}>
							<Typography variant='subtitle1'>
								<PhoneIcon />{' '}
								<span className={classes.icon}>{phone_number}</span>
								<br></br>
								<EmailIcon /> <span className={classes.icon}>{email}</span>
								<br></br>
								<HomeIcon /> <span className={classes.icon}>{address}</span>
								<br></br>
							</Typography>
						</Grid>
					</Grid>
					<Divider className={classes.divider} />
					<div className={classes.paintingsDisplay}>
						{paintings.length > 0 ? (
							<>
								<Typography align='center' variant='h6'>
									Current Paintings - {paintings.length}/{max_paintings}
								</Typography>
								<Grid className={classes.container} container spacing={3}>
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
