import React, { useContext, useState } from 'react';
import { MessageContext, DispatchContext } from '../App';
import { api } from '../services/api';
import { useHistory } from 'react-router-dom';
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
	TextField,
	makeStyles,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
	header: {
		height: '30px',
		textAlign: 'center',
		background: theme.palette.secondary.grey.light,
	},
	media: {
		height: '400px',
		objectFit: 'contain',
		background: theme.palette.secondary.grey.light,
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
		background: theme.palette.secondary.grey.main,
	},
	prevPhotoButton: { transform: 'rotate(180deg)' },
	moreInfo: {
		// overflowX: 'auto',
		background: theme.palette.secondary.grey.main,
	},
}));

export default function PhotoCard({ animalInfo }) {
	const [photoIdx, setPhotoIdx] = useState(0);
	const [openAddCanvas, setOpenAddCanvas] = useState(false);
	const [expanded, setExpanded] = React.useState(false);
	const [canvasUrl, setCanvasUrl] = useState('');
	const { errorMessage, message } = useContext(MessageContext);
	const { photosDispatch } = useContext(DispatchContext);
	const classes = useStyles();
	const history = useHistory();
	const { photos, canvas_photo_id, animal } = animalInfo;

	const getCanvasPhoto = () => {
		return photos.filter(p => p.id === canvas_photo_id)[0];
	};

	const profilePhotoUrl = () => {
		if (canvas_photo_id) return getCanvasPhoto().url;
		if (photos && photos[photoIdx]) return photos[photoIdx].url;
		return '';
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
			google_drive_url: canvasUrl,
			size: 'Canvas',
		};
		api.animals
			.createCanvasPhoto(canvasPhoto, animal.id)
			.then(res => {
				if (res.error) {
					return errorMessage();
				} else {
					setCanvasUrl('');
					setOpenAddCanvas(false);
					setExpanded(false);
					photosDispatch({
						type: 'REMOVE_ANIMAL',
						payload: res.id,
					});
					message('Success!', 'Canvas Photo has been added to the database');
				}
			})
			.catch(err => console.log(err));
	};

	const handleAddCanvas = () => setOpenAddCanvas(!openAddCanvas);

	const handleChange = ({ target: { value } }) => setCanvasUrl(value);

	const handleVisitPage = () => {
		history.push(`/animals/${animal.id}`);
	};

	return (
		<Card>
			<CardHeader
				className={classes.header}
				title={
					<Button color='primary' onClick={handleVisitPage}>
						{animal.name} (ID: {animal.id})
					</Button>
				}
				titleTypographyProps={{ variant: 'body1' }}
			/>
			<CardMedia
				className={classes.media}
				component='img'
				image={profilePhotoUrl()}
				title={'animal-photo'}
			/>
			<CardActions className={classes.actionsContainer} disableSpacing>
				{photos && photos.length > 1 && (
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
							{photos && photos[photoIdx] && photos[photoIdx].file_path}
						</Typography>
					</div>
				</CardContent>
			</Collapse>
		</Card>
	);
}
