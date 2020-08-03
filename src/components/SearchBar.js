import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { StateContext, MessageContext, DispatchContext } from '../App';
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
import { render } from '@testing-library/react';

const useStyles = makeStyles(theme => ({
	root: {
		// backgroundColor: theme.palette.secondary.light,
	},
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

export default function SearchAnimal() {
	const history = useHistory();
	const classes = useStyles();
	const { galleries, shelters, paintLocs, photos } = useContext(StateContext);
	const { errorMessage } = useContext(MessageContext);
	const { photosDispatch } = useContext(DispatchContext);
	const [select1, setSelect1] = useState('');
	const [select2, setSelect2] = useState('');
	const [textField, setTextField] = useState('');

	const getId = (arr, name) => arr.filter(el => el.name === name && el.id)[0];

	const firstOptions = {
		tasks: ['Tasks'],
		animals: ['Animals'],
		other: ['Galleries', 'Shelters', 'Paint Locations'],
	};
	const secondOptions = {
		tasks: ['Get Photos - Full Background', 'Get Photos - print ready'],
		animals: ['ID', 'Name'],
	};
	const allFirstOptions = firstOptions.tasks
		.concat(firstOptions.animals)
		.concat(firstOptions.other);

	const handleChange = (e, setState, inputNum) => {
		if (inputNum === 1) {
			setSelect2('');
			setTextField('');
		}
		setState(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		// for TASKS
		if (hasValues(select1, firstOptions.tasks)) {
			if (select2 === secondOptions.tasks[0]) {
				return history.push('/photos/full-background');
			} else {
				return history.push('/photos/print-ready');
			}

			// for ANIMALS
		} else if (hasValues(select1, firstOptions.animals)) {
			if (!textField)
				return alert(`Please enter animal ${select2.toLowerCase()}`);
			if (select2 === secondOptions.animals[0]) {
				// for ID
				history.push(`/animals/${textField}`);
			} else if (select2 === secondOptions.animals[1]) {
				//for NAME
				api.animals
					.getAnimalByName(textField)
					.then(res => {
						if (!res.error) {
							if (res.length > 1) {
								console.log(res);
								return;
								// render animal cards with results
							} else {
								return history.push(`/animals/${res[0].id}`);
							}
						} else {
							console.log(res);
							alert('Animal Not Found!');
						}
					})
					.catch(err => console.log(err));
			}

			// for Galleries, paint locs, and shelters
		} else {
			if (select1 === firstOptions.other[0]) {
				history.push(`/galleries/${select2}`);
			} else if (select1 === firstOptions.other[1]) {
				history.push(`/shelters/${select2}`);
			} else if (select1 === firstOptions.other[2]) {
				history.push(`/paint-locations/${select2}`);
			}
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

	const renderOtherMenuItems = arr => {
		return arr.map(el => {
			return (
				<MenuItem key={el.id} value={el.id}>
					{el.name}
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
		<form className={classes.root} onSubmit={handleSubmit}>
			<Grid container spacing={1}>
				<Grid item xs={10} sm={3}>
					<FormControl
						color='primary'
						variant='outlined'
						className={classes.formControl}>
						<InputLabel className={classes.label} id='select-type-label'>
							Select
						</InputLabel>
						<Select
							labelId='select-type-label'
							id='select-type'
							value={select1}
							name='input-one'
							onChange={e => handleChange(e, setSelect1, 1)}>
							{renderMenuItems(allFirstOptions)}
						</Select>
					</FormControl>
				</Grid>

				{hasValues(select1, allFirstOptions) && (
					<Grid item xs={10} sm={3}>
						<FormControl
							color='primary'
							variant='outlined'
							className={classes.formControl}>
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
								onChange={e => handleChange(e, setSelect2, 2)}>
								{hasValues(select1, firstOptions.tasks) &&
									renderMenuItems(secondOptions.tasks)}

								{hasValues(select1, firstOptions.animals) &&
									renderMenuItems(secondOptions.animals)}

								{hasValues(select1, [firstOptions.other[0]]) &&
									renderOtherMenuItems(galleries)}

								{hasValues(select1, [firstOptions.other[1]]) &&
									renderOtherMenuItems(shelters)}

								{hasValues(select1, [firstOptions.other[2]]) &&
									renderOtherMenuItems(paintLocs)}
							</Select>
						</FormControl>
					</Grid>
				)}

				{hasValues(select1, firstOptions.animals) && (
					<Grid item xs={10} sm={3}>
						<div className={classes.formControl}>
							<TextField
								color='primary'
								id='search-animal'
								label={`Enter ${select2}`}
								value={textField}
								type={select2 === 'ID' ? 'number' : 'string'}
								className={classes.search}
								onChange={e => handleChange(e, setTextField, 3)}
								variant='outlined'
							/>
						</div>
					</Grid>
				)}

				{select1 && select2 && (
					<Grid item xs={10} sm={3}>
						<div className={classes.buttonContainer}>
							<Button type='submit' color='primary' variant='contained'>
								Submit
							</Button>
						</div>
					</Grid>
				)}
			</Grid>
		</form>
	);
}
