import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import { StateContext, DispatchContext, MessageContext } from '../App';
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

const initialState = {
	painter_id: null,
	painting_status: '',
	paint_location_id: null,
	card_stock: 0,
	gallery_id: null,
	google_drive_url: '',
	visible_url: '',
};

export default function PaintingForm() {
	const classes = useStyles();
	const [loaded, setLoaded] = useState(false);
	const { galleries, paintLocs, paintFormProps, gallery } = useContext(
		StateContext
	);
	const {
		animalDispatch,
		galleryDispatch,
		paintFormPropsDispatch,
	} = useContext(DispatchContext);
	const { errorMessage } = useContext(MessageContext);
	const [form, setForm] = useState(initialState);
	const {
		paintingId,
		animalId,
		open,
		animalName,
		updateAnimal,
		updateGallery,
	} = paintFormProps;

	useEffect(() => {
		if (paintingId) {
			api.paintings
				.getPaintingById(paintingId)
				.then(res => {
					if (res.error) return errorMessage();
					return setForm(res);
				})
				.then(() => setLoaded(true))
				.catch(err => console.log(err));
		} else {
			setForm(initialState);
			setLoaded(true);
		}
	}, [paintingId, errorMessage, setForm, setLoaded]);

	const addPainting = painting => {
		animalDispatch({
			type: 'ADD_PAINTING',
			payload: painting,
		});
	};

	const updateAnimalPaintings = painting => {
		animalDispatch({
			type: 'UPDATE_PAINTING',
			payload: painting,
		});
	};

	const updateGalleryPaintings = painting => {
		if (painting.gallery_id !== gallery.id) {
			galleryDispatch({
				type: 'REMOVE_PAINTING',
				payload: painting,
			});
		} else {
			galleryDispatch({
				type: 'UPDATE_PAINTING',
				payload: painting,
			});
		}
	};

	const handleChange = ({ target: { name, value } }) => {
		setForm(prevState => {
			return { ...prevState, [name]: value };
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		paintFormPropsDispatch({ type: 'CLOSE', payload: null });
		let painting = { ...form, animal_id: animalId };
		if (form.painting_status !== 'Displayed') {
			painting = { ...painting, gallery_id: null };
		}
		if (form.id) {
			api.paintings
				.updatePainting(painting)
				.then(res => {
					if (res.error) return errorMessage();
					updateAnimal && updateAnimalPaintings(res);
					updateGallery && updateGalleryPaintings(res);
				})
				.catch(err => console.log(err));
		} else {
			api.paintings
				.createPainting(painting)
				.then(res => {
					if (res.error) return errorMessage();
					updateAnimal && addPainting(res);
					setForm(initialState);
				})
				.catch(err => console.log(err));
		}
	};

	const handleClose = () =>
		paintFormPropsDispatch({ type: 'CLOSE', payload: {} });

	const renderStatusValues = () => {
		const statusValues = [
			'Outline',
			'Needs Touch up',
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
			{loaded && (
				<Modal
					aria-labelledby='add-painting-form'
					aria-describedby='add-painting-form'
					className={clsx(classes.modal, 'form-large')}
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
										InputLabelProps={{ shrink: true }}
										id='painter-name'
										label='Painter Name'
										value={form.painter}
										name='painter'
										onChange={handleChange}
									/>
								</FormControl>

								<br></br>

								<FormControl className={classes.formControl}>
									<InputLabel
										shrink={true}
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
										InputLabelProps={{ shrink: true }}
										label='Google Drive URL'
										id='url-field'
										value={form.google_drive_url}
										name='google_drive_url'
										onChange={handleChange}></TextField>
								</FormControl>

								<br></br>

								<FormControl className={classes.formControl}>
									<InputLabel shrink={true} id='select-status-label'>
										Painting Status
									</InputLabel>
									<Select
										labelId='select-status-label'
										id='simple-select-status'
										value={form.painting_status}
										name='painting_status'
										onChange={handleChange}>
										{renderStatusValues()}
									</Select>
								</FormControl>

								<br></br>

								{form.painting_status === 'Displayed' && (
									<>
										<FormControl className={classes.formControl}>
											<InputLabel shrink={true} id='select-gallery-label'>
												Gallery
											</InputLabel>
											<Select
												labelId='select-gallery-label'
												id='simple-select-status'
												value={form.gallery_id}
												name='gallery_id'
												onChange={handleChange}>
												{renderGalleryValues()}
											</Select>

											<br></br>
										</FormControl>
										<FormControl className={classes.formControl}>
											<TextField
												InputLabelProps={{ shrink: true }}
												label='Card Stock'
												id='card-stock'
												type='number'
												value={form.card_stock}
												name='card_stock'
												onChange={handleChange}></TextField>
										</FormControl>
									</>
								)}

								<br></br>

								<div className={classes.buttonContainer}>
									<Button
										variant='contained'
										color='secondary'
										className={classes.button}
										type='submit'>
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
