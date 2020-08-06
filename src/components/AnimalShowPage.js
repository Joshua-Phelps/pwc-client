import React, { useState, useEffect, useContext } from 'react';
import { api } from '../services/api';
import { Grid, makeStyles, Button } from '@material-ui/core';
import PaintingsTable from './PaintingsTable';
import AnimalInfoDisplay from './AnimalInfoDisplay';
import AnimalHeading from './AnimalHeading';
import { StateContext, DispatchContext } from '../App';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	button: {
		padding: theme.spacing(2),
		marginTop: theme.spacing(2),
		display: 'inline-block',
	},
	gridContainer: {
		paddingBottom: theme.spacing(4),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
	},
	addButtonContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: theme.spacing(4),
	},
	formSmall: {
		height: '10px',
	},
}));

export default function AnimalShowPage({ history, location }) {
	const classes = useStyles();
	const { animal } = useContext(StateContext);
	const { animalDispatch, paintFormPropsDispatch } = useContext(
		DispatchContext
	);
	const [loaded, setLoaded] = useState(false);
	const id = parseInt(location.pathname.split('/animals/')[1]);

	useEffect(() => {
		console.log('using Effect in Aninal show');
		api.animals
			.getAnimalById(id)
			.then(ani => {
				if (ani.error) {
					return history.push('/not-found');
				} else {
					return animalDispatch({
						type: 'SET',
						payload: ani,
					});
				}
			})
			.then(() => {
				setLoaded(true);
			})
			.catch(err => console.log(err));
	}, [loaded, id, history, animalDispatch]);

	const handleOpenForm = () => {
		paintFormPropsDispatch({
			type: 'SET',
			payload: {
				updateAnimal: true,
				animalId: id,
				animalName: animal.name,
				open: true,
			},
		});
	};

	return (
		<>
			{loaded && (
				<div className={classes.root}>
					<AnimalHeading />

					<Grid container className={classes.gridContainer}>
						<Grid item xs={false} sm={1} className='large-view'></Grid>
						<Grid item xs={12} sm={10}>
							<AnimalInfoDisplay />
						</Grid>
					</Grid>

					<Grid container className={classes.gridContainer}>
						<Grid item xs={false} sm={1} className='large-view'></Grid>
						<Grid item xs={12} sm={10}>
							<PaintingsTable />
						</Grid>
					</Grid>

					<Grid container>
						<Grid item xs={false} sm={9} className='large-view'></Grid>
						<div className={classes.addButtonContainer}>
							<Button
								color='secondary'
								variant='contained'
								type='button'
								onClick={handleOpenForm}>
								Add Painting
							</Button>
						</div>
						<Grid item xs={12} sm={3}></Grid>
					</Grid>
				</div>
			)}
		</>
	);
}
