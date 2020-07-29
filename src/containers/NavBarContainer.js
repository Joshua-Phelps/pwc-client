import React, { useContext } from 'react';
import { StateContext } from '../App';
import { makeStyles } from '@material-ui/core/styles';
import NavBarSmall from '../components/NavBarSmall';
import NavBarLarge from '../components/NavBarLarge';

function NavBarContainer({ history, loggedIn }) {
	// const { loggedIn } = useContext(StateContext);
	const token = localStorage.getItem('token');
	const handleNavigate = value => {
		value === 0 && history.push('/galleries');
		value === 1 && history.push('/shelters');
		value === 2 && history.push('/paint-locations');
		value === 3 && history.push('/search-page');
	};

	return (
		<>
			{loggedIn && (
				<>
					<NavBarLarge handleNavigate={handleNavigate} history={history} />

					<NavBarSmall history={history} handleNavigate={handleNavigate} />
				</>
			)}
		</>
	);
}

export default NavBarContainer;
