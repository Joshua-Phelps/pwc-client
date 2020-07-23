import React, { useReducer, useEffect, createContext, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { api } from './services/api';
import './App.css';
import HomePage from './components/HomePage';
import NavBarContainer from './containers/NavBarContainer';
import AnimalCardsContainer from './containers/AnimalCardsContainer';
import GalleryCardsContainer from './containers/GalleryCardsContainer';
import PaintLocContainer from './containers/PaintLocContainer';
import AnimalShowPage from './components/AnimalShowPage';
import GalleryShowPage from './components/GalleryShowPage';
import PaintLocationShowPage from './components/PaintLocationShowPage';
import PaintingForm from './components/PaintingForm';
import SheltersContainer from './containers/SheltersContainer';
import ShelterShowPage from './components/ShelterShowPage';
import Login from './components/Login';
import SearchContainer from './containers/SearchContainer';
import {
	animalsReducer,
	animalReducer,
	galleriesReducer,
	galleryReducer,
	paintLocsReducer,
	paintLocReducer,
	sheltersReducer,
	shelterReducer,
	formReducer,
} from './reducers/Reducers';
import AnimalCard from './components/AnimalCard';

export const StateContext = createContext();
export const DispatchContext = createContext();

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#60326a', //Paws Purple
			light: '#7f5b87', //#efefef
			dark: '#43234a', //#29434e
			gradient: 'linear-gradient(45deg, #09203f 0%, #537895 100%)',
		},
		secondary: {
			main: '#e44c26', //Paws Orange
			light: '#e96f51', //lime green
			dark: '#9f351a',
		},
		info: {
			main: '#02b39c',
			light: '#34c2af',
			dark: '#017d6d',
		},
	},
	overrides: {
		MuiInputLabel: {
			outlined: {
				backgroundColor: 'white',
				paddingLeft: '2px',
				paddingRight: '2px',
			},
		},
	},
});

function App() {
	const [animals, animalsDispatch] = useReducer(animalsReducer, []);
	const [animal, animalDispatch] = useReducer(animalReducer, {});
	const [galleries, galleriesDispatch] = useReducer(galleriesReducer, []);
	const [gallery, galleryDispatch] = useReducer(galleryReducer, {});
	const [paintLocs, paintLocsDispatch] = useReducer(paintLocsReducer, []);
	const [shelters, sheltersDispatch] = useReducer(sheltersReducer, []);
	const [shelter, shelterDispatch] = useReducer(shelterReducer, {});
	const [paintLoc, paintLocDispatch] = useReducer(paintLocReducer, {});
	const [form, formDispatch] = useReducer(formReducer, {});

	const state = {
		animals,
		animal,
		galleries,
		gallery,
		paintLocs,
		paintLoc,
		form,
		shelters,
	};
	const dispatch = {
		animalDispatch,
		galleryDispatch,
		paintLocDispatch,
		shelterDispatch,
		formDispatch,
	};

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
				animalsDispatch({ type: 'SET_ANIMALS', payload: animals });
			})
			.catch(error => console.log(error));
	}, []);

	// const animalsByDisplayLocation = dispLocId => {
	// 	return animals.filter(a => a.current_display_location_id === dispLocId);
	// };
	console.log('rnning in app');

	const setPaintLocs = () => {
		api.paintLocs
			.getPaintLocs()
			.then(paintLocs => {
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
			.then(shelters => {
				sheltersDispatch({
					type: 'SET_SHELTERS',
					payload: shelters,
				});
			})
			.catch(err => console.log(err));
	};

	return (
		<MuiThemeProvider theme={theme}>
			<Router>
				<StateContext.Provider value={state}>
					<DispatchContext.Provider value={dispatch}>
						<CssBaseline />
						<Route path='/' render={props => <NavBarContainer {...props} />} />
						<Route path='/login' render={props => <Login {...props} />}></Route>
						<Route path='/home' render={props => <HomePage {...props} />} />
						<Route
							path='/search-page'
							render={props => <SearchContainer {...props} />}
						/>
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
							render={props => <GalleryCardsContainer {...props} />}
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
		</MuiThemeProvider>
	);
}

export default App;
