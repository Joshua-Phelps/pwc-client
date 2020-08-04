import React, { useState, useContext } from 'react';
import { MessageContext } from '../App';
import { api } from '../services/api';
import { Button, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	item: {
		textAlign: 'center',
	},
}));

export default function FileForm({ handleFileChange }) {
	const classes = useStyles();
	const [file, setFile] = useState(null);
	const { errorMessage, successMessage } = useContext(MessageContext);

	// const handleSubmit = newFile => {
	// 	let formData = new FormData();
	// 	formData.append('image', newFile);

	// 	api.fileUpload
	// 		.addFileToDB(formData)
	// 		.then(res => {
	// 			if (res.error) {
	// 				return errorMessage();
	// 			} else {
	// 				return successMessage();
	// 			}
	// 		})
	// 		.catch(err => console.log(err));

	// api.google
	// 	.createFile(formData)
	// 	.then(res => console.log(res))
	// 	.catch(err => console.log(err));

	// api.google
	// 	.getFiles()
	// 	.then(res => console.log(res))
	// 	.catch(err => console.log(err));
	// };

	const handleChange = e => {
		// handleFileChange(e);
		// setFile(e.target.files[0]);
		// setShowButton(!showButton);
		// console.log(e.target.files);
	};

	return (
		// <form onSubmit={handleSubmit}>
		/* <Grid alignItems='center' container>
				<Grid item xs={1} sm={4}></Grid>
        <Grid className={classes.item} item xs={10} sm={4}> */
		<>
			<input
				hidden
				accept='txt'
				className={classes.input}
				variant='outlined'
				onChange={handleFileChange}
				id='contained-button-file'
				multiple
				type='file'
			/>
			<label htmlFor='contained-button-file'>
				<Button
					variant='contained'
					component='span'
					color='secondary'
					className={classes.button}>
					Upload
				</Button>
			</label>
			<Grid></Grid>
			{/* <div style={{ marginTop: '30px' }}>
						<Button type='submit' color='secondary' variant='contained'>
							Submit!
						</Button>
					</div> */}
			{/* </Grid>
				<Grid item xs={1} sm={4}></Grid>
			</Grid> */}
		</>
		// </form>
	);
}
