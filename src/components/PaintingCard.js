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
	Grid,
} from '@material-ui/core';
import PaintingForm from './PaintingForm';

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 345,
	},
	center: {
		textAlign: 'center',
	},
	buttonContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		padding: theme.spacing(1),
	},
}));

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
						Card Stock: {painting.card_stock || 0}
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
				<Grid className={classes.center} container>
					<Grid item sm={12} xs={12}>
						<Button
							onClick={handleClick}
							size='small'
							variant='contained'
							color='primary'>
							Update Painting
						</Button>
					</Grid>
				</Grid>

				{open && (
					<PaintingForm
						paintingId={painting.id}
						animalId={painting.animal.id}
						updateSelectAnimal={false}
						updateGallery={true}
						animalName={painting.animal.name}
						open={open}
						setOpen={handleOpen}
					/>
				)}
			</CardActions>
		</Card>
	);
}
