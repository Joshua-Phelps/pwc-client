import React, { useContext } from 'react';
import AnimalCard from '../components/AnimalCard';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { StateContext } from '../App';

const useStyles = makeStyles(theme => ({
	container: {
		width: '100%',
		margin: 0,
	},
	gridItem: {
		textAlign: '-webkit-center',
	},
}));

export default function CardsContainer() {
	const classes = useStyles();
	const { animals } = useContext(StateContext);

	const renderCards = () => {
		return animals.map(animal => {
			return (
				<Grid key={animal.id} className={classes.gridItem} item xs={12} sm={4}>
					<AnimalCard animal={animal} />
				</Grid>
			);
		});
	};

	return (
		<>
			<Grid
				className={classes.container}
				spacing={3}
				alignItems='center'
				container>
				{renderCards()}
			</Grid>
		</>
	);
}
