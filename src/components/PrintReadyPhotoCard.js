import React, { useContext } from 'react';
import { MessageContext, DispatchContext } from '../App';
import { api } from '../services/api';
import { useHistory } from 'react-router-dom';
import {
	Card,
	CardHeader,
	CardMedia,
	CardActions,
	Button,
	makeStyles,
} from '@material-ui/core';

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
	const { errorMessage, message } = useContext(MessageContext);
	const { photosDispatch } = useContext(DispatchContext);
	const classes = useStyles();
	const history = useHistory();
	const { animal, url } = animalInfo;

	const handleContinue = () => {
		let updatedAnimal = { id: animal.id, canvas_printed: true };
		api.animals
			.updateAnimal(updatedAnimal)
			.then(res => {
				if (res.error) return errorMessage();
				photosDispatch({ type: 'REMOVE_ANIMAL', payload: res.id });
				console.log(res);
			})
			.catch(err => console.log(err));
	};

	const handleMarkPrinted = () => {
		message(
			'Are You Sure?',
			'This will mark this photo as Printed',
			'Continue',
			handleContinue
		);
	};

	const handleVisitPage = () => {
		history.push(`/animals/${animal.id}`);
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
			{url && (
				<CardMedia
					className={classes.media}
					image={url || ''}
					title={'animal-photo'}
				/>
			)}
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
