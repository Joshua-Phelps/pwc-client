import React, { useState, useEffect, useContext } from 'react';
import { StateContext } from '../App';
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

export default function PaintingForm({ paintingId, animalId, open, setOpen }) {
	const classes = useStyles();
	const { galleries, paintLocs } = useContext(StateContext);
	const [painter, setPainter] = useState('');
	const [galleryId, setGalleryId] = useState(null);
	const [paintLocationId, setPaintLocationId] = useState(null);
	const [paintingURL, setPaintingURL] = useState('');
	const [status, setStatus] = useState('');

	useEffect(() => {
		if (paintingId) {
			fetchPainting()
				.then(p => {
					console.log(p);
					setPainter(p.painter);
					setStatus(p.painting_status);
					setPaintLocationId(p.paint_location_id);
					setGalleryId(p.gallery_id);
					// painting['animal'] = painting.animal.id;
					console.log(p);
				})
				.catch(err => console.log(err));
		}
	}, [paintingId]);

	const fetchPainting = () => {
		return api.paintings.getPaintingById(paintingId);
	};

	const handleChange = (e, cb) => cb(e.target.value);

	const handleSubmit = () => {
		const painting = {
			painter,
			painting_status: status,
			gallery_id: galleryId,
			animal_id: animalId,
			painting_url: paintingURL,
			paint_location_id: paintLocationId,
		};
		if (paintingId) {
			painting = { ...painting, id: paintingId };
			api.paintings
				.updatePainting(painting)
				.then(painting => console.log(painting).catch(err => console.log(err)));
		} else {
		}
		api.paintings
			.createPainting(painting)
			.then(painting => console.log(painting))
			.catch(err => console.log(err));
	};

	const handleOpen = () => setOpen(true);

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
								value={painter}
								name='setPainter'
								onChange={e => handleChange(e, setPainter)}
							/>
						</FormControl>
						<br></br>
						<FormControl className={classes.formControl}>
							<InputLabel id='select-paint-location-label'>
								Painting Location
							</InputLabel>
							<Select
								labelId='select-paint-location'
								id='simple-select-paint-location'
								value={paintLocationId}
								name='paintingLocationId'
								onChange={e => handleChange(e, setPaintLocationId)}>
								{renderPaintLocationValues()}
							</Select>
						</FormControl>
						<br></br>
						<FormControl className={classes.formControl}>
							<InputLabel id='select-status-label'>Painting Status</InputLabel>
							<Select
								labelId='select-status'
								id='simple-select-status'
								value={status}
								name='status'
								onChange={e => handleChange(e, setStatus)}>
								{renderStatusValues()}
							</Select>
						</FormControl>
						<br></br>
						{status === 'Displayed' && (
							<FormControl className={classes.formControl}>
								<InputLabel id='select-gallery-label'>Gallery</InputLabel>
								<Select
									labelId='select-gallery'
									id='simple-select-status'
									value={galleryId}
									name='galleryId'
									onChange={e => handleChange(e, setGalleryId)}>
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
