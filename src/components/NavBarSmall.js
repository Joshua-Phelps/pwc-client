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
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@material-ui/core';
import BrushIcon from '@material-ui/icons/Brush';
import HomeIcon from '@material-ui/icons/Home';
import PetsIcon from '@material-ui/icons/Pets';
import MenuIcon from '@material-ui/icons/Menu';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import SearchIcon from '@material-ui/icons/Search';

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
		width: '90%',
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	caption: {
		textAlign: 'center',
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
		index === 1 && history.push('/shelters');
		index === 2 && history.push('/galleries');
		index === 3 && history.push('/paint-locations');
		index === 4 && history.push('/search-page');
	};

	const list = () => (
		<div className={classes.list} role='presentation'>
			<List>
				{[
					'Animals',
					'Shelters',
					'Galleries',
					'Painting Locations',
					'Search Page',
				].map((text, index) => (
					<ListItem onClick={() => handleVisitPage(index)} button key={text}>
						<ListItemIcon>
							{index === 0 && <PetsIcon />}
							{index === 1 && <HomeIcon />}
							{index === 2 && <PhotoLibraryIcon />}
							{index === 3 && <BrushIcon />}
							{index === 4 && <SearchIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				<br></br>
				<div className={classes.caption}>
					<Typography align='center' variant='caption'>
						Quick Seach
					</Typography>
				</div>
				<ListItem>
					<form
						onSubmit={handleSearch}
						className={classes.root}
						noValidate
						autoComplete='off'>
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
			<Button onClick={toggleDrawer}>
				<MenuIcon />
			</Button>
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
