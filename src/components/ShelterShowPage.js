import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../App';
import { api } from '../services/api';
import VenueHeader from './VenueHeader';
import AnimalCard from './AnimalCard';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	container: {
		padding: theme.spacing(4),
	},
}));

export default function ShelterShowPage({ location }) {
	const classes = useStyles();
	const { shelter } = useContext(StateContext);
	const { shelterDispatch } = useContext(DispatchContext);
	const [loaded, setLoaded] = useState(false);
	const id = parseInt(location.pathname.split('/shelters/')[1]);
	const { name, email, phone_number, address, animals } = shelter;

	useEffect(() => {
		fetchShelter();
	}, [location.pathname]);

	const fetchShelter = () => {
		api.shelters
			.getShelterById(id)
			.then(shelter => {
				return shelterDispatch({
					type: 'SET_SHELTER',
					payload: shelter,
				});
			})
			.then(() => setLoaded(true))
			.catch(err => console.log(err));
	};

	const renderAnimals = () => {
		if (shelter) {
			return shelter.animals.map(animal => {
				return (
					<Grid key={animal.id} item xs={12} sm={4}>
						<AnimalCard shelter_name={name} animal={animal} />
					</Grid>
				);
			});
		}
	};

	return (
		<>
			{loaded && (
				<>
					<VenueHeader
						address={address}
						name={name}
						email={email}
						phone_number={phone_number}
					/>
					<Grid className={classes.container} container spacing={4}>
						{renderAnimals()}
					</Grid>
				</>
			)}
		</>
	);
}
