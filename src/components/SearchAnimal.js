import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Grid,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		width: '100%',
	},
	gridSpacing: {
		padding: theme.spacing(1),
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

export default function SearchInput({ fetch }) {
	const classes = useStyles();
	const [input, setInput] = useState('');

	const handleChange = e => setInput(e.target.value);

	const handleClick = () => {};

	const renderSearchOptions = () => {};

	return (
		<form>
			<Grid container spacing={1}>
				<Grid item sm={3}>
					<FormControl variant='outlined' className={classes.formControl}>
						<InputLabel id='select-status-label'>Search for</InputLabel>
						<Select
							labelId='select-status-label'
							id='simple-select-status'
							value={''}
							name='painting_status'
							onChange={handleChange}>
							{renderSearchOptions()}
							<MenuItem value={1}>Animal</MenuItem>
							<MenuItem value={2}>Gallery</MenuItem>
							<MenuItem value={3}>Paint Location</MenuItem>
							<MenuItem value={4}>Shelter</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				<Grid item sm={3}>
					<FormControl variant='outlined' className={classes.formControl}>
						<InputLabel id='select-status-label'>By</InputLabel>
						<Select
							labelId='select-status-label'
							id='simple-select-status'
							value={input}
							name='painting_status'
							onChange={handleChange}>
							{renderSearchOptions()}
							<MenuItem value={1}>ID</MenuItem>
							<MenuItem value={2}>Paint Ready</MenuItem>
							<MenuItem value={3}>Needs Background Removed</MenuItem>
							<MenuItem value={4}>Shelter</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				<Grid item sm={4}>
					<div className={classes.formControl}>
						<TextField
							id='search-animal'
							label='Search Animal By Id'
							value={input}
							className={classes.search}
							onChange={handleChange}
							variant='outlined'
						/>
					</div>
				</Grid>
			</Grid>
		</form>
	);
}
