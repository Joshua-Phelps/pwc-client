import React from 'react';
import { Grid } from '@material-ui/core';

export default function SheltersContainers({ shelters, history }) {
	const handleClick = id => {
		history.push(`/shelters/${id}`);
	};

	const handleUpdate = () => {};

	const renderCards = () => {
		return shelters.map(shelter => {
			let animalCount = shelter.animals.length;
			return (
				<Grid
					// onClick={() => handleClick(shelter.id)}
					key={shelter.id}
					item
					xs={3}>
					<div>
						{shelter.name} ({animalCount})
					</div>
					<br></br>
					{/* <div>{shelter.address}</div> */}
					<button onClick={() => handleClick(shelter.id)}>Edit</button>
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
