import React, { useState, useEffect, useReducer, useContext } from 'react';
import { StateContext, DispatchContext } from '../App';
import { api } from '../services/api';
import { paintLocationReducer } from '../reducers/Reducers';
import PaintingForm from './PaintingForm';

const initialState = {
	id: null,
	address: '',
	name: '',
	max_paintings: null,
	current_paintings: [],
	available_paintings: [],
};

export default function PaintLocationShowPage({ history, location }) {
	const { animals, paintLoc } = useContext(StateContext);
	const { animalsDispatch, paintLocDispatch } = useContext(DispatchContext);

	const [update, setUpdate] = useState(false);
	const id = parseInt(location.pathname.split('/paint-locations/')[1]);

	useEffect(() => {
		fetchLocation();
	}, [location.pathname]);

	const fetchLocation = () => {
		// api.paintLocs
		// 	.getPaintLocById(id)
		// 	.then(paintLoc => {
		// 		paintLocationDispatch({
		// 			type: 'SET_PAINT_LOCATION',
		// 			payload: paintLoc,
		// 		});
		// 	})
		// 	.catch(err => console.log(err));
	};

	const handleEdit = id => {
		history.push(`/paintings/edit/${id}`);
	};

	const renderCurrentPaintings = () => {
		// return paintLocation.current_paintings.map(paint => {
		// 	let animal = animals.find(ani => ani.id === paint.animal_id) || {
		// 		name: '',
		// 		animal_type: '',
		// 	};
		// 	return (
		// 		<div>
		// 			<h1>
		// 				{animal.animal_type}: {animal.name}
		// 			</h1>
		// 			<h3>Paint ID: {paint.id}</h3>
		// 			<button onClick={() => handleEdit(paint.id)}>Edit</button>
		// 		</div>
		// 	);
		// });
	};
	const renderAvailablePaintings = () => {};

	return (
		<>
			{/* {loaded && ( */}
			<>
				{/* <Grid container>
						<Grid item xs={12} sm={12}>
							<Typography className={classes.heading} variant='h1'>
								{name}
							</Typography>
						</Grid>
						<Grid item sm={2} xs={0}></Grid>
						<Grid className={classes.detailsDisplay} item xs={12} sm={10}>
							<Typography variant='subtitle1'>
								<PhoneIcon />{' '}
								<span className={classes.icon}>{phone_number}</span>
								<br></br>
								<EmailIcon /> <span className={classes.icon}>{email}</span>
								<br></br>
								<HomeIcon /> <span className={classes.icon}>{address}</span>
								<br></br>
							</Typography>
						</Grid>
					</Grid>
					<Divider className={classes.divider} /> */}
			</>
			)}
		</>
	);
}
