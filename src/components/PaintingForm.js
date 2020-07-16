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

export default function PaintingForm({ paintingId, location }) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const { galleries } = useContext(StateContext);
	const [painter, setPainter] = useState('');
	const [galleryId, setGalleryId] = useState(null);
	const [paintLocationId, setPaintLocationId] = useState(null);
	const [animalId, setAnimalId] = useState(null);
	const [paintingUrl, setPaintingUrl] = useState('');
	const [status, setStatus] = useState('');

	useEffect(() => {
		if (paintingId) {
			fetchPainting()
				.then(painting => {
					// painting['animal'] = painting.animal.id;
					console.log(painting);
				})
				.catch(err => console.log(err));
		}
	}, []);

	const fetchPainting = () => {
		let id = parseInt(location.pathname.split('/paintings/edit/')[1]);
		return api.paintings.getPaintingById(id);
	};

	const handleChange = (e, cb) => cb(e.target.value);

	const handleSubmit = () => {};

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

	const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);

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
