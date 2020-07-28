import React, { useContext } from 'react';
import clsx from 'clsx';
import VenueCard from '../components/VenueCard';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { StateContext } from '../App';

const useStyles = makeStyles(theme => ({
	container: {
		padding: theme.spacing(4),
	},
}));

function GalleryCardsContainer({ history }) {
	const classes = useStyles();
	const { galleries } = useContext(StateContext);

	const renderCards = () => {
		return galleries.map(gallery => {
			return (
				<Grid key={gallery.id} item sm={4} xs={12}>
					<VenueCard
						venue={gallery}
						buttonText='Visit Gallery'
						pushPath={`/galleries/${gallery.id}`}
						history={history}
						totalPaintings={gallery.paintings.length}
					/>
				</Grid>
			);
		});
	};

	return (
		<>
			<Grid
				className={clsx(classes.container, 'large-view')}
				container
				spacing={3}>
				{renderCards()}
			</Grid>
			<Grid className='small-view' container spacing={3}>
				{renderCards()}
			</Grid>
		</>
	);
}

export default GalleryCardsContainer;
