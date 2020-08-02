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
	buttonContainer: {
		display: 'inline-block',
		padding: theme.spacing(2),
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
			{user.permission_level > 1 ? (
				<div className={classes.root}>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={12} lg={12} className={classes.item}>
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

							{user.permission_level > 2 && (
								<div className={classes.buttonContainer}>
									<Button
										variant='contained'
										color='secondary'
										onClick={handleAddPermissionsClick}>
										Update Permissions
									</Button>
								</div>
							)}
						</Grid>
					</Grid>

					<div className={classes.formContainer}>
						{venueType && <VenueForm venueType={venueType} />}
						{openAnimalForm && <AnimalForm />}

						{user.permission_level > 2 && (
							<>{openAddPermissionsForm && <PermissionsForm />}</>
						)}
					</div>
				</div>
			) : (
				<div>You are not authorized to view this page</div>
			)}
		</>
	);
}
