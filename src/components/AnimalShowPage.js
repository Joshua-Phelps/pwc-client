import React, { useState, useEffect, useContext, useReducer } from 'react';
import { api } from '../services/api';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Button, Typography, Divider } from '@material-ui/core';
import PaintingForm from './PaintingForm';
import PaintingsTable from './PaintingsTable';
import PaintingsTableHeader from './PaintingsTableHeader';
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
	},
	tabs: {
		padding: theme.spacing(3),
	},
	divider: {
		borderTop: `1px solid`,
	},
}));

export default function AnimalShowPage({ history, location }) {
	const classes = useStyles();
	const { animal } = useContext(StateContext);
	const { animalDispatch } = useContext(DispatchContext);
	const [paintingId, setPaintingId] = useState(null);
	const [openForm, setOpenForm] = useState(false);
	const [showPhotos, setShowPhotos] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const id = parseInt(location.pathname.split('/animals/')[1]);

	useEffect(() => {
		api.animals
			.getAnimalById(id)
			.then(ani => {
				if (ani.error) {
					return history.push('/not-found');
				} else {
					return animalDispatch({
						type: 'SET_ANIMAL',
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
		setOpenForm(!openForm);
	};

	const handleOpenBlankForm = cb => {
		setPaintingId(false);
		cb();
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

						<Divider variant='fullWidth' className={classes.divider} />

						<Grid container className={classes.dividerSpacing}>
							<Grid item xs={false} sm={1} className='large-view'></Grid>
							<Grid item xs={12} sm={10}>
								<div className={classes.tabs}>
									<AnimalInfoDisplay />
								</div>
							</Grid>
							<Grid item xs={false} sm={1} className='large-view'></Grid>
						</Grid>

						<Divider variant='fullWidth' className={classes.divider} />

						<PaintingsTableHeader
							handleOpenBlankForm={handleOpenBlankForm}
							handleOpenForm={handleOpenForm}
						/>

						<PaintingsTable
							paintings={animal.paintings}
							setPaintingId={setPaintingId}
							setOpenForm={setOpenForm}
							openForm={openForm}
						/>
					</div>

					<PaintingForm
						paintingId={paintingId}
						setPaintingId={setPaintingId}
						updateAnimal={true}
						animalId={id}
						animalName={animal.name}
						open={openForm}
						setOpen={setOpenForm}
					/>
				</div>
			)}
		</>
	);
}
