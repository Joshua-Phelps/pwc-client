import React, { useState, useEffect, useReducer } from 'react';
import { api } from '../services/api';
import { galleryReducer } from '../reducers/Reducers';
import PaintingCard from './PaintingCard';

const initialState = {
	id: null,
	address: '',
	name: '',
	max_paintings: null,
	current_paintings: [],
};

export default function GalleryShowPage({ history, location }) {
	const [gallery, galleryDispatch] = useReducer(galleryReducer, initialState);
	const [loaded, setLoaded] = useState(false);
	const {
		id,
		name,
		address,
		email,
		phone_number,
		paintings,
		max_paintings,
	} = gallery;

	useEffect(() => {
		fetchGallery().then(() => setLoaded(true));
	}, [loaded]);

	const fetchGallery = () => {
		let id = parseInt(location.pathname.split('/galleries/')[1]);
		return api.galleries
			.getGalleryById(id)
			.then(gallery => {
				return galleryDispatch({
					type: 'SET_GALLERY',
					payload: { ...gallery },
				});
			})
			.catch(err => console.log(err));
	};

	const renderPaintings = () => {
		return paintings.map(painting => {
			return <PaintingCard key={painting.id} painting={painting} />;
		});
	};

	return (
		<>
			{loaded && (
				<>
					<div>{name}</div>
					<div>{address}</div>
					<div>Maximum Paintings: {max_paintings}</div>

					<div>
						{paintings.length > 0 ? (
							<>
								Current Paintings:
								<ul>{renderPaintings()}</ul>
							</>
						) : (
							<>There are currently no paintings at this location</>
						)}
					</div>
				</>
			)}
		</>
	);
}
