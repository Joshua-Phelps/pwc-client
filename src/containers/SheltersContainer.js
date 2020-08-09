import React, { useContext } from 'react';
import clsx from 'clsx';
import VenueCard from '../components/VenueCard';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { StateContext } from '../App';

const useStyles = makeStyles(theme => ({
	containerLarge: {
		padding: theme.spacing(4),
	},
	containerSmall: {
		padding: theme.spacing(1),
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
						buttonText='Update'
						handleButton={() => handleUpdateShelter(shelter.id)}
					/>
				</Grid>
			);
		});
	};

	const handleUpdateShelter = id =>
		history.push(`/admin/update-venue/shelters/${id}`);

	return (
		<>
			<Grid
				className={clsx(classes.containerLarge, 'large-view')}
				container
				spacing={3}>
				{renderCards()}
			</Grid>
			<Grid
				className={clsx(classes.containerSmall, 'small-view')}
				container
				spacing={1}>
				{renderCards()}
			</Grid>
		</>
	);
}

export default SheltersContainer;
