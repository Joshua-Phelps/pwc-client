import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../App';
import { api } from '../services/api';
import PaintingForm from './PaintingForm';
import VenueHeader from './VenueHeader';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles(theme => ({
	container: {
		width: '100%',
		margin: 0,
	},
	heading: {
		padding: theme.spacing(2),
	},
	detailsDisplay: {
		padding: theme.spacing(1),
	},
	icon: {
		paddingLeft: theme.spacing(1),
	},
	paintingsDisplay: {
		paddingTop: theme.spacing(3),
	},
}));

export default function PaintLocationShowPage({ history, location }) {
	const classes = useStyles();
	const { animals, paintLoc } = useContext(StateContext);
	const { animalsDispatch, paintLocDispatch } = useContext(DispatchContext);
	const [loaded, setLoaded] = useState(false);
	const id = parseInt(location.pathname.split('/paint-locations/')[1]);
	const { name, email, phone_number, address } = paintLoc;

	useEffect(() => {
		fetchLocation();
	}, [location.pathname]);

	const fetchLocation = () => {
		api.paintLocs
			.getPaintLocById(id)
			.then(paintLoc => {
				return paintLocDispatch({
					type: 'SET_PAINT_LOCATION',
					payload: paintLoc,
				});
			})
			.then(() => setLoaded(true))
			.catch(err => console.log(err));
	};

	const handleEdit = id => {
		history.push(`/paintings/edit/${id}`);
	};

	return (
		<>
			{loaded && (
				<>
					<VenueHeader
						address={address}
						name={name}
						email={email}
						phone_number={phone_number}
					/>
				</>
			)}
		</>
	);
}
