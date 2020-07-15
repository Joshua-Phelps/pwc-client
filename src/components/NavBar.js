import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Menu, MenuItem, Grid } from '@material-ui/core/';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';

export default function NavBar({ history }) {
	const [anchorEl, setAnchorEl] = useState(false);
	const [tabEl, setTabEl] = useState(false);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(false);
	};

	const handleChange = (event, newValue) => {
		setTabEl(newValue);
		newValue === 0 && history.push('/animals');
		newValue === 1 && history.push('/galleries');
		newValue === 2 && history.push('/shelters');
		newValue === 3 && history.push('/paint-locations');
	};

	return (
		<AppBar position='static'>
			<Grid container>
				<Grid item xs={11}>
					<Tabs
						variant='fullWidth'
						value={tabEl}
						onChange={handleChange}
						aria-label='nav tabs example'>
						<Tab label='Animals' />
						<Tab label='Galleries' />
						<Tab label='Shelters' />
						<Tab label='Paint Locations' />
					</Tabs>
				</Grid>
				<Grid item xs={1}>
					<AccountCircleIcon
						aria-controls='simple-menu'
						aria-haspopup='true'
						// className={classes.account}
						onClick={handleClick}
						fontSize='large'
					/>
					<Menu
						id='simple-menu'
						anchorEl={anchorEl}
						keepMounted
						open={anchorEl}
						onClose={handleClose}>
						<MenuItem>My account</MenuItem>
						<MenuItem component={Link} to='/'>
							Logout
						</MenuItem>
					</Menu>
				</Grid>
			</Grid>
		</AppBar>
	);
}
