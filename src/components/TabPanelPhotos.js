import React, { useState, useContext } from 'react';
import { StateContext, DispatchContext, MessageContext } from '../App';
import { makeStyles, Button, TextField } from '@material-ui/core';
import { api } from '../services/api';
import CanvasPhotoForm from './CanvasPhotoForm';
const useStyles = makeStyles(theme => ({
	image: {
		textAlign: 'center',
		padding: theme.spacing(1),
		alignSelf: 'center',
		height: '100%',
	},
	buttonContainer: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
	},
	buttonContainer2: {
		alignItems: 'center',
		display: 'inline-block',
		justifyContent: 'center',
		padding: theme.spacing(1),
	},
	canvasImage: {
		maxWidth: '350px',
	},
}));

function TabPanelPhotos({ photo, isCanvas }) {
	const classes = useStyles();
	const [openForm, setOpenForm] = useState(false);
	const [canvasUrl, setCanvasUrl] = useState('');
	const { animal } = useContext(StateContext);
	const { animalDispatch } = useContext(DispatchContext);
	const { errorMessage } = useContext(MessageContext);

	const handleOpenForm = () => {
		setOpenForm(!openForm);
	};

	const handleSubmit = e => {
		e.preventDefault();
	};

	const handleChange = ({ target: { value } }) => setCanvasUrl(value);

	const handleUpdateProfilePhoto = () => {
		api.animals.updateProfilePhoto(photo.id, animal.id).then(res => {
			if (res.error) return errorMessage;
			animalDispatch({ type: 'UPDATE', payload: res });
		});
	};

	return (
		<div className={classes.image}>
			<div className={classes.image}>
				<img className={classes.canvasImage} src={photo.url} />
			</div>
			<div className={classes.buttonContainer2}>
				<Button
					variant='contained'
					color='primary'
					onClick={handleUpdateProfilePhoto}>
					Make Profile Photo
				</Button>
			</div>
			<div className={classes.buttonContainer2}>
				<Button variant='contained' color='secondary' onClick={handleOpenForm}>
					Update Google Drive URL
				</Button>
			</div>
			{openForm && (
				<>
					<CanvasPhotoForm />
					{/* <div>
						<form onSubmit={handleSubmit}>
							<TextField
								onChange={handleChange}
								value={canvasUrl}
								id='add-canvas-field'
								variant='outlined'
								label='Google Drive URL'
							/>
							<div className={classes.buttonContainer2}>
								<Button variant='contained' color='secondary' type='submit'>
									Submit
								</Button>
							</div>
						</form>
					</div> */}
				</>
			)}
		</div>
	);
}

export default TabPanelPhotos;
