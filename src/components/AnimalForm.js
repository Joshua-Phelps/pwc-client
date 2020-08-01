import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import { StateContext, DispatchContext } from '../App';
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
import { api } from '../services/api';

const useStyles = makeStyles(theme => ({
	container: {
		padding: theme.spacing(1),
	},
	item: {
		width: '100%',
		// textAlign: 'left',
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
	shelter_id: '',
};

export default function AnimalForm({ animal }) {
	const classes = useStyles();
	const [form, setForm] = useState(intialState);
	const { shelters } = useContext(StateContext);
	const { dialogDispatch } = useContext(DispatchContext);

	useEffect(() => {
		if (animal) {
			setForm(animal);
		}
	}, []);

	const handlSubmit = e => {
		e.preventDefault();
		if (form.id) {
		} else {
			api.animals
				.createAnimal(form)
				.then(res => {
					if (res.error)
						return dialogDispatch({
							type: 'OPEN',
							payload: { title: 'Unable to Create Animal' },
						});
				})
				.catch(err => console.log(err));
		}
	};

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

	const renderShelterValues = () => {
		return shelters.map(s => {
			return (
				<MenuItem key={s.id} value={s.id}>
					{s.name}
				</MenuItem>
			);
		});
	};

	return (
		<>
			<VenueFormHeader headerText={'Add Animal'} />
			<form onSubmit={handlSubmit}>
				<Grid className={classes.container} spacing={2} container>
					<Grid item xs={false} sm={2}>
						{''}
					</Grid>
					<Grid
						className={clsx(classes.item, 'center-inputs')}
						item
						xs={12}
						sm={10}>
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
								name='animal_type'
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
					</Grid>

					<Grid item xs={false} sm={2}>
						{''}
					</Grid>

					<Grid
						className={clsx(classes.item, 'center-inputs')}
						item
						xs={12}
						sm={10}>
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
						<div className={classes.input}>
							<FormControl variant='outlined' className={classes.formControl}>
								<InputLabel id='shelter-select-label'>Shelter</InputLabel>
								<Select
									labelId='shelter-select-label'
									id='shelter-select'
									value={form.shelter_id}
									name='shelter_id'
									onChange={handleChange}>
									{renderShelterValues()}
								</Select>
							</FormControl>
						</div>
					</Grid>

					<Grid item xs={false} sm={2}>
						{''}
					</Grid>

					<Grid
						className={clsx(classes.item, 'center-inputs')}
						item
						xs={12}
						sm={10}>
						<div className={clsx(classes.input, 'description')}>
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
					{/* <Grid item xs={false} sm={4}>
						{''}
					</Grid> */}

					<Grid item xs={false} sm={2}>
						{''}
					</Grid>

					<Grid item xs={12} sm={10}>
						<div className={clsx(classes.input, classes.button)}>
							<Button type='submit' color='secondary' variant='contained'>
								Submit
							</Button>
						</div>
					</Grid>
				</Grid>
			</form>
		</>
	);
}
