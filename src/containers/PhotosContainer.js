import React, { useContext, useEffect } from 'react';
import { StateContext, MessageContext, DispatchContext } from '../App';
import { api } from '../services/api';
import PhotoCard from '../components/PhotoCard';
import { Grid } from '@material-ui/core';

function PhotosContainer({ location: { pathname } }) {
	const { photos } = useContext(StateContext);
	const { photosDispatch } = useContext(DispatchContext);
	const { errorMessage } = useContext(MessageContext);

	useEffect(() => {
		let path = pathname.split('/photos/')[1];
		if (path === 'full-background') {
			api.photos.getFullBgPhotos().then(res => {
				if (res.error) return errorMessage;
				console.log(res);
				photosDispatch({ type: 'SET', payload: res });
			});
		} else if (path === 'ready-for-print') {
			api.photos.getPrintReadyPhotos().then(res => {
				if (res.error) return errorMessage;
				photosDispatch({ type: 'SET', payload: res });
			});
		}
	}, [pathname]);

	const renderPhotoCards = () => {
		return photos.map(p => {
			return (
				<Grid key={p.id} item xs={12} sm={3}>
					<PhotoCard photo={p} />
				</Grid>
			);
		});
	};

	return (
		<Grid spacing={3} container>
			{renderPhotoCards()}
		</Grid>
	);
}

export default PhotosContainer;
