import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	FormControl,
	Select,
	MenuItem,
	InputLabel,
	TextField,
	Button,
	Grid,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	textField: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
}));

export default function Search() {
	const classes = useStyles();
	const [type, setType] = useState('');
	const [attribute, setAttribute] = useState('');
	const [searchValue, setSearchValue] = useState('');

	const handleChange = (e, cb) => {
		cb(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		console.log('Submitting', type, attribute, searchValue);
	};

	const renderAttributes = arr => {
		return arr.map((att, idx) => {
			return (
				<MenuItem key={idx} value={att}>
					{att}
				</MenuItem>
			);
		});
	};

	return (
		<Grid container alignContent='center'>
			<Grid item xs={0} sm={4}></Grid>
			<form>
				<Grid alignContent='center' item xs={12} sm={4}>
					<FormControl className={classes.formControl}>
						<InputLabel id='select-type-label'>Search for</InputLabel>
						<Select
							labelId='select-type-label'
							id='select-type'
							value={type}
							name='type'
							onChange={e => handleChange(e, setType)}>
							<MenuItem value={1}>Animal</MenuItem>
							<MenuItem value={2}>Gallery</MenuItem>
							<MenuItem value={3}>Paint Location</MenuItem>
							<MenuItem value={4}>Shelter</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<br></br>

				{type && (
					<>
						<FormControl className={classes.formControl}>
							<InputLabel id='select-type-label'>Search By</InputLabel>
							<Select
								labelId='elect-type-label'
								id='select-type'
								value={attribute}
								name='attribute'
								onChange={e => handleChange(e, setAttribute)}>
								{type === 1
									? renderAttributes(['Name', 'ID'])
									: renderAttributes(['Name'])}
							</Select>
						</FormControl>
						<br></br>
					</>
				)}

				{attribute && (
					// <Grid item xs={12} sm={12}>
					<div className={classes.textField}>
						<TextField
							id='outlined-name'
							label='Name'
							value={searchValue}
							onChange={e => handleChange(e, setSearchValue)}
							variant='outlined'
						/>
					</div>
					// </Grid>
				)}

				<Button variant='contained' type='submit' onClick={handleSubmit}>
					Submit
				</Button>
			</form>
			<Grid item xs={0} sm={4}></Grid>
		</Grid>
	);
}
