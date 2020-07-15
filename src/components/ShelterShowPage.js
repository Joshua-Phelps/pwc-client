import React, { useState, useEffect, useReducer, useContext } from 'react';
import { StateContext } from '../App';
import { api } from '../services/api';
import { shelterReducer } from '../reducers/Reducers';

// const initialState = {
// 	id: null,
// 	address: '',
// 	name: '',
// 	max_paintings: null,
// 	current_paintings: [],
// 	available_paintings: [],
// };

export default function PaintLocationShowPage({ location }) {
	// const { shelter } = useContext(StateContext);
	const [shelter, shelterDispatch] = useReducer(shelterReducer, []);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		fetchShelter();
	}, []);

	const fetchShelter = () => {
		let id = parseInt(location.pathname.split('/shelters/')[1]);
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

	return <>{loaded && <div>{renderAnimals()}</div>}</>;
}
