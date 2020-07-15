import React, { useState, useEffect, useReducer, useContext } from 'react';
import { StateContext } from '../App';
import { api } from '../services/api';
import { paintLocationReducer } from '../reducers/Reducers';
import PaintingForm from './PaintingForm';

const initialState = {
	id: null,
	address: '',
	name: '',
	max_paintings: null,
	current_paintings: [],
	available_paintings: [],
};

export default function PaintLocationShowPage({ history, location }) {
	const { animals } = useContext(StateContext);
	const [paintLocation, paintLocationDispatch] = useReducer(
		paintLocationReducer,
		initialState
	);
	const [update, setUpdate] = useState(false);

	useEffect(() => {
		fetchLocation();
	}, []);

	const fetchLocation = () => {
		let id = parseInt(location.pathname.split('/paint-locations/')[1]);
		api.paintLocs
			.getPaintLocById(id)
			.then(paintLoc => {
				paintLocationDispatch({
					type: 'SET_PAINT_LOCATION',
					payload: paintLoc,
				});
			})
			.catch(err => console.log(err));
	};

	const handleEdit = id => {
		history.push(`/paintings/edit/${id}`);
	};

	const renderCurrentPaintings = () => {
		return paintLocation.current_paintings.map(paint => {
			let animal = animals.find(ani => ani.id === paint.animal_id) || {
				name: '',
				animal_type: '',
			};
			console.log(animal);
			return (
				<div>
					<h1>
						{animal.animal_type}: {animal.name}
					</h1>
					<h3>Paint ID: {paint.id}</h3>
					<button onClick={() => handleEdit(paint.id)}>Edit</button>
				</div>
			);
		});
	};
	const renderAvailablePaintings = () => {};

	return (
		<>
			<div>{renderCurrentPaintings()}</div>
		</>
	);
}
