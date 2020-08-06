import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';
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
	makeStyles,
} from '@material-ui/core';
import BrushIcon from '@material-ui/icons/Brush';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
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

export default function NavBarSmall({ handleNavigate, history }) {
	const classes = useStyles();
	const { user } = useContext(AuthContext);
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');

	const listItems = [
		'Galleries',
		'Shelters',
		'Painting Locations',
		'Search Page',
		'Admin',
	];

	const toggleDrawer = () => {
		setOpen(!open);
	};

	const handleSearch = e => {
		e.preventDefault();
		history.push(`/animals/${search}`);
	};

	const handleChange = e => {
		setSearch(e.target.value);
	};

	const handleClick = index => {
		setOpen(false);
		handleNavigate(index);
	};

	const list = () => (
		<div className={classes.list} role='presentation'>
			<List>
				{listItems.map((text, index) => (
					<ListItem onClick={() => handleClick(index)} button key={text}>
						<ListItemIcon>
							{index === 0 && <PhotoLibraryIcon />}
							{index === 1 && <PetsIcon />}
							{index === 2 && <BrushIcon />}
							{index === 3 && <SearchIcon />}
							{user.permission_level > 1 && index === 4 && (
								<SupervisorAccountIcon />
							)}
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
							<Button onClick={handleSearch} variant='contained'>
								Search
							</Button>
						</div>
					</form>
				</ListItem>
			</List>
		</div>
	);

	return (
		<div className='small-view'>
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
