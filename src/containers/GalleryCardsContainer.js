import React from 'react';
import GalleryCard from '../components/GalleryCard';
import { Grid } from '@material-ui/core';

export default function CardsContainer({ galleries, history }) {
	const renderCards = () => {
		return galleries.map(gallery => {
			return (
				<Grid key={gallery.id} item xs={3}>
					<GalleryCard gallery={gallery} history={history} />
				</Grid>
			);
		});
	};

	return (
		<Grid container spacing={3}>
			{renderCards()}
		</Grid>
	);
}
