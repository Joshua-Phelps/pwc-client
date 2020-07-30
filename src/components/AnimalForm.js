import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import VenueFormHeader from './VenueFormHeader';
import { photoStatusList } from '../utils/index';
import {
	TextField,
	Grid,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Button,
	FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	container: {
		padding: theme.spacing(4),
	},
	item: {
		width: '100%',
		textAlign: 'left',
	},
	input: {
		display: 'inline-block',
		padding: theme.spacing(1),
	},
	formControl: {
		minWidth: '194px',
	},
	helperText: {
		paddingLeft: theme.spacing(1),
	},
	description: {
		width: '100%',
	},
	button: {
		marginTop: '30px',
	},
}));

const intialState = {
	id: null,
	animal_type: '',
	name: '',
	gender: '',
	shelter: '',
	description: '',
	age: '',
	photo_status: '',
	photo_local_path: '',
};

export default function AnimalForm({ animal }) {
	const classes = useStyles();
	const [form, setForm] = useState(intialState);

	useEffect(() => {
		if (animal) {
			setForm(animal);
		}
	}, []);

	const handleChange = ({ target: { name, value } }) => {
		setForm(prevState => {
			return { ...prevState, [`${name}`]: value };
		});
	};

	const renderPhotoStatusValues = () => {
		return photoStatusList.map(st => {
			return (
				<MenuItem key={st} value={st}>
					{st}
				</MenuItem>
			);
		});
	};

	return (
		<>
			<VenueFormHeader venueType='Animal' />
			<form>
				<Grid className={classes.container} spacing={2} container>
					<Grid item xs={false} sm={2}>
						{''}
					</Grid>
					<Grid className={classes.item} item xs={12} sm={10}>
						<div className={classes.input}>
							<FormHelperText
								className={classes.helperText}
								id='my-helper-text'>
								ex: Dog, Cat, etc.
							</FormHelperText>
							<TextField
								aria-label='animal type field'
								variant='outlined'
								label='Type'
								id='type-field'
								name='type'
								value={form.animal_type}
								onChange={handleChange}
							/>
						</div>

						<div className={classes.input}>
							<TextField
								aria-label='name text field'
								variant='outlined'
								label='Name'
								id='name-field'
								name='name'
								value={form.name}
								onChange={handleChange}
							/>
						</div>

						<div className={classes.input}>
							<TextField
								aria-label='gender field'
								variant='outlined'
								label='Gender'
								id='gender-field'
								name='gender'
								value={form.gender}
								onChange={handleChange}
							/>
						</div>
					</Grid>

					<Grid item xs={false} sm={2}>
						{''}
					</Grid>

					<Grid className={classes.item} item xs={12} sm={10}>
						<div className={classes.input}>
							<TextField
								aria-label='age field'
								variant='outlined'
								label='Age'
								id='age-field'
								name='age'
								value={form.age}
								onChange={handleChange}
							/>
						</div>

						<div className={classes.input}>
							<TextField
								aria-label='photo local path field'
								variant='outlined'
								label='Photo Local Path'
								id='photo-local-path-field'
								name='photo_local_path'
								value={form.photo_local_path}
								onChange={handleChange}
							/>
						</div>

						<div className={classes.input}>
							<FormControl variant='outlined' className={classes.formControl}>
								<InputLabel id='photo-status-select-label'>
									Photo Status
								</InputLabel>
								<Select
									labelId='photo_status-select-label'
									id='photo-status-select'
									value={form.photo_status}
									name='photo_status'
									onChange={handleChange}>
									{renderPhotoStatusValues()}
								</Select>
							</FormControl>
						</div>
					</Grid>

					<Grid item xs={false} sm={2}>
						{''}
					</Grid>
					<Grid className={classes.item} item xs={12} sm={6}>
						<div className={clsx(classes.input, classes.description)}>
							<TextField
								aria-label='description field'
								variant='outlined'
								label='Description'
								id='description-field'
								name='description'
								multiline
								rows={2}
								rowsMax={4}
								fullWidth={true}
								InputProps={{ classes: { input: classes.description } }}
								value={form.description}
								onChange={handleChange}
							/>
						</div>
					</Grid>

					<Grid item xs={false} sm={4}>
						{''}
					</Grid>

					<Grid item xs={false} sm={2}>
						{''}
					</Grid>

					<Grid item xs={12} sm={10}>
						<div className={clsx(classes.input, classes.button)}>
							<Button color='secondary' variant='contained'>
								Submit
							</Button>
						</div>
					</Grid>
				</Grid>
			</form>
		</>
	);
}
