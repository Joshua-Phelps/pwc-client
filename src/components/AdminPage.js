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
	buttonContainer: {
		display: 'inline-block',
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
	const [openPermissionsForm, setPermissionsForm] = useState('');
	const { user } = useContext(AuthContext);

	const handleVenueClick = type => {
		setVenueType(type);
		setOpenAnimalForm('');
		setPermissionsForm('');
	};

	const handleAnimalClick = () => {
		setOpenAnimalForm(!openAnimalForm);
		setVenueType('');
		setPermissionsForm('');
	};

	const handlePermissionsClick = () => {
		setPermissionsForm(!openPermissionsForm);
		setOpenAnimalForm('');
		setVenueType('');
	};

	return (
		<>
			{user.isAdmin ? (
				<div className={classes.root}>
					<Grid container spacing={3}>
						<Grid className={classes.item} item xs={12} sm={12}>
							<div className={classes.buttonContainer}>
								<Button
									variant='contained'
									color='secondary'
									onClick={() => handleVenueClick('Gallery')}>
									Add Gallery
								</Button>
							</div>

							<div className={classes.buttonContainer}>
								<Button
									variant='contained'
									color='secondary'
									onClick={() => handleVenueClick('Paint Location')}>
									Add Paint Location
								</Button>
							</div>

							<div className={classes.buttonContainer}>
								<Button
									variant='contained'
									color='secondary'
									onClick={() => handleVenueClick('Shelter')}>
									Add Shelter
								</Button>
							</div>

							<div className={classes.buttonContainer}>
								<Button
									variant='contained'
									color='secondary'
									onClick={handleAnimalClick}>
									Add Animal
								</Button>
							</div>

							<div className={classes.buttonContainer}>
								<Button
									variant='contained'
									color='secondary'
									onClick={handlePermissionsClick}>
									Add Permissions
								</Button>
							</div>
						</Grid>
					</Grid>
					<div className={classes.formContainer}>
						{venueType && <VenueForm venueType={venueType} />}
						{openAnimalForm && <AnimalForm />}
						{openPermissionsForm && <PermissionsForm />}
					</div>
				</div>
			) : (
				<div>You are not authorized to view this page</div>
			)}
		</>
	);
}
