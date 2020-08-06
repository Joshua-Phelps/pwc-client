import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Typography } from '@material-ui/core';
import { StateContext } from '../App';

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
		width: '100%',
		height: '100%',
		maxWidth: '350px',
		display: 'block',
	},
}));

export default function Animalheading() {
	const classes = useStyles();
	const { animal } = useContext(StateContext);
	const { name, photos, profile_photo_id } = animal;

	const profilePhoto = () => photos.filter(p => p.id === profile_photo_id)[0];

	return (
		<Grid container>
			<Grid item xs={12} sm={12}>
				<Typography className={classes.heading} variant='h2'>
					{name}
				</Typography>
			</Grid>

			<Grid className={classes.imageContainer} item xs={12} sm={12}>
				<span className={classes.imageContainer2}>
					<Box className={classes.box} borderRadius='borderRadius' border={2}>
						<img
							alt='profile'
							className={classes.image}
							src={profilePhoto() ? profilePhoto().url : ''}></img>
					</Box>
				</span>
			</Grid>
			<Grid className={classes.subheader} item sm={6} xs={12}>
				{/* <Typography align='right' variant='h5'>
					{description}
				</Typography> */}
			</Grid>
		</Grid>
	);
}
