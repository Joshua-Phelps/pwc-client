import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { DispatchContext } from '../App';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardHeader,
	Button,
	Typography,
	Grid,
	makeStyles,
	CardMedia,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 345,
	},
	header: {
		height: 'auto',
		textAlign: 'center',
		padding: '2px',
		background: theme.palette.primary.dark,
	},
	headerButton: {
		color: 'white',
	},
	media: {
		objectFit: 'contain',
		background: 'black',
	},
	actionsContainer: {
		background: theme.palette.secondary.grey.main,
		display: 'grid',
	},
}));

export default function PaintingCard({ painting, galleryName }) {
	const classes = useStyles();
	const history = useHistory();
	const { paintFormPropsDispatch } = useContext(DispatchContext);
	const { animal, card_stock, visible_url, id } = painting;

	const handleVisitPage = () => {
		history.push(`/animals/${id}`);
	};

	const handleClick = () => {
		paintFormPropsDispatch({
			type: 'SET',
			payload: {
				updateGallery: true,
				updateAnimal: false,
				animalId: animal.id,
				animalName: animal.name,
				open: true,
				paintingId: id,
			},
		});
	};

	return (
		<Card className={classes.root}>
			<CardHeader
				className={classes.header}
				title={
					<>
						<Button className={classes.headerButton} onClick={handleVisitPage}>
							{animal.name} (ID: {animal.id})
						</Button>
						<div className={classes.headerButton}>Card Stock: {card_stock}</div>
					</>
				}
			/>
			<CardMedia
				className={classes.media}
				image={visible_url || ''}
				title={'animal-photo'}
				height='350'
				component='img'
			/>
			<CardActions className={classes.actionsContainer} disableSpacing>
				<Button
					onClick={handleClick}
					size='small'
					variant='contained'
					color='primary'>
					Update Painting
				</Button>
			</CardActions>
		</Card>
	);
}
