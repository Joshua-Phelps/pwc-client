import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import SearchBar from './SearchBar';
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
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import NavBarSmall from '../components/NavBarSmall';

const useStyles = makeStyles(theme => ({
	mainColor: {
		backgroundColor: theme.palette.primary.main,
		color: 'white',
	},
	icon: {
		alignItems: 'left',
	},
	iconContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		backgroundColor: theme.palette.secondary.main,
	},
}));

export default function NavBarLarge({ handleNavigate, history }) {
	const classes = useStyles();
	const [openSearch, setOpenSearch] = useState(false);
	const [tabEl, setTabEl] = useState(false);

	const handleChange = (e, newValue) => {
		setTabEl(newValue);
		handleNavigate(newValue);
	};

	const handleClick = () => setOpenSearch(!openSearch);

	return (
		<>
			<Grid container xs={12} className='large-view'>
				<Grid className={classes.mainColor} item xs={0} sm={1}>
					<div className={classes.iconContainer}>
						<MenuIcon onClick={handleClick} className={classes.icon} />
					</div>
				</Grid>
				<Grid className={classes.mainColor} item xs={0} sm={10}>
					<Tabs
						textColor='white'
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
				<Grid className={classes.mainColor} item sm={1}>
					<div className={classes.iconContainer}>
						<SearchIcon onClick={handleClick} className={classes.icon} />
					</div>
				</Grid>
				{openSearch && (
					<>
						<Grid item sm={2}>
							<div></div>
						</Grid>
						<Grid item sm={8}>
							<Paper className={classes.paper}>
								<SearchBar history={history} />
							</Paper>
						</Grid>
						<Grid item sm={2}>
							<div></div>
						</Grid>
					</>
				)}
			</Grid>
		</>
	);
}
