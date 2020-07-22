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
	Paper,
	Typography,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		width: '71%',
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	form: {
		textAlign: 'center',
		padding: theme.spacing(2),
	},
	button: {
		padding: theme.spacing(2),
	},
	textField: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	gridItem: {
		width: '100%',
	},
	root: {
		flexGrow: 1,
		width: '100%',
		margin: 0,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
}));

export default function SearchPage({ history }) {
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
		<div className={classes.root}>
			<Grid
				justify='center'
				alignItems='center'
				className={classes.root}
				container
				spacing={3}>
				<Grid className='form-large' item xs={0} sm={4}>
					<div className={classes.paper}></div>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Paper className={(classes.paper, classes.form)}>
						<Typography variant='h5'>Search Form</Typography>
						<form className={classes.form}>
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
												? renderAttributes(['ID', 'Name'])
												: renderAttributes(['Name'])}
										</Select>
									</FormControl>
									<br></br>
								</>
							)}

							{attribute && (
								<>
									<div className={classes.textField}>
										<TextField
											id='outlined-name'
											label={attribute}
											value={searchValue}
											onChange={e => handleChange(e, setSearchValue)}
											variant='outlined'
										/>
									</div>
									<div className={classes.button}>
										<Button
											variant='contained'
											type='submit'
											onClick={handleSubmit}>
											Submit
										</Button>
									</div>
								</>
							)}
						</form>
					</Paper>
				</Grid>
				<Grid className='form-large' item xs={0} sm={4}>
					<div className={classes.paper}></div>
				</Grid>
			</Grid>
		</div>
	);
}
