import React, { useState } from 'react';
import { api } from '../services/api';
import { makeStyles } from '@material-ui/core/styles';
import {
	SwipeableDrawer,
	Button,
	List,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@material-ui/core';
import BrushIcon from '@material-ui/icons/Brush';
import HomeIcon from '@material-ui/icons/Home';
import PetsIcon from '@material-ui/icons/Pets';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

const useStyles = makeStyles(theme => ({
	list: {
		width: 250,
	},
	button: {
		padding: '10px',
		textAlign: 'center',
	},
	formControl: {
		margin: theme.spacing(1),
		// minWidth: 120,
		width: '90%',
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

export default function NavBarSmall({ history }) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');
	const [select, setSelect] = useState('');

	const toggleDrawer = () => {
		setOpen(!open);
	};

	const handleSearch = e => {
		e.preventDefault();
		console.log('searching');
		history.push(`/animals/${search}`);
		// let id = parseInt(search);
		// api.animals
		// 	.getAnimalById(id)
		// 	.then(animal => {
		// 		if(animal,)
		// 	})
		// 	.catch(err => console.log(err));
	};

	const handleChange = e => {
		setSearch(e.target.value);
	};

	const handleSelect = event => {
		setSelect(event.target.value);
	};

	const handleVisitPage = index => {
		// toggleDrawer(false);
		setOpen(false);
		index === 0 && history.push('/animals');
		index === 1 && history.push('/galleries');
		index === 2 && history.push('/shelters');
		index === 3 && history.push('/paint-locations');
	};

	const list = () => (
		<div
			className={classes.list}
			role='presentation'
			// onClick={handleVisitPage()}
		>
			<List>
				{['Animals', 'Shelters', 'Galleries', 'Paint Locations'].map(
					(text, index) => (
						<ListItem onClick={() => handleVisitPage(index)} button key={text}>
							<ListItemIcon>
								{index === 0 && <PetsIcon />}
								{index === 1 && <HomeIcon />}
								{index === 2 && <PhotoLibraryIcon />}
								{index === 3 && <BrushIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					)
				)}
			</List>
			<Divider />
			<List>
				<ListItem>
					<form
						onSubmit={handleSearch}
						className={classes.root}
						noValidate
						autoComplete='off'>
						{/* <FormControl className={classes.formControl}>
							<InputLabel id='demo-simple-select-label'>Age</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={select}
								onChange={handleSelect}>
								<MenuItem value={10}>Name</MenuItem>
								<MenuItem value={20}>Id</MenuItem>
							</Select>
						</FormControl> */}
						<TextField
							value={search}
							id='search-animal'
							label='Search Animal By ID'
							name='search'
							onChange={handleChange}
							variant='outlined'
						/>
						<div className={classes.button}>
							<Button variant='contained'>Search</Button>
						</div>
					</form>
				</ListItem>
			</List>
		</div>
	);

	return (
		<div>
			<Button onClick={toggleDrawer}>Menu</Button>
			<SwipeableDrawer
				disableBackdropTransition
				open={open}
				onClose={toggleDrawer}
				onOpen={toggleDrawer}>
				{list()}
			</SwipeableDrawer>
		</div>
	);
}
