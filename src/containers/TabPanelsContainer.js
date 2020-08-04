import React, { useContext, useState } from 'react';
import { StateContext, MessageContext, DispatchContext } from '../App';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Typography, Box, Grid, Button } from '@material-ui/core';
import TabPanelDetails from '../components/TabPanelDetails';
import TabPanelShelter from '../components/TabPanelShelter';
import TabPanelPhoto from '../components/TabPanelPhoto';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import EmailIcon from '@material-ui/icons/Email';
import { api } from '../services/api';
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
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	};
}

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: 'flex',
		height: '370px',
		backgroundColor: theme.palette.secondary.grey.main,
		// overflowX: 'auto',
	},
	verticalTabs: {
		borderRight: `1px solid`,
		height: '100%',
	},
	horizontalTabs: {
		height: '100%',
		overflowX: 'auto',
	},
	tabPanel: {
		overflowX: 'auto',
		maxHeight: '320px',
		width: '100%',
		backgroundColor: theme.palette.secondary.grey.light,
	},
	heading: {
		textAlign: 'center',
		marginTop: '-20px',
	},
	icon: {
		textAlign: 'center',
	},
	imageContainer: {
		display: 'flex',
		// height: '100%',
	},
	image: {
		textAlign: 'center',
		padding: theme.spacing(1),
		alignSelf: 'center',
		height: '100%',
	},
	galleries: {
		borderRight: `1px solid`,
	},
	galleriesContainer: {
		padding: theme.spacing(1),
	},
	button: {
		padding: theme.spacing(1),
	},
	buttonContainer: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
	},
	buttonContainer2: {
		alignItems: 'center',
		display: 'inline-block',
		justifyContent: 'center',
		padding: theme.spacing(1),
	},
	canvasImage: {
		maxWidth: '350px',
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

	const renderGalleries = () => {
		return currentGalleries().map((g, idx) => {
			return (
				<div key={idx}>
					<Box borderRadius='borderRadius' border={1}>
						<Typography className={classes.galleriesContainer}>
							<span className={classes.galleries}>{g.name} </span>
							<span className={classes.galleriesContainer}>
								Card Stock:{` `} {g.card_stock}
							</span>
						</Typography>
						<div className={classes.button}>
							<Button variant='contained'>Update</Button>
						</div>
					</Box>
					<br></br>
				</div>
			);
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
				<div>{renderPhotos()}</div>
			</TabPanel>

			<TabPanel value={value} index={3}>
				<div>{renderGalleries()}</div>
			</TabPanel>

			<TabPanel value={value} index={4}>
				{animal.canvas_photo_id ? (
					<div>{renderCanvasPhoto()}</div>
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
