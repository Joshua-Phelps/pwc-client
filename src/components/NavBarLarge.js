import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';
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
		color: theme.palette.colors.white,
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
		backgroundColor: theme.palette.secondary.grey.main,
	},
}));

export default function NavBarLarge({ handleNavigate, history }) {
	const classes = useStyles();
	const { logout } = useContext(AuthContext);
	const [openSearch, setOpenSearch] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);
	const [tabEl, setTabEl] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleChange = (e, newValue) => {
		setTabEl(newValue);
		handleNavigate(newValue);
	};

	const handleClick = (cb, value) => cb(!value);

	const handleMenu = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (path, cb) => {
		setAnchorEl(null);
		cb && cb();
		history.push(path);
	};

	return (
		<>
			<Grid container className='large-view'>
				<Grid className={classes.mainColor} item xs={false} sm={1}>
					<div className={classes.iconContainer}>
						<MenuIcon onClick={handleMenu} className={classes.icon} />
						<Menu
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={() => setAnchorEl(null)}>
							<MenuItem onClick={() => handleClose('/account')}>
								My Account
							</MenuItem>
							<MenuItem onClick={() => handleClose('/admin')}>Admin</MenuItem>
							<MenuItem onClick={() => handleClose('/login', logout)}>
								Logout
							</MenuItem>
						</Menu>
					</div>
				</Grid>
				<Grid className={classes.mainColor} item xs={false} sm={10}>
					<Tabs
						textColor='inherit'
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
						<SearchIcon
							onClick={() => handleClick(setOpenSearch, openSearch)}
							className={classes.icon}
						/>
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
