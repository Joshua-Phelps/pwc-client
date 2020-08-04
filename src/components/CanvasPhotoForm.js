import React, { useState, useContext } from 'react';
import { StateContext, DispatchContext, MessageContext } from '../App';
import { makeStyles, Button, TextField } from '@material-ui/core';
import { api } from '../services/api';
const useStyles = makeStyles(theme => ({
	buttonContainer: {
		alignItems: 'center',
		display: 'inline-block',
		justifyContent: 'center',
		padding: theme.spacing(1),
	},
}));

function CanvasPhotoForm({ photoId }) {
	const classes = useStyles();
	const [openForm, setOpenForm] = useState(false);
	const [canvasUrl, setCanvasUrl] = useState('');
	const { animal } = useContext(StateContext);
	const { animalDispatch } = useContext(DispatchContext);
	const { errorMessage, successMessage } = useContext(MessageContext);

	const handleOpenForm = () => {
		setOpenForm(!openForm);
	};

	const handleSubmit = e => {
		e.preventDefault();
		photoId ? updatePhoto() : createPhoto();
	};

	const handleChange = ({ target: { value } }) => setCanvasUrl(value);

	const handleSubmitUrl = e => {
		e.preventDefault();
		photoId ? updatePhoto() : createPhoto();
	};

	const createPhoto = () => {
		let canvasPhoto = {
			animal_id: animal.id,
			google_drive_url: canvasUrl,
			bkgd_removed: true,
			size: 'Canvas',
			id: photoId,
		};
		api.animals
			.createCanvasPhoto(canvasPhoto)
			.then(res => {
				if (res.error) {
					return errorMessage;
				} else {
					console.log(res);
					setCanvasUrl('');
					setOpenForm(false);
					animalDispatch({
						type: 'UPDATE',
						payload: res,
					});
					successMessage('Canvas Photo has been added to the database');
				}
			})
			.catch(err => console.log(err));
	};

	const updatePhoto = () => {
		let updatedPhoto = {
			id: photoId,
			google_drive_url: canvasUrl,
		};
		api.animals
			.updateCanvasPhoto(updatedPhoto)
			.then(res => {
				if (res.error) {
					return errorMessage;
				} else {
					setCanvasUrl('');
					setOpenForm(false);
					animalDispatch({
						type: 'UPDATE',
						payload: res,
					});
					successMessage('Canvas Photo has been added to the database');
				}
			})
			.catch(err => console.log(err));
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<TextField
					onChange={handleChange}
					value={canvasUrl}
					id='add-canvas-field'
					variant='outlined'
					label='Google Drive URL'
				/>
				<div className={classes.buttonContainer}>
					<Button variant='contained' color='secondary' type='submit'>
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
}

export default CanvasPhotoForm;
