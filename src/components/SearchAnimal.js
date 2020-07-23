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
		// width: '100%',
		textAlign: 'left',
	},
	// search: {
	// 	alignItems: 'left',
	// },
	// searchContainer: {
	// 	display: 'flex',
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// 	height: '100%',
	// },
}));

let secondSelectOptions1 = [
	'Photos need background removed',
	'Photos ready for print',
];
let secondSelectOptions2 = ['ID', 'Name'];

let firstSelectOptions1 = ['Tasks'];
let firstSelectOptions2 = [
	'Animals',
	'Galleries',
	'Shelters',
	'Paint Locations',
];

export default function SearchAnimal({ fetch }) {
	const classes = useStyles();
	const [select1, setSelect1] = useState('');
	const [select2, setSelect2] = useState('');
	const [task, setTask] = useState('');
	const [textField, setTextField] = useState('');

	const handleChange = (e, setState) => setState(e.target.value);

	const handleClick = () => {};

	const renderMenuItems = arr => {
		return arr.map((text, idx) => {
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
		<form>
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
							{renderMenuItems(firstSelectOptions1.concat(firstSelectOptions2))}
						</Select>
					</FormControl>
				</Grid>

				{!hasValues(select1, ['']) && (
					<Grid item sm={3}>
						<FormControl variant='outlined' className={classes.formControl}>
							<InputLabel className={classes.label} id='select-attribute-label'>
								{select1 === 'Tasks' ? 'To-do' : select1 === '' ? '' : 'By'}
							</InputLabel>
							<Select
								labelId='select-attribute-label'
								id='select-attribute'
								value={select2}
								name='input-two'
								onChange={e => handleChange(e, setSelect2)}>
								{hasValues(select1, firstSelectOptions1) &&
									renderMenuItems(secondSelectOptions1)}

								{hasValues(select1, firstSelectOptions2) &&
									renderMenuItems(secondSelectOptions2)}
							</Select>
						</FormControl>
					</Grid>
				)}

				{hasValues(select1, firstSelectOptions2) &&
					hasValues(select2, secondSelectOptions2) && (
						<Grid item sm={4}>
							<div className={classes.formControl}>
								<TextField
									id='search-animal'
									label={`Enter ${select2}`}
									value={textField}
									className={classes.search}
									onChange={e => handleChange(e, setTextField)}
									variant='outlined'
								/>
							</div>
						</Grid>
					)}
				{((hasValues(select1, firstSelectOptions1) &&
					hasValues(select2, secondSelectOptions1)) ||
					(hasValues(select1, firstSelectOptions2) &&
						hasValues(select2, secondSelectOptions2))) && (
					<Grid item sm={4}>
						<Button variant='outlined'>Submit</Button>
					</Grid>
				)}
			</Grid>
		</form>
	);
}
