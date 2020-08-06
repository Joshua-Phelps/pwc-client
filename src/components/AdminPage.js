import React, { useContext, useState } from 'react';
import { api } from '../services/api';
import VenueForm from './VenueForm';
import AnimalForm from './AnimalForm';
import PermissionsForm from './PermissionsForm';
import FileForm from './FileForm';
import FileFormSubmit from './FileFormSubmit';
import { Grid, Button, makeStyles } from '@material-ui/core';
import { AuthContext, MessageContext } from '../App';

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

const initSt = {
	venueType: '',
	openAnimalForm: false,
	openPermsForm: false,
	showFileSubmit: false,
	file: null,
};

export default function AdminPage() {
	const classes = useStyles();
	const [venueType, setVenueType] = useState(initSt.venueType);
	const [openAnimalForm, setOpenAnimalForm] = useState(initSt.openAnimalForm);
	const [openPermsForm, setOpenPermsForm] = useState(initSt.openPermsForm);
	const [showFileSubmit, setShowFileSubmit] = useState(initSt.showFileSubmit);
	const [file, setFile] = useState(initSt.file);
	const { user } = useContext(AuthContext);
	const { message, errorMessage } = useContext(MessageContext);

	const handleVenueClick = type => {
		setVenueType(type);
		setOpenAnimalForm(initSt.openAnimalForm);
		setOpenPermsForm(initSt.openPermsForm);
	};

	const handleAnimalClick = () => {
		setOpenAnimalForm(!openAnimalForm);
		setVenueType(initSt.venueType);
		setOpenPermsForm(initSt.openPermsForm);
	};

	const handleAddPermissionsClick = () => {
		setOpenPermsForm(!openPermsForm);
		setOpenAnimalForm(initSt.openAnimalForm);
		setVenueType(initSt.venueType);
	};

	const handleSubmitFile = () => {
		let formData = new FormData();
		formData.append('data', file);
		message(
			'Please Wait...',
			`Adding files to database. Please stay on this page until complete`
		);

		api.fileUpload
			.addFileToDB(formData)
			.then(res => {
				console.log(res);
				if (res.error) {
					return errorMessage();
				} else {
					message(
						'Success!',
						`You have added ${res.animals.length} animals to the database`
					);
				}
				setShowFileSubmit(initSt.showFileSubmit);
				setOpenAnimalForm(initSt.setOpenAnimalForm);
				setVenueType(initSt.venueType);
				setOpenPermsForm(initSt.openPermsForm);
				setFile(initSt.file);
			})
			.catch(err => console.log(err));
	};

	const handleFileChange = e => {
		setFile(e.target.files[0]);
		setShowFileSubmit(!showFileSubmit);
	};

	const handleFileClick = () => {
		setOpenAnimalForm(initSt.setOpenAnimalForm);
		setVenueType(initSt.venueType);
		setOpenPermsForm(initSt.openPermsForm);
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
								<>
									<div className={classes.buttonContainer}>
										<Button
											variant='contained'
											color='secondary'
											onClick={handleAddPermissionsClick}>
											Update Permissions
										</Button>
									</div>
									<div className={classes.buttonContainer}>
										<FileForm
											handleClick={handleFileClick}
											handleChange={handleFileChange}
										/>
									</div>
								</>
							)}
						</Grid>
					</Grid>

					<div className={classes.formContainer}>
						{venueType && <VenueForm venueType={venueType} />}
						{openAnimalForm && <AnimalForm />}

						{user.permission_level > 2 && (
							<>
								{openPermsForm && <PermissionsForm />}
								{showFileSubmit && (
									<FileFormSubmit handleSubmit={handleSubmitFile} />
								)}
							</>
						)}
					</div>
				</div>
			) : (
				<div>You are not authorized to view this page</div>
			)}
		</>
	);
}
