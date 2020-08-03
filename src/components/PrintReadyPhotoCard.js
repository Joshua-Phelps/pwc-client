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
import CanvasPhotoForm from './CanvasPhotoForm';

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
	const { errorMessage, successMessage, confirmMessage } = useContext(
		MessageContext
	);
	const { photosDispatch } = useContext(DispatchContext);
	const classes = useStyles();
	const history = useHistory();
	const { canvas_photo, animal, url } = animalInfo;

	const handleExpandClick = () => setExpanded(!expanded);

	const handleContinue = () => {
		let updatedAnimal = { id: animal.id, canvas_printed: true };
		api.animals
			.updateAnimal(updatedAnimal)
			.then(res => {
				if (res.error) return errorMessage;
				photosDispatch({ type: 'REMOVE_ANIMAL_PHOTOS', payload: res.id });
				console.log(res);
			})
			.catch(err => console.log(err));
	};

	const handleMarkPrinted = () => {
		confirmMessage('This will mark this photo as Printed', 'Continue', () =>
			handleContinue()
		);
	};

	const handleupdateCanvas = () => setOpenAddCanvas(!openAddCanvas);

	const handleChange = ({ target: { value } }) => setCanvasUrl(value);

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
						{animal.name} (ID: {animal.id})
					</Button>
				}
				titleTypographyProps={{ variant: 'body1' }}
			/>
			<CardMedia
				className={classes.media}
				// image='https://drive.google.com/uc?export=view&id=13xmQNRWPiICreCTeWqLxfe_8meH5V82t'
				// image='https://drive.google.com/file/d/1a-0KMtSagc5ZbRYcNLsTrjKWpTwlhxAv/view?usp=sharing'
				image={url || ''}
				title={'animal-photo'}
			/>
			<CardActions className={classes.actionsContainer} disableSpacing>
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
					{/* <div className={classes.buttonContainer}>
						<CanvasPhotoForm photoId={canvas_photo.id} />
					</div> */}
					<div className={classes.buttonContainer}>
						<Button
							variant='contained'
							color='secondary'
							onClick={handleMarkPrinted}>
							Mark As Printed
						</Button>
					</div>
				</CardContent>
			</Collapse>
		</Card>
	);
}
