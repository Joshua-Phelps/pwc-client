import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NavBarSmall from '../components/NavBarSmall';
import NavBarLarge from '../components/NavBarLarge';

export default function NavBarContainer({ history }) {
	const handleNavigate = value => {
		value === 0 && history.push('/galleries');
		value === 1 && history.push('/shelters');
		value === 2 && history.push('/paint-locations');
		value === 3 && history.push('/search-page');
	};

	return (
		<>
			<NavBarLarge handleNavigate={handleNavigate} history={history} />

			<NavBarSmall history={history} handleNavigate={handleNavigate} />

			{/* <Grid item xs={1}>
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
				</Grid> */}
		</>
	);
}
