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
		background: theme.palette.primary.dark,
	},
	headerButton: {
		color: 'white',
	},
	media: {
		height: '100%',
		paddingTop: '56.25%', // 16:9
	},
	actionsContainer: {
		background: theme.palette.secondary.grey.main,
		display: 'grid',
	},
}));

export default function PhotoCard({ animalInfo }) {
	const [photoIdx, setPhotoIdx] = useState(0);
	const [openAddCanvas, setOpenAddCanvas] = useState(false);
	const [canvasUrl, setCanvasUrl] = useState('');
	const { errorMessage, successMessage, confirmMessage } = useContext(
		MessageContext
	);
	const { photosDispatch } = useContext(DispatchContext);
	const classes = useStyles();
	const history = useHistory();
	const { canvas_photo, animal, url } = animalInfo;

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

	const handleVisitPage = () => {
		history.push(`/animals/${animal.id}`);
	};

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
					<Button className={classes.headerButton} onClick={handleVisitPage}>
						{animal.name} (ID: {animal.id})
					</Button>
				}
				titleTypographyProps={{ variant: 'body1' }}
			/>
			<CardMedia
				className={classes.media}
				image={url || ''}
				title={'animal-photo'}
			/>
			<CardActions className={classes.actionsContainer} disableSpacing>
				<Button
					variant='contained'
					color='secondary'
					onClick={handleMarkPrinted}>
					Mark As Printed
				</Button>
			</CardActions>
		</Card>
	);
}
