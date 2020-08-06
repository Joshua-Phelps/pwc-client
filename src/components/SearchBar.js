import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { StateContext } from '../App';
import { makeStyles } from '@material-ui/core/styles';
import { api } from '../services/api';
import {
	Grid,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
} from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
	largeContainer: {
		margin: '-17px',
	},
	smallContainer: {
		padding: theme.spacing(5),
	},
	formControl: {
		margin: theme.spacing(1),
		width: '100%',
		textAlign: 'left',
		spacing: theme.spacing(2),
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
	const { galleries, shelters, paintLocs } = useContext(StateContext);
	const [select1, setSelect1] = useState('');
	const [select2, setSelect2] = useState('');
	const [textField, setTextField] = useState('');

	const firstOptions = {
		tasks: ['Tasks'],
		animals: ['Animals'],
		other: ['Galleries', 'Shelters', 'Paint Locations'],
	};
	const secondOptions = {
		tasks: ['Photos That Need Background Removed', 'Print Ready'],
		animals: ['ID', 'Name'],
	};
	const allFirstOptions = firstOptions.tasks.concat(
		firstOptions.animals,
		firstOptions.other
	);

	const handleChange = (e, setState, inputNum) => {
		if (inputNum === 1) {
			setSelect2('');
			setTextField('');
		}
		setState(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		// for Photos
		if (firstOptions.tasks.includes(select1)) {
			if (select2 === secondOptions.tasks[0]) {
				return history.push('/photos/full-background');
			} else {
				return history.push('/photos/print-ready');
			}

			// for ANIMALS
		} else if (firstOptions.animals.includes(select1)) {
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

	const renderGrid = () => {
		return (
			<>
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

				{allFirstOptions.includes(select1) && (
					<Grid item xs={10} sm={3}>
						<FormControl
							color='primary'
							variant='outlined'
							className={classes.formControl}>
							<InputLabel className={classes.label} id='select-attribute-label'>
								{firstOptions.tasks.includes(select1) && 'Task'}
								{firstOptions.animals.includes(select1) && 'By'}
								{firstOptions.other.includes(select1) && 'Name'}
							</InputLabel>
							<Select
								labelId='select-attribute-label'
								id='select-attribute'
								value={select2}
								name='input-two'
								onChange={e => handleChange(e, setSelect2, 2)}>
								{firstOptions.tasks.includes(select1) &&
									renderMenuItems(secondOptions.tasks)}
								{firstOptions.animals.includes(select1) &&
									renderMenuItems(secondOptions.animals)}
								{firstOptions.other[0] === select1 &&
									renderOtherMenuItems(galleries)}
								{firstOptions.other[1] === select1 &&
									renderOtherMenuItems(shelters)}
								{firstOptions.other[2] === select1 &&
									renderOtherMenuItems(paintLocs)}
							</Select>
						</FormControl>
					</Grid>
				)}

				{firstOptions.animals.includes(select1) && (
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
							<Button type='submit' color='secondary' variant='contained'>
								Submit
							</Button>
						</div>
					</Grid>
				)}
			</>
		);
	};

	return (
		<form onSubmit={handleSubmit}>
			<Grid
				className={clsx(classes.largeContainer, 'large-view')}
				container
				spacing={3}>
				{renderGrid()}
			</Grid>
			<Grid
				className={clsx(classes.smallContainer, 'small-view')}
				container
				spacing={3}>
				{renderGrid()}
			</Grid>
		</form>
	);
}
