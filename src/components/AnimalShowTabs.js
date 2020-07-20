import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Typography, Box, Grid, Button } from '@material-ui/core';
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
		height: '100%',
		width: '100%',
	},
	heading: {
		textAlign: 'center',
		marginTop: '-20px',
	},
	icon: {
		textAlign: 'center',
	},
	imageContainer: {
		// overflowX: 'auto',
		// overflowY: 'auto',
		display: 'flex',
		height: '100%',
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
	detailsList: {
		padding: theme.spacing(1),
	},
}));

export default function AnimalShowTabs({ animal, galleries }) {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const renderPhotos = () => {
		return animal.photos.map((p, idx) => {
			return (
				<div className={classes.image}>
					<img key={idx} src={p.url} />
				</div>
			);
		});
	};

	const renderGalleries = () => {
		console.log(galleries());
		return galleries().map((g, idx) => {
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
		<div className={classes.root}>
			<Grid container>
				<Grid className='horizontal-tabs' item xs={12}>
					<Tabs
						variant='scrollable'
						scrollButtons='on'
						value={value}
						onChange={handleChange}
						aria-label='Horizontal Tabs'
						className={classes.horizontalTabs}>
						<Tab label='Details' {...a11yProps(0)} />
						<Tab label='Shelter' {...a11yProps(1)} />
						<Tab label='Photos' {...a11yProps(2)} />
						<Tab label='Galleries' {...a11yProps(3)} />
					</Tabs>
				</Grid>

				<Grid className='vertical-tabs' item xs={4} sm={3}>
					<Tabs
						orientation='vertical'
						variant='scrollable'
						value={value}
						onChange={handleChange}
						aria-label='Vertical tabs example'
						className={classes.verticalTabs}>
						<Tab label='Details' {...a11yProps(0)} />
						<Tab label='Shelter' {...a11yProps(1)} />
						<Tab label='Photos' {...a11yProps(2)} />
						<Tab label='Galleries' {...a11yProps(3)} />
					</Tabs>
				</Grid>

				<Grid className={classes.tabPanel} item xs={12} sm={9}>
					<TabPanel value={value} index={0}>
						<Typography
							className={classes.detailsList}
							align='left'
							variant='body1'>
							<b>ID:</b> {animal.id}
							<br></br>
							<b>Name:</b> {animal.name}
							<br></br>
							<b>Description:</b> {animal.description}
							<br></br>
							<b>Gender:</b> {animal.gender}
							<br></br>
							<b>Type:</b> {animal.animal_type}
							<br></br>
							<b>External ID:</b> {animal.external_id}
							<br></br>
							<b>Total Paintings:</b> {animal.paintings.length}
							<br></br>
							<b>Photo Status:</b> {animal.photo_status}
						</Typography>
						{/* <Typography variant='body1'>{animal.description}</Typography> */}
					</TabPanel>

					<TabPanel value={value} index={1}>
						<div className={classes.heading}>
							<h3>{animal.shelter.name}</h3>
						</div>

						<Grid className={classes.icon} container>
							<Grid item xs={12} sm={12} md={4}>
								<div>
									<PhoneIcon />
								</div>
								{animal.shelter.phone_number}
							</Grid>

							<Grid item xs={12} sm={12} md={4}>
								<div>
									<HomeIcon />
								</div>
								{animal.shelter.address}
							</Grid>

							<Grid item xs={12} sm={12} md={4}>
								<div>
									<EmailIcon />
								</div>
								{animal.shelter.email}
							</Grid>
						</Grid>
					</TabPanel>

					<TabPanel value={value} index={2}>
						<div className={classes.imageContainer}>{renderPhotos()}</div>
					</TabPanel>

					<TabPanel value={value} index={3}>
						<div>{renderGalleries()}</div>
					</TabPanel>
				</Grid>
			</Grid>
		</div>
	);
}
