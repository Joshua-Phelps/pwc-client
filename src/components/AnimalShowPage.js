import React, { useState, useEffect, useContext, useReducer } from 'react';
import { api } from '../services/api';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Button } from '@material-ui/core';
import PaintingForm from './PaintingForm';
import PaintingsTable from './PaintingsTable';
import { StateContext, DispatchContext } from '../App';

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
	button: {
		padding: theme.spacing(2),
		marginTop: theme.spacing(2),
	},
}));

export default function AnimalShowPage({ history, location }) {
	const classes = useStyles();
	const { galleries, selectAnimal } = useContext(StateContext);
	const { selectAnimalDispatch } = useContext(DispatchContext);
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

	const handleOpenForm = () => setOpenForm(!openForm);

	const renderPaintingsList = () => {
		return selectAnimal.paintings.map(paint => {
			return (
				<ul>
					{paint.id} - {paint.painter} - {paint.painting_status}
				</ul>
			);
		});
	};

	const renderPhotos = () => {
		return selectAnimal.photos.map(photo => {
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
					<div className={classes.button}>
						<Button
							onClick={handleGenerateCard}
							variant='contained'
							color='secondary'>
							Generate Card
						</Button>
					</div>
					<div className={classes.centered}>
						<h1>Hello!</h1>
						<h1>My name is {selectAnimal.name}</h1>
					</div>
					<div className={classes.root}>
						<Grid container>
							<Grid className={classes.paper} item xs={12} sm={4}>
								<img
									className={classes.image}
									src={selectAnimal.photos[3].url}></img>
							</Grid>
							<Grid className={classes.box} item xs={12} sm={6}>
								<h3>Description</h3>
								<p>{selectAnimal.description}</p>
								<Grid container>
									<Grid xs={12} sm={7}>
										<Box
											className={classes.box}
											borderRadius='borderRadius'
											border={1}>
											<h3>Shelter</h3>
											<p>{selectAnimal.shelter.name}</p>
											<p>{selectAnimal.shelter.phone_number}</p>
											<p>{selectAnimal.shelter.address}</p>
											<p>Email goes here</p>
										</Box>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</div>
					<div className={(classes.root, classes.box)}>
						<h3>Current Paintings</h3>
						<PaintingsTable
							paintings={selectAnimal.paintings}
							setPaintingId={setPaintingId}
							setOpenForm={setOpenForm}
							openForm={openForm}
						/>
					</div>
					<div>
						<div className={classes.box}>
							<button type='button' onClick={handleOpenForm}>
								Add Painting
							</button>
							<PaintingForm
								paintingId={paintingId}
								setPaintingId={setPaintingId}
								animalId={id}
								animalName={selectAnimal.name}
								open={openForm}
								setOpen={setOpenForm}
							/>
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
