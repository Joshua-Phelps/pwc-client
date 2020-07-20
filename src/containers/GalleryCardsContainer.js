import React from 'react';
import GalleryCard from '../components/GalleryCard';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	container: {
		width: '100%',
		margin: 0,
	},
}));

export default function CardsContainer({ galleries, history }) {
	const classes = useStyles();

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
