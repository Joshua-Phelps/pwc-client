import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
} from '@material-ui/core';
import PaintingForm from './PaintingForm';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
	center: {
		textAlign: 'center',
	},
});

export default function PaintingCard({ painting, galleryName }) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleOpen = () => setOpen(!open);

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardContent>
					<Typography align='center' gutterBottom variant='h5' component='h2'>
						{painting.animal.name}
					</Typography>
					<Typography variant='body2' color='textSecondary' component='p'>
						Card Stock: Card Stock goes here
						<br></br>
						Status:{' '}
						{painting.painting_status === 'Displayed'
							? `Displayed at ${galleryName}`
							: painting.painting_status}
					</Typography>
				</CardContent>
				{/* <CardMedia
					component='img'
					alt='Contemplative Reptile'
					height='140'
					image={painting.url}
					title='Contemplative Reptile'
				/> */}
			</CardActionArea>
			<CardActions>
				<Button
					onClick={handleClick}
					size='small'
					variant='contained'
					color='primary'>
					Update Painting
				</Button>
				{open && (
					<PaintingForm
						paintingId={painting.id}
						animalId={painting.animal.id}
						updateSelectAnimal={false}
						animalName={painting.animal.name}
						open={open}
						setOpen={handleOpen}
					/>
				)}
			</CardActions>
		</Card>
	);
}
