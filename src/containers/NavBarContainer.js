import React from 'react';
import NavBarSmall from '../components/NavBarSmall';
import NavBarLarge from '../components/NavBarLarge';

function NavBarContainer({ history, loggedIn }) {
	const handleNavigate = value => {
		value === 0 && history.push('/galleries');
		value === 1 && history.push('/shelters');
		value === 2 && history.push('/paint-locations');
		value === 3 && history.push('/search-page');
		value === 4 && history.push('/admin');
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
