import React, { useState, useEffect, useContext, useReducer } from 'react';
import clsx from 'clsx';
import { api } from '../services/api';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Button, Typography, Divider } from '@material-ui/core';
import PaintingForm from './PaintingForm';
import PaintingsTable from './PaintingsTable';
import AddPaintingButton from './AddPaintingButton';
import AnimalInfoDisplay from './AnimalInfoDisplay';
import AnimalHeading from './AnimalHeading';
import { StateContext, DispatchContext } from '../App';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	button: {
		padding: theme.spacing(2),
		marginTop: theme.spacing(2),
		display: 'inline-block',
	},
	gridContainer: {
		paddingBottom: theme.spacing(4),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
	},
	addButtonContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: theme.spacing(4),
	},
	formSmall: {
		height: '10px',
	},
}));

export default function AnimalShowPage({ history, location }) {
	const classes = useStyles();
	const { animal } = useContext(StateContext);
	const { animalDispatch, paintFormPropsDispatch } = useContext(
		DispatchContext
	);
	// const [paintingId, setPaintingId] = useState(null);
	// const [openForm, setOpenForm] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const id = parseInt(location.pathname.split('/animals/')[1]);

	useEffect(() => {
		api.animals
			.getAnimalById(id)
			.then(ani => {
				console.log(ani);
				if (ani.error) {
					return history.push('/not-found');
				} else {
					return animalDispatch({
						type: 'SET',
						payload: ani,
					});
				}
			})
			.then(() => {
				setLoaded(true);
			})
			.catch(err => console.log(err));
	}, [loaded, location.pathname]);

	const handleGenerateCard = () => {
		api.cards
			.generateCard(id)
			.then(card => console.log(card))
			.catch(err => console.log(err));
	};

	const handleOpenForm = () => {
		paintFormPropsDispatch({
			type: 'SET',
			payload: {
				updateAnimal: true,
				animalId: id,
				animalName: animal.name,
				open: true,
			},
		});
	};

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
						<AnimalHeading />

						<Grid container className={classes.gridContainer}>
							<Grid item xs={false} sm={1} className='large-view'></Grid>
							<Grid item xs={12} sm={10}>
								<AnimalInfoDisplay />
							</Grid>
						</Grid>

						<Grid container className={classes.gridContainer}>
							<Grid item xs={false} sm={1} className='large-view'></Grid>
							<Grid item xs={12} sm={10}>
								<PaintingsTable />
							</Grid>
						</Grid>

						<Grid container>
							<Grid item xs={false} sm={9} className='large-view'></Grid>
							<div className={classes.addButtonContainer}>
								<Button
									color='secondary'
									variant='contained'
									type='button'
									onClick={handleOpenForm}>
									Add Painting
								</Button>
							</div>
							<Grid item xs={12} sm={3}></Grid>
						</Grid>
					</div>
				</div>
			)}
		</>
	);
}
