import React, { useContext, useEffect } from 'react';
import clsx from 'clsx';
import { StateContext, MessageContext, DispatchContext } from '../App';
import { api } from '../services/api';
import PhotoCard from '../components/PhotoCard';
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

	const renderCards = () => {
		return photos.map(p => {
			return (
				<Grid key={p.id} item xs={12} sm={4}>
					<PhotoCard photo={p} />
				</Grid>
			);
		});
	};

	return (
		<>
			<Grid
				className={clsx(classes.container, 'large-view')}
				container
				spacing={3}>
				{renderCards()}
			</Grid>
			<Grid className='small-view' container spacing={3}>
				{renderCards()}
			</Grid>
		</>
	);
}

export default PhotosContainer;
