import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../App';
import { api } from '../services/api';
import VenueHeader from './VenueHeader';

export default function PaintLocationShowPage({ history, location }) {
	const { paintLoc } = useContext(StateContext);
	const { paintLocDispatch } = useContext(DispatchContext);
	const [loaded, setLoaded] = useState(false);
	const id = parseInt(location.pathname.split('/paint-locations/')[1]);
	const { name, email, phone_number, address } = paintLoc;

	useEffect(() => {
		api.paintLocs
			.getPaintLocById(id)
			.then(paintLoc => {
				return paintLocDispatch({
					type: 'SET',
					payload: paintLoc,
				});
			})
			.then(() => setLoaded(true))
			.catch(err => console.log(err));
	}, [paintLocDispatch, id]);

	const handleUpdatePaintLocation = () => {};

	return (
		<>
			{loaded && (
				<>
					<VenueHeader
						address={address}
						name={name}
						email={email}
						phone_number={phone_number}
						btnText={'Update Paint Location'}
						handleButton={handleUpdatePaintLocation}
					/>
				</>
			)}
		</>
	);
}
