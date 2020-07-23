import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Grid,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
} from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import { api } from '../services/api';

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		width: '100%',
		textAlign: 'left',
	},
	gridSpacing: {
		padding: theme.spacing(1),
	},
	label: {
		textAlign: 'left',
	},
	buttonContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		padding: theme.spacing(1),
	},
}));

export default function SearchAnimal({ history }) {
	const classes = useStyles();
	const [select1, setSelect1] = useState('');
	const [select2, setSelect2] = useState('');
	const [textField, setTextField] = useState('');
	const firstOptions = {
		tasks: ['Tasks'],
		animals: ['Animals'],
		other: ['Galleries', 'Shelters', 'Paint Locations'],
	};
	// const firstOptions1 = ['Tasks'];
	// const firstOptions2 = ['Animals'];
	// const firstOptions3 = ['Galleries', 'Shelters', 'Paint Locations'];

	const secondOptions = {
		tasks: ['Photos need background removed', 'Photos ready for print'],
		animals: ['ID', 'Name'],
	};
	const allFirstOptions = firstOptions.tasks
		.concat(firstOptions.animals)
		.concat(firstOptions.other);

	const handleChange = (e, setState) => setState(e.target.value);

	const handleSubmit = e => {
		e.preventDefault();
		// for TASKS
		if (hasValues(select1, firstOptions.tasks)) {
			if (hasValues(select2, secondOptions.tasks[0])) {
				api.photos.getIncompletePhotos();
			} else {
				api.photos.getPrintReadyPhotos();
			}

			// for ANIMALS
		} else if (hasValues(select1, firstOptions.animals)) {
			if (select2 === secondOptions.animals[0]) {
				// for ID
				history.push(`/animals/${textField}`);
			} else if (select2 === secondOptions.animals[1]) {
				//for NAME
				api.animals
					.getAnimalByName(textField)
					.then(res => {
						res.id
							? history.push(`/animals/${res.id}`)
							: alert('Animal Not Found!');
					})
					.catch(err => console.log(err));
			}

			//for Galleries, paint locs, and shelters
		} else if (hasValues(select1, firstOptions.other)) {
			// look through state
			console.log('looking through state');
		}
	};

	const clearState = () => {
		setSelect1('');
		setSelect2('');
		setTextField('');
	};

	const renderMenuItems = arr => {
		return arr.map(text => {
			return (
				<MenuItem key={text} value={text}>
					{text}
				</MenuItem>
			);
		});
	};

	const hasValues = (state, values) => {
		for (let i = 0; i < values.length; i++) {
			if (values[i] === state) return true;
		}
		return false;
	};

	return (
		<form onSubmit={handleSubmit}>
			<Grid container spacing={1}>
				<Grid item sm={3}>
					<FormControl variant='outlined' className={classes.formControl}>
						<InputLabel className={classes.label} id='select-type-label'>
							Search
						</InputLabel>
						<Select
							labelId='select-type-label'
							id='select-type'
							value={select1}
							name='input-one'
							onChange={e => handleChange(e, setSelect1)}>
							{renderMenuItems(allFirstOptions)}
						</Select>
					</FormControl>
				</Grid>

				{hasValues(
					select1,
					firstOptions.tasks.concat(firstOptions.animals)
				) && (
					<Grid item sm={3}>
						<FormControl variant='outlined' className={classes.formControl}>
							<InputLabel className={classes.label} id='select-attribute-label'>
								{hasValues(select1, firstOptions.tasks) && 'To-do'}
								{hasValues(select1, firstOptions.animals) && 'By'}
								{hasValues(select1, firstOptions.other) && 'Name'}
							</InputLabel>
							<Select
								labelId='select-attribute-label'
								id='select-attribute'
								value={select2}
								name='input-two'
								onChange={e => handleChange(e, setSelect2)}>
								{hasValues(select1, firstOptions.tasks) &&
									renderMenuItems(secondOptions.tasks)}

								{hasValues(select1, firstOptions.animals) &&
									renderMenuItems(secondOptions.animals)}
							</Select>
						</FormControl>
					</Grid>
				)}

				{hasValues(select1, firstOptions.animals) && (
					<Grid item sm={3}>
						<div className={classes.formControl}>
							<TextField
								id='search-animal'
								label={`Enter ${select2}`}
								value={textField}
								type={select2 === 'ID' ? 'number' : 'string'}
								className={classes.search}
								onChange={e => handleChange(e, setTextField)}
								variant='outlined'
							/>
						</div>
					</Grid>
				)}
				{(hasValues(select1, firstOptions.tasks) &&
					hasValues(select2, secondOptions.tasks)) ||
					(hasValues(select1, firstOptions.animals) &&
						hasValues(select2, secondOptions.animals)) ||
					(hasValues(select1, firstOptions.other) &&
						!hasValues(
							select2,
							secondOptions.tasks.concat(secondOptions.animals).concat([''])
						) && (
							<Grid item sm={3}>
								<div className={classes.buttonContainer}>
									<Button type='submit' color='primary' variant='outlined'>
										Submit
									</Button>
								</div>
							</Grid>
						))}
			</Grid>
		</form>
	);
}
