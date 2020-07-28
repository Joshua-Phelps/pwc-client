import React, { useContext } from 'react';
import VenueCard from '../components/VenueCard';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { StateContext } from '../App';

const useStyles = makeStyles(theme => ({
	container: {
		padding: theme.spacing(4),
	},
}));

function SheltersContainer({ history }) {
	const classes = useStyles();
	const { shelters } = useContext(StateContext);

	const renderCards = () => {
		return shelters.map(shelter => {
			return (
				<Grid key={shelter.id} item sm={4} xs={12}>
					<VenueCard
						venue={shelter}
						buttonText='Visit Shelter'
						pushPath={`/shelters/${shelter.id}`}
						history={history}
					/>
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

export default SheltersContainer;
