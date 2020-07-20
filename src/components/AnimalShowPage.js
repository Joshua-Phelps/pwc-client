import React, { useState, useEffect, useContext, useReducer } from 'react';
import { api } from '../services/api';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Button, Typography, Divider } from '@material-ui/core';
import PaintingForm from './PaintingForm';
import PaintingsTable from './PaintingsTable';
import AnimalShowTabs from './AnimalShowTabs';
import { StateContext, DispatchContext } from '../App';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	imageContainer: {
		padding: theme.spacing(3),
		textAlign: 'center',
		// color: theme.palette.text.secondary,
	},
	box: {
		padding: theme.spacing(2),
		paddingTop: theme.spacing(3),
	},
	image: {
		width: '100%',
		height: '100%',
		marginBottom: '-5px',
	},
	button: {
		padding: theme.spacing(2),
		marginTop: theme.spacing(2),
	},
	tabs: {
		padding: theme.spacing(3),
	},
	paintingHeader: {
		textAlign: 'center',
	},
	addPaintButton: {
		padding: theme.spacing(2),
	},
	divider: {
		border: `1px solid`,
	},
	dividerSpacing: {
		paddingTop: theme.spacing(4),
	},
}));

export default function AnimalShowPage({ history, location }) {
	const classes = useStyles();
	const { galleries, selectAnimal } = useContext(StateContext);
	const { selectAnimalDispatch } = useContext(DispatchContext);
	const animal = selectAnimal;
	const [paintingId, setPaintingId] = useState(null);
	const [openForm, setOpenForm] = useState(false);
	const [showPhotos, setShowPhotos] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const id = parseInt(location.pathname.split('/animals/')[1]);

	useEffect(() => {
		api.animals
			.getAnimalById(id)
			.then(ani => {
				selectAnimalDispatch({
					type: 'SET_ANIMAL',
					payload: ani,
				});
			})
			.then(() => setLoaded(true))
			.catch(err => console.log(err));
	}, [loaded, location.pathname]);

	const handleGenerateCard = () => {
		api.cards
			.generateCard(id)
			.then(card => console.log(card))
			.catch(err => console.log(err));
	};

	const currentGalleries = () => {
		let result = [];
		for (let i = 0; i < animal.paintings.length; i++) {
			if (animal.paintings[i].gallery_id) {
				let foundGallery = galleries.find(
					g => g.id === animal.paintings[i].gallery_id
				);
				if (foundGallery) {
					result.push({
						paintingId: animal.paintings[i].id,
						name: foundGallery.name,
						card_stock: '#',
					});
				}
			}
		}
		return result;
		// return animal.paintings.map(p => {
		// 	if (p.gallery_id) {
		// 		// p.card_stock
		// 		let foundGallery = galleries.find(g => g.id === p.gallery_id);
		// 		if (foundGallery) {
		// 			return { name: foundGallery.name, card_stock: 'placement #' };
		// 		} else {
		// 			return { name: '', card_stock: '' };
		// 		}
		// 	}
		// });
	};

	const handleOpenForm = () => setOpenForm(!openForm);

	const renderPaintingsList = () => {
		return animal.paintings.map(paint => {
			return (
				<ul>
					{paint.id} - {paint.painter} - {paint.painting_status}
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
					{/* <div className={classes.button}>
						<Button
							onClick={handleGenerateCard}
							variant='contained'
							color='secondary'>
							Generate Card
						</Button>
					</div> */}
					<div className={classes.root}>
						<Grid container>
							<Grid className={classes.imageContainer} item xs={12} sm={3}>
								<Box borderRadius='borderRadius' border={2}>
									<div className={classes.imageContainer}>
										<Typography>
											<h1>{animal.name}</h1>
										</Typography>
									</div>

									<img
										className={classes.image}
										src={animal.photos[3].url}></img>
								</Box>
							</Grid>

							<Grid item xs={12} sm={8}>
								<div className={classes.tabs}>
									<Box borderRadius='borderRadius' border={1}>
										<AnimalShowTabs
											animal={animal}
											galleries={currentGalleries}
										/>
									</Box>
								</div>
							</Grid>
						</Grid>
					</div>
					<div className={(classes.root, classes.box)}>
						<Divider variant='fullWidth' className={classes.divider} />

						<Grid container className={classes.dividerSpacing}>
							<Grid item xs={0} sm={2}></Grid>
							<Grid item xs={12} sm={2}>
								<div classname={classes.addPaintButton}>
									<Button
										variant='contained'
										type='button'
										onClick={handleOpenForm}>
										Add Painting
									</Button>
								</div>
							</Grid>
							<Grid item xs={12} sm={4}>
								<div className={classes.paintingHeader}>
									<h3>Current Paintings</h3>
								</div>
							</Grid>
							<Grid item xs={0} sm={4}></Grid>
						</Grid>
						<PaintingsTable
							paintings={animal.paintings}
							setPaintingId={setPaintingId}
							setOpenForm={setOpenForm}
							openForm={openForm}
						/>
					</div>
					<div>
						<div>
							<PaintingForm
								paintingId={paintingId}
								setPaintingId={setPaintingId}
								animalId={id}
								animalName={animal.name}
								open={openForm}
								setOpen={setOpenForm}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
