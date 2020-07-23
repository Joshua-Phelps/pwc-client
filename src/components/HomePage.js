import React, { useState } from 'react';
import { api } from '../services/api';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({}));

export default function HomePage() {
	const classes = useStyles();
	// const [imageFile, setImageFile] = useState(null);

	// const handleClick = () => {
	// 	let formData = new FormData();
	// 	formData.append('image', imageFile);

	// 	api.google
	// 		.createFile(formData)
	// 		.then(res => console.log(res))
	// 		.catch(err => console.log(err));

	// 	api.google
	// 		.getFiles()
	// 		.then(res => console.log(res))
	// 		.catch(err => console.log(err));
	// };

	// const handleChange = e => {
	// 	setImageFile(e.target.files[0]);
	// 	console.log(e.target.files);
	// };

	return (
		<>
			{/* <input
				hidden
				accept='image/*'
				className={classes.input}
				variant='outlined'
				// style={{ display: 'none' }}
				onChange={handleChange}
				id='contained-button-file'
				multiple
				type='file'
			/>
			<label htmlFor='contained-button-file'>
				<Button variant='raised' component='span' className={classes.button}>
					Upload
				</Button>
			</label>
			<div style={{ marginTop: '30px' }}>
				<button onClick={handleClick}>Submit!</button>
			</div> */}
		</>
	);
}
