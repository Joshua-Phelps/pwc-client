import React, { useState } from 'react';
import Loading from '../components/Loading';

function IsLoadingHOC(WrappedComponent, loadingMessge = 'Loading...') {
	function HOC(props) {
		const [loading, setLoading] = useState(true);
		const setLoadingState = isComponentLoading => {
			setLoading(isComponentLoading);
		};
		return (
			<>
				{loading && <Loading message={loadingMessge} />}
				<WrappedComponent
					{...props}
					loading={loading}
					setLoading={setLoadingState}
				/>
			</>
		);
	}
	return HOC;
}

export default IsLoadingHOC;
