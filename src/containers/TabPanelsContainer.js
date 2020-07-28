import React, { useContext } from 'react';
import { StateContext } from '../App';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Typography, Box, Grid, Button } from '@material-ui/core';
import TabPanelDetails from '../components/TabPanelDetails';
import TabPanelShelter from '../components/TabPanelShelter';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import EmailIcon from '@material-ui/icons/Email';

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
}));

export default function TabsPanelContainer({ value }) {
	const classes = useStyles();
	const { galleries, animal } = useContext(StateContext);

	const renderPhotos = () => {
		return animal.photos.map((p, idx) => {
			return (
				<div className={classes.image}>
					<img key={idx} src={p.url} />
				</div>
			);
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
				<div>{renderGalleries()}</div>
			</TabPanel>
		</>
	);
}
