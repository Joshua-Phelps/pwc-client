import React from 'react';
import AnimalCard from '../components/AnimalCard';
import { Grid } from '@material-ui/core';

export default function CardsContainer({ animals, history }) {
	const renderCards = () => {
		return animals.map(animal => {
			return (
				<Grid key={animal.id} item xs={3}>
					<AnimalCard animal={animal} history={history} />
				</Grid>
			);
		});
	};

	return (
		<>
			<Grid container spacing={3}>
				{renderCards()}
			</Grid>
		</>
	);
}
