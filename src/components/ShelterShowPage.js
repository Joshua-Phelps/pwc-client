import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../App';
import { api } from '../services/api';
import VenueHeader from './VenueHeader';

// const initialState = {
// 	id: null,
// 	address: '',
// 	name: '',
// 	max_paintings: null,
// 	current_paintings: [],
// 	available_paintings: [],
// };

export default function PaintLocationShowPage({ location }) {
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
			return shelter.animals.map(ani => {
				return <div>{ani.name}</div>;
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
					<div>{renderAnimals()}</div>
				</>
			)}
		</>
	);
}
