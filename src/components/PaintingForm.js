import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../App';
import { api } from '../services/api';
import { makeStyles } from '@material-ui/core/styles';
import {
	TextField,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	Modal,
	Backdrop,
	Fade,
	Button,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		display: 'flex',
	},
	button: {
		display: 'inline-block',
	},
	buttonContainer: {
		textAlign: 'center',
	},
}));

export default function PaintingForm({
	paintingId,
	animalId,
	setOpen,
	open,
	animalName,
	updateAnimal,
}) {
	const classes = useStyles();
	const [loaded, setLoaded] = useState(false);
	const { galleries, paintLocs, form } = useContext(StateContext);
	const { formDispatch, animalDispatch } = useContext(DispatchContext);

	useEffect(() => {
		if (paintingId) {
			fetchPainting()
				.then(p => {
					return formDispatch({
						type: 'SET_FORM',
						payload: p,
					});
				})
				.then(() => setLoaded(true))
				.catch(err => console.log(err));
		} else {
			clearForm();
			setLoaded(true);
		}
	}, [paintingId]);

	const fetchPainting = () => {
		return api.paintings.getPaintingById(paintingId);
	};

	const addPainting = painting => {
		animalDispatch({
			type: 'ADD_PAINTING',
			payload: painting,
		});
	};

	const updateSoloAnimalPainting = painting => {
		animalDispatch({
			type: 'UPDATE_PAINTING',
			payload: painting,
		});
	};

	const handleChange = e => {
		formDispatch({
			type: 'UPDATE_FORM',
			payload: e.target.value,
			key: e.target.name,
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		setOpen(false);
		let painting = { ...form, animal_id: animalId };
		if (form.painting_status !== 'Displayed') {
			painting = { ...painting, gallery_id: null };
		}
		if (form.id) {
			api.paintings
				.updatePainting(painting)
				.then(painting => {
					if (updateAnimal) updateSoloAnimalPainting(painting);
				})
				.catch(err => console.log(err));
		} else {
			api.paintings
				.createPainting(painting)
				.then(painting => {
					if (updateAnimal) addPainting(painting);
				})
				.then(() => clearForm())
				.catch(err => console.log(err));
		}
	};

	const clearForm = () => {
		formDispatch({ type: 'CLEAR_FORM', payload: {} });
	};

	const handleOpen = () => {
		if (form.id) clearForm();
		setOpen(true);
	};

	const handleClose = () => setOpen(false);

	const renderStatusValues = () => {
		const statusValues = [
			'Photo',
			'Outline',
			'Touch up',
			'Painted',
			'Displayed',
			'Sold',
			'Stolen',
			'Donated',
		];
		return statusValues.map(val => {
			return (
				<MenuItem key={val} value={val}>
					{val}
				</MenuItem>
			);
		});
	};

	const renderGalleryValues = () => {
		return galleries.map(gal => {
			return (
				<MenuItem key={gal.id} value={gal.id}>
					{gal.name}
				</MenuItem>
			);
		});
	};

	const renderPaintLocationValues = () => {
		return paintLocs.map(paintLoc => {
			return (
				<MenuItem key={paintLoc.id} value={paintLoc.id}>
					{paintLoc.name}
				</MenuItem>
			);
		});
	};

	return (
		<div>
			{console.log('running in form')}
			{/* <button type='button' onClick={handleOpen}>
				Add Painting
			</button> */}
			{loaded && (
				<Modal
					aria-labelledby='transition-modal-title'
					aria-describedby='transition-modal-description'
					className={classes.modal}
					open={open}
					onClose={handleClose}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500,
					}}>
					<Fade in={open}>
						<div className={classes.paper}>
							<h1>{animalName}'s Painting</h1>
							<form onSubmit={handleSubmit}>
								<FormControl className={classes.formControl}>
									<TextField
										id='painter-name'
										label='Painter Name'
										value={form.painter || ''}
										name='painter'
										onChange={handleChange}
									/>
								</FormControl>

								<br></br>

								<FormControl className={classes.formControl}>
									<InputLabel
										// shrink={form.paint_location_id && true}
										id='select-paint-location-label'>
										Painting Location
									</InputLabel>
									<Select
										labelId='select-paint-location-label'
										id='select-paint-location'
										value={form.paint_location_id || ''}
										name='paint_location_id'
										onChange={handleChange}>
										{renderPaintLocationValues()}
									</Select>
								</FormControl>

								<br></br>

								<FormControl className={classes.formControl}>
									<TextField
										label='Card Stock'
										id='card-stock'
										type='number'
										value={form.card_stock || ''}
										name='card_stock'
										onChange={handleChange}>
										{renderStatusValues()}
									</TextField>
								</FormControl>

								<br></br>

								<FormControl className={classes.formControl}>
									<InputLabel id='select-status-label'>
										Painting Status
									</InputLabel>
									<Select
										labelId='select-status-label'
										id='simple-select-status'
										value={form.painting_status || ''}
										name='painting_status'
										onChange={handleChange}>
										{renderStatusValues()}
									</Select>
								</FormControl>

								<br></br>

								{form.painting_status === 'Displayed' && (
									<FormControl className={classes.formControl}>
										<InputLabel id='select-gallery-label'>Gallery</InputLabel>
										<Select
											labelId='select-gallery-label'
											id='simple-select-status'
											value={form.gallery_id || ''}
											name='gallery_id'
											onChange={handleChange}>
											{renderGalleryValues()}
										</Select>
									</FormControl>
								)}

								<br></br>

								<div className={classes.buttonContainer}>
									<Button
										variant='contained'
										color='primary'
										className={classes.button}
										type='submit'
										onClick={handleSubmit}>
										Submit
									</Button>
								</div>
							</form>
						</div>
					</Fade>
				</Modal>
			)}
		</div>
	);
}
