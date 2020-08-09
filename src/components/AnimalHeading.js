import React, { useContext, useState } from 'react';
import { MessageContext, DispatchContext, StateContext } from '../App';
import { api } from '../services/api';
import CanvasPhotoForm from './CanvasPhotoForm';
import { Grid, Box, Typography, Button, makeStyles } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
	heading: {
		padding: theme.spacing(2),
	},
	subheader: {
		alignSelf: 'center',
		padding: theme.spacing(2),
	},
	imageContainer: {
		paddingBottom: theme.spacing(2),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		textAlign: 'center',
	},
	imageContainer2: {
		display: 'inline-block',
	},
	box: {
		width: '100%',
		height: '100%',
	},
	image: {
		width: 'auto',
		height: '40vh',
		maxWidth: '350px',
		display: 'block',
		background: 'black',
	},
	arrow: {
		textAlign: 'center',
	},
	arrowRight: {
		textAlign: 'center',
		direction: 'rtl',
	},
	profileButton: {
		// paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	},
	buttons: {
		textAlign: 'center',
	},
	form: {
		textAlign: 'center',
	},
}));

export default function Animalheading() {
	const classes = useStyles();
	const [openForm, setOpenForm] = useState(false);
	const [photoIdx, setPhotoIdx] = useState(0);
	const { animalDispatch } = useContext(DispatchContext);
	const { errorMessage } = useContext(MessageContext);
	const { animal } = useContext(StateContext);
	const { name, photos, profile_photo_id } = animal;
	const profilePhoto = () => photos[photoIdx].url || '';

	const handleNext = () => {
		if (photoIdx === photos.length - 1) setPhotoIdx(0);
		else {
			setPhotoIdx(photoIdx + 1);
		}
	};

	const handlePrev = () => {
		if (photoIdx === 0) setPhotoIdx(photos.length - 1);
		else {
			setPhotoIdx(photoIdx - 1);
		}
	};

	const handleOpenForm = () => {
		setOpenForm(!openForm);
	};

	const handleUpdateProfilePhoto = photoId => {
		api.animals.updateProfilePhoto(photoId).then(res => {
			if (res.error) {
				return errorMessage();
			} else {
				animalDispatch({ type: 'UPDATE', payload: res });
				setPhotoIdx(0);
			}
		});
	};

	return (
		<Grid container>
			<Grid item xs={12} sm={12}>
				<Typography className={classes.heading} variant='h2'>
					{name}
				</Typography>
			</Grid>
			<Grid item xs={false} sm={4}></Grid>
			<Grid className={classes.imageContainer} item xs={12} sm={4}>
				<span className={classes.imageContainer2}>
					<Box className={classes.box} borderRadius='borderRadius' border={2}>
						<img
							alt='profile'
							className={classes.image}
							src={profilePhoto() || ''}></img>
					</Box>
				</span>
			</Grid>
			<Grid item xs={false} sm={4}></Grid>

			<Grid item xs={false} sm={4}></Grid>
			<Grid item xs={12} sm={4}>
				<Grid container>
					<Grid className={classes.arrow} item xs={3} sm={2}>
						<ArrowBackIcon fontSize='large' onClick={handlePrev} />
					</Grid>
					<Grid item xs={6} sm={8}>
						<div className={classes.profileButton}>
							<Button
								onClick={() => handleUpdateProfilePhoto(photos[photoIdx].id)}
								fullWidth
								color='secondary'
								variant='contained'>
								Make Profile Pic
							</Button>
						</div>
						<div className={classes.profileButton}>
							<Button
								onClick={handleOpenForm}
								fullWidth
								color='secondary'
								variant='contained'>
								Update Image Url
							</Button>
						</div>

						{openForm && (
							<div className={classes.form}>
								<CanvasPhotoForm photoId={photos[photoIdx].id} />
							</div>
						)}
					</Grid>
					<Grid className={classes.arrowRight} item xs={3} sm={2}>
						<ArrowForwardIcon fontSize='large' onClick={handleNext} />
					</Grid>
				</Grid>
				<Grid item xs={false} sm={4}></Grid>
			</Grid>
		</Grid>
	);
}
