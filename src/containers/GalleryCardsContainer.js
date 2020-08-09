import React, { useContext } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import VenueCard from '../components/VenueCard';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { StateContext } from '../App';

const useStyles = makeStyles(theme => ({
	container: {
		padding: theme.spacing(4),
	},
	smallContainer: {
		padding: theme.spacing(1),
	},
}));

function GalleryCardsContainer() {
	const classes = useStyles();
	const history = useHistory();
	const { galleries } = useContext(StateContext);

	const renderCards = () => {
		return galleries.map(gallery => {
			return (
				<Grid key={gallery.id} item sm={4} xs={12}>
					<VenueCard
						venue={gallery}
						buttonText2='Visit Gallery'
						handleButton2={() => visitGallery(gallery.id)}
						buttonText='Update'
						handleButton={() => visitEditGalleryForm(gallery.id)}
						totalPaintings={gallery.paintings.length}
					/>
				</Grid>
			);
		});
	};

	const visitEditGalleryForm = id =>
		history.push(`/admin/update-venue/galleries/${id}`);

	const visitGallery = id => history.push(`/galleries/${id}`);

	return (
		<>
			<Grid
				className={clsx(classes.container, 'large-view')}
				container
				spacing={3}>
				{renderCards()}
			</Grid>
			<Grid
				className={clsx(classes.smallContainer, 'small-view')}
				container
				spacing={3}>
				{renderCards()}
			</Grid>
		</>
	);
}

export default GalleryCardsContainer;
