import React, { useContext, useEffect } from 'react';
import clsx from 'clsx';
import { StateContext, MessageContext, DispatchContext } from '../App';
import { api } from '../services/api';
import PhotoCard from '../components/PhotoCard';
import PrintReadyPhotoCard from '../components/PrintReadyPhotoCard';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	container: {
		padding: theme.spacing(4),
	},
}));

function PhotosContainer({ location: { pathname } }) {
	const classes = useStyles();
	const { photos } = useContext(StateContext);
	const { photosDispatch } = useContext(DispatchContext);
	const { errorMessage } = useContext(MessageContext);
	let path = pathname.split('/photos/')[1];

	useEffect(() => {
		console.log('running');
		if (path === 'full-background') {
			api.photos.getFullBgPhotos().then(res => {
				if (res.error) return errorMessage();
				photosDispatch({ type: 'SET', payload: res });
			});
		} else if (path === 'print-ready') {
			api.photos.getPrintReadyPhotos().then(res => {
				if (res.error) return errorMessage();
				photosDispatch({ type: 'SET', payload: res });
			});
		}
	}, [path, errorMessage, photosDispatch]);

	const renderCards = () => {
		let path = pathname.split('/photos/')[1];
		return path === 'full-background'
			? renderCardsHelper(PhotoCard)
			: renderCardsHelper(PrintReadyPhotoCard);
	};

	const renderCardsHelper = Component => {
		return photos.map(p => {
			return (
				<Grid key={p.animal.id} item xs={12} sm={4}>
					<Component animalInfo={p} />
				</Grid>
			);
		});
	};

	return (
		<>
			<Grid
				className={clsx(classes.container, 'large-view')}
				container
				alignItems='center'
				spacing={3}>
				{renderCards()}
			</Grid>
			<Grid
				className={clsx(classes.container, 'small-view')}
				alignItems='center'
				container
				spacing={3}>
				{renderCards()}
			</Grid>
		</>
	);
}

export default PhotosContainer;
