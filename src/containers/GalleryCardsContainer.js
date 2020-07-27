import React, { useContext } from 'react';
import GalleryCard from '../components/GalleryCard';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { StateContext } from '../App';

const useStyles = makeStyles(theme => ({
	container: {
		width: '100%',
		margin: 0,
		padding: theme.spacing(4),
	},
}));

function CardsContainer({ history }) {
	const classes = useStyles();
	const { galleries } = useContext(StateContext);

	const renderCards = () => {
		return galleries.map(gallery => {
			return (
				<Grid key={gallery.id} item sm={4} xs={12}>
					<GalleryCard gallery={gallery} history={history} />
				</Grid>
			);
		});
	};

	return (
		<Grid className={classes.container} container spacing={3}>
			{renderCards()}
		</Grid>
	);
}

export default CardsContainer;
