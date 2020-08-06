import React, { useState, useContext } from 'react';
import { DispatchContext, MessageContext } from '../App';
import { makeStyles, Button } from '@material-ui/core';
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

function TabPanelPhoto({ photo }) {
	const classes = useStyles();
	const [openForm, setOpenForm] = useState(false);
	const { animalDispatch } = useContext(DispatchContext);
	const { errorMessage } = useContext(MessageContext);

	const handleOpenForm = () => {
		setOpenForm(!openForm);
	};

	const handleUpdateProfilePhoto = () => {
		api.animals.updateProfilePhoto(photo.id).then(res => {
			if (res.error) {
				return errorMessage();
			} else {
				animalDispatch({ type: 'UPDATE', payload: res });
			}
		});
	};

	return (
		<div>
			<div className={classes.image}>
				<img className={classes.canvasImage} alt='canvas' src={photo.url} />
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
					<CanvasPhotoForm photoId={photo.id} />
				</>
			)}
		</div>
	);
}

export default TabPanelPhoto;
