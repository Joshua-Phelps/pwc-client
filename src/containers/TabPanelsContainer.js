import React, { useContext } from 'react';
import { StateContext } from '../App';
import PropTypes from 'prop-types';
import TabPanelDetails from '../components/TabPanelDetails';
import TabPanelShelter from '../components/TabPanelShelter';
import TabPanelDisplayedPaintings from '../components/TabPanelDisplayedPaintings';
import TabPanelPhoto from '../components/TabPanelPhoto';
import { Typography, Box, makeStyles } from '@material-ui/core';
import CanvasPhotoForm from '../components/CanvasPhotoForm';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

const useStyles = makeStyles(theme => ({
	imageContainer: {
		display: 'flex',
	},
}));

export default function TabsPanelContainer({ value }) {
	const classes = useStyles();
	const { galleries, animal } = useContext(StateContext);

	const renderPhotos = () => {
		return animal.photos.map((p, idx) => {
			return <TabPanelPhoto key={p.id} photo={p} />;
		});
	};

	const currentGalleries = () => {
		let result = [];
		for (let i = 0; i < animal.paintings.length; i++) {
			if (animal.paintings[i].gallery_id) {
				let foundGallery = galleries.find(
					g => g.id === animal.paintings[i].gallery_id
				);
				if (foundGallery) {
					result.push({
						paintingId: animal.paintings[i].id,
						name: foundGallery.name,
						card_stock: '#',
					});
				}
			}
		}
		return result;
	};

	const renderDisplayedPaintings = () => {
		return currentGalleries().map((g, idx) => {
			return <TabPanelDisplayedPaintings key={idx} gallery={g} />;
		});
	};

	const canvasPhoto = () => {
		for (let i = 0; i < animal.photos.length; i++) {
			if (animal.photos[i].id === animal.canvas_photo_id)
				return animal.photos[i];
		}
		return { url: '', file_path: '', id: null };
	};

	const renderCanvasPhoto = () => {
		return <TabPanelPhoto isCanvas={true} photo={canvasPhoto()} />;
	};

	return (
		<>
			<TabPanel value={value} index={0}>
				<TabPanelDetails />
			</TabPanel>

			<TabPanel value={value} index={1}>
				<TabPanelShelter />
			</TabPanel>

			<TabPanel className={classes.imageContainer} value={value} index={2}>
				{renderPhotos()}
			</TabPanel>

			<TabPanel value={value} index={3}>
				{renderDisplayedPaintings()}
			</TabPanel>

			<TabPanel value={value} index={4}>
				{animal.canvas_photo_id ? (
					renderCanvasPhoto()
				) : (
					<>
						<Typography variant='h6'>Add Canvas Photo</Typography>
						<CanvasPhotoForm />
					</>
				)}
			</TabPanel>
		</>
	);
}
