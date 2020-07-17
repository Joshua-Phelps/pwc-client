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
	submit: {
		textAlign: 'center',
	},
}));

export default function PaintingForm({
	paintingId,
	open,
	animalId,
	setOpen,
	addPainting,
	updatePainting,
}) {
	const classes = useStyles();
	const { galleries, paintLocs, form } = useContext(StateContext);
	const { formDispatch } = useContext(DispatchContext);

	useEffect(() => {
		if (paintingId) {
			fetchPainting()
				.then(p => {
					formDispatch({
						type: 'SET_FORM',
						payload: p,
					});
				})
				.catch(err => console.log(err));
		}
	}, [paintingId]);

	const fetchPainting = () => {
		return api.paintings.getPaintingById(paintingId);
	};

	const handleChange = e => {
		formDispatch({
			type: 'UPDATE_FORM',
			payload: e.target.value,
			key: e.target.name,
		});
	};

	const handleSubmit = () => {
		setOpen(false);
		let painting = { ...form, animal_id: animalId };
		if (form.painting_status !== 'Displayed') {
			painting = { ...painting, gallery_id: null };
		}
		if (form.id) {
			api.paintings
				.updatePainting(painting)
				.then(painting => updatePainting(painting))
				.catch(err => console.log(err));
		} else {
			api.paintings
				.createPainting(painting)
				.then(painting => addPainting(painting))
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
			<button type='button' onClick={handleOpen}>
				Add Painting
			</button>
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
						<FormControl className={classes.formControl}>
							{/* <InputLabel id='demo-simple-select-label'>Age</InputLabel> */}
							<TextField
								labelId='painter-name-input'
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
								shrink={form.paint_location_id && true}
								id='select-paint-location-label'>
								Painting Location
							</InputLabel>
							<Select
								labelId='select-paint-location'
								id='simple-select-paint-location'
								value={form.paint_location_id || null}
								name='paint_location_id'
								onChange={handleChange}>
								{renderPaintLocationValues()}
							</Select>
						</FormControl>

						<br></br>

						<FormControl className={classes.formControl}>
							<InputLabel id='select-status-label'>Painting Status</InputLabel>
							<Select
								labelId='select-status'
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
									labelId='select-status'
									id='simple-select-status'
									value={form.gallery_id || null}
									name='gallery_id'
									onChange={handleChange}>
									{renderGalleryValues()}
								</Select>
							</FormControl>
						)}

						<br></br>

						<Button
							variant='contained'
							color='primary'
							className={classes.submit}
							onClick={handleSubmit}>
							Submit
						</Button>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
