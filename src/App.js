import React, { useReducer, useEffect, createContext, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { api } from './services/api';
import './App.css';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import AnimalCardsContainer from './containers/AnimalCardsContainer';
import GalleryCardsContainer from './containers/GalleryCardsContainer';
import PaintLocContainer from './containers/PaintLocContainer';
import AnimalShowPage from './components/AnimalShowPage';
import GalleryShowPage from './components/GalleryShowPage';
import PaintLocationShowPage from './components/PaintLocationShowPage';
import PaintingForm from './components/PaintingForm';
import SheltersContainer from './containers/SheltersContainer';
import ShelterShowPage from './components/ShelterShowPage';
import {
	animalsReducer,
	galleriesReducer,
	paintLocsReducer,
	sheltersReducer,
	selectAnimalReducer,
	formReducer,
} from './reducers/Reducers';
import AnimalCard from './components/AnimalCard';

export const StateContext = createContext();
export const DispatchContext = createContext();

function App() {
	const [animals, animalsDispatch] = useReducer(animalsReducer, []);
	const [selectAnimal, selectAnimalDispatch] = useReducer(
		selectAnimalReducer,
		{}
	);
	const [galleries, galleriesDispatch] = useReducer(galleriesReducer, []);
	const [paintLocs, paintLocsDispatch] = useReducer(paintLocsReducer, []);
	const [shelters, sheltersDispatch] = useReducer(sheltersReducer, []);
	const [form, formDispatch] = useReducer(formReducer, {});

	const state = { animals, galleries, paintLocs, selectAnimal, form };
	const dispatch = { selectAnimalDispatch, formDispatch };

	useEffect(() => {
		setPaintLocs();
		setGalleries();
		setShelters();
		setPaintLocs();

		// const token = localStorage.getItem("token");
		// if (token) {
		// setLoading(true)
		api.animals
			.getAnimals()
			.then(animals => {
				// console.log(animals);
				animalsDispatch({ type: 'SET_ANIMALS', payload: animals });
			})
			.catch(error => console.log(error));
		// api.paintLocs.getPaintLocs().then(paintLocs =>
		// 	paintLocsDispatch({
		// 		type: 'SET_GALLERIES',
		// 		payload: paintLocs,
		// 	})
		// );
		// const setGalleries = api.galleries.getGalleries().then(galleries =>
		// 	galleriesDispatch({
		// 		type: 'SET_GALLERIES',
		// 		payload: galleries,
		// 	})
		// );
		// }
	}, []);

	// const animalsByDisplayLocation = dispLocId => {
	// 	return animals.filter(a => a.current_display_location_id === dispLocId);
	// };

	const setPaintLocs = () => {
		api.paintLocs
			.getPaintLocs()
			.then(paintLocs => {
				console.log(paintLocs);
				paintLocsDispatch({
					type: 'SET_PAINT_LOCS',
					payload: paintLocs,
				});
			})
			.catch(err => console.log(err));
	};

	const setGalleries = () => {
		api.galleries
			.getGalleries()
			.then(galleries => {
				console.log('HELLLLLOOOOO', galleries);
				galleriesDispatch({
					type: 'SET_GALLERIES',
					payload: galleries,
				});
			})
			.catch(err => console.log(err));
	};

	const setShelters = () => {
		api.shelters
			.getShelters()
			.then(shelters =>
				sheltersDispatch({
					type: 'SET_SHELTERS',
					payload: shelters,
				})
			)
			.catch(err => console.log(err));
	};

	return (
		<Router>
			<StateContext.Provider value={state}>
				<DispatchContext.Provider value={dispatch}>
					<Route path='/' render={props => <NavBar {...props} />} />
					<Route path='/home' render={props => <HomePage {...props} />} />
					<Route
						path='/animals'
						exact
						render={props => (
							<AnimalCardsContainer animals={animals} {...props} />
						)}
					/>
					<Route
						path='/galleries'
						exact
						render={props => (
							<GalleryCardsContainer galleries={galleries} {...props} />
						)}
					/>
					<Route
						path='/galleries/:id'
						exact
						render={props => <GalleryShowPage {...props} />}
					/>
					<Route
						path='/animals/:id'
						exact
						render={props => <AnimalShowPage {...props} />}
					/>
					<Route
						path='/paint-locations'
						exact
						render={props => (
							<PaintLocContainer paintLocs={paintLocs} {...props} />
						)}
					/>
					<Route
						path='/paint-locations/:id'
						exact
						render={props => <PaintLocationShowPage {...props} />}
					/>
					<Route
						path='/paintings/create'
						exact
						render={props => (
							<PaintingForm animals={animals} editMode={false} {...props} />
						)}
					/>
					<Route
						path='/paintings/edit/:id'
						exact
						render={props => (
							<PaintingForm animals={animals} editMode={true} {...props} />
						)}
					/>
					<Route
						path='/shelters'
						exact
						render={props => (
							<SheltersContainer shelters={shelters} {...props} />
						)}
					/>
					<Route
						path='/shelters/:id'
						exact
						render={props => <ShelterShowPage {...props} />}
					/>
				</DispatchContext.Provider>
			</StateContext.Provider>
		</Router>
	);
}

export default App;
