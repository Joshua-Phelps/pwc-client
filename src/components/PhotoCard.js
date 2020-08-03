import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CardActions,
	Collapse,
	IconButton,
	Typography,
	Button,
	Box,
	TextField,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { api } from '../services/api';
import { MessageContext, DispatchContext } from '../App';

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 345,
	},
	header: {
		height: '10px',
		textAlign: 'center',
		background: theme.palette.secondary.grey.light,
	},
	media: {
		height: '100%',
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	buttonContainer: {
		padding: theme.spacing(1),
	},
	actionsContainer: {
		background: theme.palette.secondary.grey.light,
	},
	prevPhotoButton: { transform: 'rotate(180deg)' },
	moreInfo: {
		overflowX: 'auto',
		background: theme.palette.secondary.grey.light,
	},
}));

export default function PhotoCard({ animalInfo }) {
	const [photoIdx, setPhotoIdx] = useState(0);
	const [openAddCanvas, setOpenAddCanvas] = useState(false);
	const [expanded, setExpanded] = React.useState(false);
	const [canvasUrl, setCanvasUrl] = useState('');
	const { errorMessage, successMessage } = useContext(MessageContext);
	const { photosDispatch } = useContext(DispatchContext);
	const classes = useStyles();
	const history = useHistory();
	const { name, photos, canvas_photo, animal_id } = animalInfo;

	const totalPhotos = () => photos.length;

	const profilePhotoUrl = () => {
		if (photos[photoIdx]) return photos[photoIdx].url;
	};

	const handleNextPhoto = () => {
		photos.length <= photoIdx + 1 ? setPhotoIdx(0) : setPhotoIdx(photoIdx + 1);
	};

	const handlePrevPhoto = () => {
		photoIdx === 0 ? setPhotoIdx(photos.length - 1) : setPhotoIdx(photoIdx - 1);
	};

	const handleExpandClick = () => setExpanded(!expanded);

	const handleSubmitUrl = e => {
		e.preventDefault();
		let canvasPhoto = {
			animal_id,
			google_drive_url: canvasUrl,
			bkgd_removed: true,
			size: 'Canvas',
		};
		api.animals
			.createCanvasPhoto(canvasPhoto)
			.then(res => {
				if (res.error) return errorMessage;
				console.log(res);
				setCanvasUrl('');
				setOpenAddCanvas(false);
				setExpanded(false);
				photosDispatch({
					type: 'REMOVE_ANIMAL_PHOTOS',
					payload: res.id,
				});
				return;
			})
			.then(() => successMessage('Canvas Photo has been added to the database'))
			.catch(err => console.log(err));
	};

	const handleAddCanvas = () => setOpenAddCanvas(!openAddCanvas);

	const handleChange = ({ target: { value } }) => setCanvasUrl(value);

	const getPhotoUrl = () => {
		if (photos[photoIdx]) {
			return photos[photoIdx].google_drive_url;
		}
	};

	const renderInfo = (key, value) => {
		return (
			<>
				<b>{key}:</b> {value}
				<br></br>
			</>
		);
	};

	return (
		<Card className={classes.root}>
			<CardHeader
				className={classes.header}
				title={
					<Button>
						{name} (ID: {animal_id})
					</Button>
				}
				titleTypographyProps={{ variant: 'body1' }}
			/>
			<CardMedia
				className={classes.media}
				// image='https://drive.google.com/uc?export=view&id=13xmQNRWPiICreCTeWqLxfe_8meH5V82t'
				// image='https://drive.google.com/file/d/1a-0KMtSagc5ZbRYcNLsTrjKWpTwlhxAv/view?usp=sharing'
				image={profilePhotoUrl()}
				title={'animal-photo'}
			/>
			<CardActions className={classes.actionsContainer} disableSpacing>
				{photos.length > 1 && (
					<>
						{' '}
						<IconButton
							className={classes.prevPhotoButton}
							onClick={handlePrevPhoto}
							aria-expanded={expanded}
							aria-label='previous photo'>
							<NavigateNextIcon />
						</IconButton>
						<IconButton
							className={classes.nextPhotoButton}
							onClick={handleNextPhoto}
							aria-expanded={expanded}
							aria-label='next photo'>
							<NavigateNextIcon />
						</IconButton>{' '}
					</>
				)}
				<IconButton
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded,
					})}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label='show more'>
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout='auto' unmountOnExit>
				<CardContent className={classes.moreInfo}>
					<div className={classes.buttonContainer}>
						<Button
							color='secondary'
							onClick={handleAddCanvas}
							aria-label='mark complete'
							variant='contained'>
							Add Canvas Photo
						</Button>
					</div>
					{openAddCanvas && (
						<form onSubmit={handleSubmitUrl}>
							<div className={classes.buttonContainer}>
								<TextField
									onChange={handleChange}
									value={canvasUrl}
									id='add-canvas-field'
									variant='outlined'
									label='Google Drive URL'
								/>
							</div>
							<div className={classes.buttonContainer}>
								<Button type='submit' color='primary' variant='contained'>
									Submit
								</Button>
							</div>
						</form>
					)}
					<div className={classes.buttonContainer}>
						<Typography variant='caption'>
							Google Drive Path:{' '}
							{photos[photoIdx] && photos[photoIdx].file_path}
							{/* {renderInfo('ID', id)}
						{renderInfo('Shelter', shelter_name)}
						{renderInfo('Total Paintings', total_paintings)}
						{renderInfo('Photo Status', photo_status)} */}
						</Typography>
					</div>
				</CardContent>
			</Collapse>
		</Card>
	);
}
