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
	const [canvasUrl, setCanvasUrl] = useState('');
	const { animal } = useContext(StateContext);
	const { animalDispatch } = useContext(DispatchContext);
	const { errorMessage, message } = useContext(MessageContext);

	const handleSubmit = e => {
		e.preventDefault();
		photoId ? updatePhoto() : createPhoto();
	};

	const handleChange = ({ target: { value } }) => setCanvasUrl(value);

	const createPhoto = () => {
		let canvasPhoto = {
			google_drive_url: canvasUrl,
			size: 'Canvas',
		};
		api.animals
			.createCanvasPhoto(canvasPhoto, animal.id)
			.then(res => {
				if (res.error) {
					return errorMessage();
				} else {
					console.log(res);
					setCanvasUrl('');
					animalDispatch({
						type: 'UPDATE',
						payload: res,
					});
					message('Success!', 'Canvas Photo has been added to the database');
				}
			})
			.catch(err => console.log(err));
	};

	const updatePhoto = () => {
		let updatedPhoto = {
			id: photoId,
			google_drive_url: canvasUrl,
		};
		api.photos
			.updatePhoto(updatedPhoto)
			.then(res => {
				if (res.error) {
					return errorMessage();
				} else {
					setCanvasUrl('');
					animalDispatch({
						type: 'UPDATE_PHOTO',
						payload: res,
					});
					message('Success!', 'Canvas Photo has been added to the database');
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
