import React from 'react';
import SearchPage from '../components/SearchPage';

export default function SearchContainer({ history }) {
	return (
		<>
			<div className='small-view'>
				<SearchPage history={history} />
			</div>
			<div className='large-view'>
				<SearchPage history={history} />
			</div>
		</>
	);
}
