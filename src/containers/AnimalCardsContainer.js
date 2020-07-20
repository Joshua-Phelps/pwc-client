import React from 'react';
import AnimalCard from '../components/AnimalCard';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	container: {
		// padding: theme.spacing(1),
		width: '100%',
		margin: 0,
	},
}));

export default function CardsContainer({ animals, history }) {
	const classes = useStyles();

	const renderCards = () => {
		return animals.map(animal => {
			return (
				<Grid key={animal.id} item xs={12} sm={4}>
					<AnimalCard animal={animal} history={history} />
				</Grid>
			);
		});
	};

	return (
		<>
			<Grid className={classes.container} spacing={3} container>
				{renderCards()}
			</Grid>
		</>
	);
}
