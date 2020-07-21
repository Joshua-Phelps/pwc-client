import React from 'react';
import Search from '../components/Search';

export default function SearchContainer({ history }) {
	return (
		<>
			<div className='small-view'>
				<Search history={history} />
			</div>
			<div className='large-view'>
				<Search history={history} />
			</div>
		</>
	);
}
