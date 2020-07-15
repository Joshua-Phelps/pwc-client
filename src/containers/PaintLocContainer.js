import React from 'react';
import GalleryCard from '../components/GalleryCard';
import { Grid } from '@material-ui/core';

export default function CardsContainer({ paintLocs, history }) {
	const handleClick = id => {
		history.push(`/paint-locations/${id}`);
	};

	const handleUpdate = () => {};

	const renderCards = () => {
		return paintLocs.map(paintLoc => {
			return (
				<Grid
					onClick={() => handleClick(paintLoc.id)}
					key={paintLoc.id}
					item
					xs={3}>
					<div>{paintLoc.name}</div>
					<br></br>
					<div>{paintLoc.address}</div>
					<button onClick={handleUpdate}>Edit</button>
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
