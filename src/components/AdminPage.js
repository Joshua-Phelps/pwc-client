import React, { useContext, useState } from 'react';
import VenueForm from './VenueForm';
import AnimalForm from './AnimalForm';
import PermissionsForm from './PermissionsForm';
import { Typography, Grid, Button, makeStyles } from '@material-ui/core';
import { AuthContext } from '../App';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(2),
	},

	item: {
		textAlign: 'center',
	},
	formContainer: {
		paddingTop: theme.spacing(3),
	},
}));

export default function AdminPage() {
	const classes = useStyles();
	const [venueType, setVenueType] = useState('');
	const [openAnimalForm, setOpenAnimalForm] = useState('');
	const [openAddPermissionsForm, setOpenAddPermissionsForm] = useState('');
	const [openRemovePermissionsForm, setOpenRemovePermissionsForm] = useState(
		''
	);
	const { user } = useContext(AuthContext);

	const handleVenueClick = type => {
		setVenueType(type);
		setOpenAnimalForm('');
		setOpenAddPermissionsForm(false);
		setOpenRemovePermissionsForm(false);
	};

	const handleAnimalClick = () => {
		setOpenAnimalForm(!openAnimalForm);
		setVenueType('');
		setOpenAddPermissionsForm(false);
		setOpenRemovePermissionsForm(false);
	};

	const handleAddPermissionsClick = () => {
		setOpenAddPermissionsForm(!openAddPermissionsForm);
		setOpenRemovePermissionsForm(false);
		setOpenAnimalForm('');
		setVenueType('');
	};

	const handleRemovePermissionsClick = () => {
		setOpenRemovePermissionsForm(!openRemovePermissionsForm);
		setOpenAddPermissionsForm(false);
		setOpenAnimalForm('');
		setVenueType('');
	};

	return (
		<>
			{user.isAdmin ? (
				<div className={classes.root}>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={3} lg={2} className={classes.item}>
							<Button
								variant='contained'
								color='secondary'
								onClick={() => handleVenueClick('Gallery')}>
								Add Gallery
							</Button>
						</Grid>

						<Grid item xs={12} sm={3} lg={2} className={classes.item}>
							<Button
								variant='contained'
								color='secondary'
								onClick={() => handleVenueClick('Paint Location')}>
								Add Paint Location
							</Button>
						</Grid>

						<Grid item xs={12} sm={3} lg={2} className={classes.item}>
							<Button
								variant='contained'
								color='secondary'
								onClick={() => handleVenueClick('Shelter')}>
								Add Shelter
							</Button>
						</Grid>

						<Grid item xs={12} sm={3} lg={2} className={classes.item}>
							<Button
								variant='contained'
								color='secondary'
								onClick={handleAnimalClick}>
								Add Animal
							</Button>
						</Grid>

						<Grid item xs={12} sm={3} lg={2} className={classes.item}>
							<Button
								variant='contained'
								color='secondary'
								onClick={handleAddPermissionsClick}>
								Add Permissions
							</Button>
						</Grid>

						<Grid item xs={12} sm={3} lg={2} className={classes.item}>
							<Button
								variant='contained'
								color='secondary'
								onClick={handleRemovePermissionsClick}>
								Remove Permissions
							</Button>
						</Grid>
					</Grid>

					<div className={classes.formContainer}>
						{venueType && <VenueForm venueType={venueType} />}
						{openAnimalForm && <AnimalForm />}
						{openAddPermissionsForm && <PermissionsForm isAdd={true} />}
						{openRemovePermissionsForm && <PermissionsForm isAdd={false} />}
					</div>
				</div>
			) : (
				<div>You are not authorized to view this page</div>
			)}
		</>
	);
}
