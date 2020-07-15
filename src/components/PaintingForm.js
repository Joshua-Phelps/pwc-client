import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	TextField,
	InputLabel,
	MenuItem,
	FormHelperText,
	FormControl,
	Select,
} from '@material-ui/core';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import { api } from '../services/api';

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

const initialState = {
	painter: '',
	paintLocation: '',
	animal_id: null,
	painting_url: '',
	status: '',
};

export default function PaintingForm({ editMode, location }) {
	const classes = useStyles();
	// const [state, setState] = useState(initialState);
	const [painter, setPainter] = useState('');
	const [galleryId, setGalleryId] = useState(null);
	const [paintLocationId, setPaintLocationId] = useState(null);
	const [animalId, setAnimalId] = useState(null);
	const [paintingUrl, setPaintingUrl] = useState('');
	const [status, setStatus] = useState('');

	useEffect(() => {
		if (editMode) {
			fetchPainting()
				.then(painting => {
					painting['animal'] = painting.animal.id;
					// setState(painting);
				})
				.catch(err => console.log(err));
		}
	}, []);

	const fetchPainting = () => {
		let id = parseInt(location.pathname.split('/paintings/edit/')[1]);
		return api.paintings.getPaintingById(id);
	};

	const handleChange = (e, cb) => cb(e.target.value);

	const renderStatusValues = () => {
		const statusValues = [
			'Photo',
			'Outline',
			'Touch up',
			'Painted',
			'Displayed',
			'Sold',
			'Stolen',
			'Donated',
		];
		return statusValues.map(val => {
			return (
				<MenuItem key={val} value={val}>
					{val}
				</MenuItem>
			);
		});
	};

	// const renderAnimalItems = () => {
	// 	return animals.map(a => {
	// 		return (
	// 			<MenuItem key={a.labelId} value={a.id}>
	// 				{a.id}: {a.name} ({a.animal_type})
	// 			</MenuItem>
	// 		);
	// 	});
	// };

	return (
		<>
			<FormControl className={classes.formControl}>
				{/* <InputLabel id='demo-simple-select-label'>Age</InputLabel> */}
				<TextField
					id='painter-name'
					label='Painter Name'
					value={painter}
					name='setPainter'
					onChange={e => handleChange(e, setPainter)}
				/>
				{/* <Select
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					value={state.painter}
					name='painter'
					onChange={handleChange}>
					<MenuItem value={10}>Ten</MenuItem>
					<MenuItem value={20}>Twenty</MenuItem>
					<MenuItem value={30}>Thirty</MenuItem>
				</Select> */}
				<Select
					labelId='select-status'
					id='simple-select-status'
					value={status}
					name='status'
					onChange={e => handleChange(e, setStatus)}>
					{renderStatusValues()}
				</Select>
				{/* make gallery selection */}
				<Select
					labelId='select-status'
					id='simple-select-status'
					value={galleryId}
					name='status'
					onChange={e => handleChange(e, setStatus)}>
					{renderStatusValues()}
				</Select>
			</FormControl>
		</>
	);
}
