import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';
import PaintingForm from './PaintingForm';

const useStyles = makeStyles(theme => ({
	centered: {
		textAlign: 'center',
	},
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		// color: theme.palette.text.secondary,
	},
	box: {
		padding: theme.spacing(2),
		paddingTop: theme.spacing(0),
	},
	image: {
		maxWidth: '-webkit-fill-available',
	},
}));

export default function AnimalShowPage({ history, location }) {
	const classes = useStyles();
	const [animal, setAnimal] = useState({});
	const [showPhotos, setShowPhotos] = useState(false);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		let id = parseInt(location.pathname.split('/animals/')[1]);
		api.animals
			.getAnimalById(id)
			.then(ani => setAnimal(ani))
			.then(() => setLoaded(true))
			.catch(err => console.log(err));
	}, [loaded, location.pathname]);

	const renderPaintingsList = () => {
		return animal.paintings.map(paint => {
			return (
				<ul>
					{paint.id} - {paint.painter} - {paint.status}
				</ul>
			);
		});
	};

	const renderPhotos = () => {
		return animal.photos.map(photo => {
			return (
				<div key={photo.url}>
					<img src={photo.url}></img>
				</div>
			);
		});
	};

	return (
		<>
			{loaded && (
				<div>
					<h1 className={classes.centered}>{animal.name}</h1>
					<div className={classes.root}>
						<Grid container>
							<Grid className={classes.paper} item xs={12} sm={4}>
								<img className={classes.image} src={animal.photos[3].url}></img>
							</Grid>
							<Grid className={classes.box} item xs={12} sm={6}>
								<h3>Description</h3>
								<p>{animal.description}</p>
								<Grid container>
									<Grid xs={12} sm={7}>
										<Box
											className={classes.box}
											borderRadius='borderRadius'
											border={1}>
											<h3>Shelter</h3>
											<p>{animal.shelter.name}</p>
											<p>{animal.shelter.phone_number}</p>
											<p>{animal.shelter.address}</p>
											<p>Email goes here</p>
										</Box>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</div>
					<div className={(classes.root, classes.box)}>
						<h3>Current Paintings</h3>
					</div>
					<div>
						<div className={classes.box}>
							<PaintingForm paintingId={null} location={location} />
						</div>
					</div>
					{/* <div>
						<h3 onClick={handleShowPhotos}>View Photos</h3>
						{showPhotos && renderPhotos()}
					</div> */}
				</div>
			)}
		</>
	);
}
