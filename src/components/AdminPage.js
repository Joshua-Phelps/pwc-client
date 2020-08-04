import React, { useContext, useState } from 'react';
import { api } from '../services/api';
import VenueForm from './VenueForm';
import AnimalForm from './AnimalForm';
import PermissionsForm from './PermissionsForm';
import FileForm from './FileForm';
import FileFormSubmit from './FileFormSubmit';
import { Typography, Grid, Button, makeStyles } from '@material-ui/core';
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

export default function AdminPage() {
	const classes = useStyles();
	const [venueType, setVenueType] = useState('');
	const [openAnimalForm, setOpenAnimalForm] = useState('');
	const [openAddPermissionsForm, setOpenAddPermissionsForm] = useState('');
	const [showSubmitFileButton, setsShowSubmitFileButton] = useState(false);
	const [file, setFile] = useState(null);
	const { user } = useContext(AuthContext);
	const { errorMessage, successMessage } = useContext(MessageContext);

	const handleVenueClick = type => {
		setVenueType(type);
		setOpenAnimalForm('');
		setOpenAddPermissionsForm(false);
	};

	const handleAnimalClick = () => {
		setOpenAnimalForm(!openAnimalForm);
		setVenueType('');
		setOpenAddPermissionsForm(false);
	};

	const handleAddPermissionsClick = () => {
		setOpenAddPermissionsForm(!openAddPermissionsForm);
		setOpenAnimalForm('');
		setVenueType('');
	};

	const handleUploadFileClick = () => {
		setsShowSubmitFileButton(!showSubmitFileButton);
		setOpenAnimalForm('');
		setVenueType('');
		setOpenAddPermissionsForm(false);
	};

	const handleSubmitFile = () => {
		let formData = new FormData();
		formData.append('data', file);
		successMessage(
			`Adding files to database. Please stay on this page until complete`
		);

		api.fileUpload
			.addFileToDB(formData)
			.then(res => {
				if (res.error) {
					return errorMessage();
				} else {
					successMessage(
						`You have added ${res.animal_count} animals to the database`
					);
				}
				setsShowSubmitFileButton(false);
				setOpenAnimalForm('');
				setVenueType('');
				setOpenAddPermissionsForm(false);
			})
			.catch(err => console.log(err));

		// api.google
		// 	.createFile(formData)
		// 	.then(res => console.log(res))
		// 	.catch(err => console.log(err));

		// api.google
		// 	.getFiles()
		// 	.then(res => console.log(res))
		// 	.catch(err => console.log(err));
	};

	const handleFileChange = e => {
		setFile(e.target.files[0]);
		setsShowSubmitFileButton(!showSubmitFileButton);
		console.log(e.target.files);
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
											// showButton={showSubmitFileButton}
											// setShowButton={handleUploadFileClick}
											handleFileChange={handleFileChange}
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
								{openAddPermissionsForm && <PermissionsForm />}
								{showSubmitFileButton && (
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
