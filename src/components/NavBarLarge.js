import React, { useState, useEffect } from 'react';
import SearchAnimal from '../components/SearchAnimal';
import {
	AppBar,
	Tabs,
	Tab,
	Menu,
	MenuItem,
	Grid,
	Button,
	TextField,
	Paper,
} from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import NavBarSmall from '../components/NavBarSmall';

const useStyles = makeStyles(theme => ({
	search: {
		alignItems: 'left',
	},
	searchContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
}));

export default function NavBarLarge({ handleNavigate }) {
	const classes = useStyles();
	const [tabEl, setTabEl] = useState(false);

	const handleChange = (e, newValue) => {
		setTabEl(newValue);
		handleNavigate(newValue);
	};

	const handleClick = () => {
		// open search bar
	};

	return (
		<>
			<Grid className='large-view' container xs={12}>
				<Grid item xs={0} sm={1}></Grid>
				<Grid item xs={0} sm={10}>
					<Tabs
						wrapped={true}
						variant='fullWidth'
						value={tabEl}
						onChange={handleChange}
						aria-label='nav tabs'>
						<Tab label='Galleries' />
						<Tab label='Shelters' />
						<Tab label='Paint Locations' />
					</Tabs>
				</Grid>
				<Grid item sm={1}>
					<div className={classes.searchContainer}>
						<SearchIcon onClick={handleClick} className={classes.search} />
					</div>
				</Grid>
				<Grid item sm={2}>
					<div></div>
				</Grid>
				<Grid item sm={8}>
					<Paper className={classes.paper}>
						<SearchAnimal />
					</Paper>
				</Grid>
				<Grid item sm={2}>
					<div></div>
				</Grid>
			</Grid>
		</>
	);
}
