import React, { useReducer, useEffect, createContext, useState } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	useHistory,
} from 'react-router-dom';
import PrivateRoute from './helpers/PrivateRoute';
import PublicRoute from './helpers/PublicRoute';
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
import SignUp from './components/SignUp';
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
import NavBarLarge from './components/NavBarLarge';

export const StateContext = createContext();
export const DispatchContext = createContext();

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#60326a', //Paws Purple
			light: '#7f5b87', //#efefef
			dark: '#43234a', //#29434e
			gradient: 'linear-gradient(45deg, #e4dde6 0%, #60326a 100%)',
			// gradient: 'linear-gradient(45deg, #09203f 0%, #537895 100%)',
		},
		secondary: {
			main: '#e44c26', //Paws Orange
			light: '#e96f51',
			dark: '#9f351a',
			lightest: '#e79d8c',
			grey: {
				light: '#e3e1e5',
				main: '#d4d4d4',
				dark: '#5a514e',
			},
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
		MuiSelect: {
			root: {
				backgroundColor: 'white',
			},
		},
		MuiInputBase: {
			root: {
				backgroundColor: 'white',
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
	const [loaded, setLoaded] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);
	const token = localStorage.getItem('token');

	const state = {
		animals,
		animal,
		galleries,
		gallery,
		paintLocs,
		paintLoc,
		shelters,
		shelter,
		form,
	};
	const dispatch = {
		animalDispatch,
		galleryDispatch,
		paintLocDispatch,
		shelterDispatch,
		formDispatch,
	};

	useEffect(() => {
		// const token = localStorage.getItem('token');
		if (token) {
			api.auth
				.getCurrentUser()
				.then(res => {
					if (res.message) return localStorage.removeItem('token');
					setPaintLocs();
					setGalleries();
					setShelters();
					// setLoggedIn(true);
					return;
				})
				.then(() => setLoaded(true))
				.catch(error => console.log(error));
		}
	}, [token]);

	const login = loginData => {
		return api.auth
			.login(loginData)
			.then(res => {
				if (res.message) {
					alert('Unable to login');
				} else {
					localStorage.setItem('token', res.jwt);
					return setLoggedIn(true);
				}
			})
			.catch(err => console.log(err));
	};

	const setPaintLocs = () => {
		api.paintLocs
			.getPaintLocs()
			.then(res => {
				if (res.message) {
					return;
				} else {
					return paintLocsDispatch({
						type: 'SET_PAINT_LOCS',
						payload: paintLocs,
					});
				}
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

						<PublicRoute
							restricted={true}
							path='/'
							component={NavBarContainer}
						/>

						<Route path='/sign-up' exact component={SignUp} />

						<Route
							path='/login'
							render={props => <Login login={login} {...props} />}></Route>

						<Route path='/home' render={props => <HomePage {...props} />} />

						<PrivateRoute path='/search-page' component={SearchContainer} />

						<PrivateRoute
							path='/animals'
							exact
							component={AnimalCardsContainer}
						/>

						<PrivateRoute
							path='/galleries'
							exact
							component={GalleryCardsContainer}
						/>

						<PrivateRoute
							path='/galleries/:id'
							exact
							component={GalleryShowPage}
						/>
						<PrivateRoute
							path='/animals/:id'
							exact
							component={AnimalShowPage}
						/>

						<PrivateRoute
							path='/paint-locations'
							exact
							component={PaintLocContainer}
						/>

						<Route
							path='/paint-locations/:id'
							exact
							component={PaintLocationShowPage}
						/>

						{/* <PrivateRoute
							path='/paintings/create'
							exact
							component={PaintingForm}
						/> */}

						{/* <Route
							path='/paintings/edit/:id'
							exact
							render={props => (
								<PaintingForm animals={animals} editMode={true} {...props} />
							)}
						/> */}

						<PrivateRoute
							path='/shelters'
							exact
							component={SheltersContainer}
						/>
						<PrivateRoute
							path='/shelters/:id'
							exact
							component={ShelterShowPage}
						/>
					</DispatchContext.Provider>
				</StateContext.Provider>
			</Router>
		</MuiThemeProvider>
	);
}

export default App;
