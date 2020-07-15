import React, { useState, useEffect, useReducer } from 'react';
import { api } from '../services/api';
import { galleryReducer } from '../reducers/Reducers';

const initialState = {
	id: null,
	address: '',
	name: '',
	max_paintings: null,
	current_paintings: [],
};

export default function GalleryShowPage({ history, location }) {
	const [gallery, galleryDispatch] = useReducer(galleryReducer, initialState);
	const [update, setUpdate] = useState(false);

	useEffect(() => {
		fetchGallery();
	}, [update]);

	const fetchGallery = async () => {
		let id = parseInt(location.pathname.split('/galleries/')[1]);
		await api.galleries
			.getGalleryById(id)
			.then(gallery => {
				let current_paintings = gallery.current_paintings;
				galleryDispatch({
					type: 'SET_GALLERY',
					payload: { ...gallery.gallery, current_paintings },
				});
			})
			.catch(err => console.log(err));
	};

	const renderPaintings = () => {
		return gallery.current_paintings.map(painting => {
			return (
				<li>
					Animal Name: {painting.animal.name}
					<br></br>
					Type: {painting.animal.name}
					<br></br>
					description: {painting.animal.description}
				</li>
			);
		});
	};

	return (
		<>
			<div>{gallery.name}</div>
			<div>{gallery.address}</div>
			{console.log(gallery)}
			<div>Maximum Paintings: {gallery.max_paintings}</div>

			<div>
				Current Paintings:
				<ul>{renderPaintings()}</ul>
			</div>
		</>
	);
}
