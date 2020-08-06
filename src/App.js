import React, { useReducer, useEffect, createContext, useState } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	useHistory,
} from 'react-router-dom';
import { initialState } from './reducers/initialState';
import PrivateRoute from './helpers/PrivateRoute';
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
import PasswordReset from './components/PasswordReset';
import SheltersContainer from './containers/SheltersContainer';
import ShelterShowPage from './components/ShelterShowPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import SearchContainer from './containers/SearchContainer';
import AdminPage from './components/AdminPage';
import DialogMessage from './components/DialogMessage';
import PasswordSendEmail from './components/PasswordSendEmail';
import PaintingForm from './components/PaintingForm';
import PhotosContainer from './containers/PhotosContainer';
import {
	userReducer,
	animalsReducer,
	animalReducer,
	galleriesReducer,
	galleryReducer,
	paintLocsReducer,
	paintLocReducer,
	sheltersReducer,
	shelterReducer,
	photosReducer,
	dialogReducer,
	paintFormPropsReducer,
} from './reducers/Reducers';
import AnimalCard from './components/AnimalCard';

export const StateContext = createContext();
export const DispatchContext = createContext();
export const AuthContext = createContext();
export const MessageContext = createContext();

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
		colors: {
			white: '#ffffff',
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
	const [user, userDispatch] = useReducer(userReducer, {});
	const [animals, animalsDispatch] = useReducer(animalsReducer, []);
	const [animal, animalDispatch] = useReducer(animalReducer, {});
	const [galleries, galleriesDispatch] = useReducer(galleriesReducer, []);
	const [gallery, galleryDispatch] = useReducer(galleryReducer, {});
	const [paintLocs, paintLocsDispatch] = useReducer(paintLocsReducer, []);
	const [shelters, sheltersDispatch] = useReducer(sheltersReducer, []);
	const [shelter, shelterDispatch] = useReducer(shelterReducer, {});
	const [paintLoc, paintLocDispatch] = useReducer(paintLocReducer, {});
	const [paintFormProps, paintFormPropsDispatch] = useReducer(
		paintFormPropsReducer,
		initialState.paintFormProps
	);
	const [dialog, dialogDispatch] = useReducer(
		dialogReducer,
		initialState.dialog
	);
	const [photos, photosDispatch] = useReducer(photosReducer, []);
	const [loggedIn, setLoggedIn] = useState(false);
	const token = localStorage.getItem('token');
	const history = useHistory();

	const state = {
		animals,
		animal,
		galleries,
		gallery,
		paintLocs,
		paintLoc,
		shelters,
		shelter,
		dialog,
		paintFormProps,
		photos,
	};

	const dispatch = {
		animalDispatch,
		galleryDispatch,
		galleriesDispatch,
		paintLocDispatch,
		shelterDispatch,
		paintFormPropsDispatch,
		dialogDispatch,
		photosDispatch,
	};

	const login = loginData => {
		return api.auth
			.login(loginData)
			.then(res => {
				if (res.error) {
					alert('Unable to login');
					return false;
				} else {
					localStorage.setItem('token', res.jwt);
					setUser(res.user);
					setPaintLocs();
					setGalleries();
					setShelters();
					setLoggedIn(true);
					return true;
				}
			})
			.catch(err => console.log(err));
	};

	const logout = () => {
		localStorage.removeItem('token');
		setLoggedIn(false);
	};

	useEffect(() => {
		if (token) {
			api.auth
				.getCurrentUser()
				.then(res => {
					if (res.error) return localStorage.removeItem('token');
					setUser(res);
					setPaintLocs();
					setGalleries();
					setShelters();
					return;
				})
				.then(() => setLoggedIn(true))
				.catch(error => console.log(error));
		}
	}, []);

	const setUser = user => {
		userDispatch({
			type: 'SET',
			payload: user,
		});
	};

	const setPaintLocs = () => {
		api.paintLocs
			.getPaintLocs()
			.then(res => {
				if (res.error) {
					return;
				} else {
					return paintLocsDispatch({
						type: 'SET',
						payload: res,
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
					type: 'SET',
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
					type: 'SET',
					payload: shelters,
				});
			})
			.catch(err => console.log(err));
	};

	const errorMessage = () => {
		return dialogDispatch({
			type: 'SET',
			payload: {
				title: 'Something went wrong!',
				message: 'We were unable to proccess you request. Please try again.',
				open: true,
			},
		});
	};

	const message = (title, message, ...btnArgs) => {
		return dialogDispatch({
			type: 'SET',
			payload: {
				title,
				message,
				open: true,
				buttonText: btnArgs[1],
				handleButton: btnArgs[2],
			},
		});
	};

	const confirmMessage = (message, buttonText, handleButton) => {
		return dialogDispatch({
			type: 'SET',
			payload: {
				title: 'Are You Sure?',
				open: true,
				message,
				buttonText,
				handleButton,
			},
		});
	};

	const auth = { login, logout, user };
	const messages = { message, errorMessage };

	return (
		<MuiThemeProvider theme={theme}>
			<Router>
				<StateContext.Provider value={state}>
					<DispatchContext.Provider value={dispatch}>
						<MessageContext.Provider value={messages}>
							<CssBaseline />
							<AuthContext.Provider value={auth}>
								<PaintingForm />
								<DialogMessage />
								<Route
									path='/'
									render={props => (
										<NavBarContainer {...props} loggedIn={loggedIn} />
									)}
								/>

								<Route path='/sign-up' exact component={SignUp} />

								<Route
									path='/password-reset-send-email'
									exact
									component={PasswordSendEmail}
								/>

								<Route
									path='/login'
									render={props => <Login login={login} {...props} />}></Route>

								<PrivateRoute path='/admin' component={AdminPage} />
							</AuthContext.Provider>

							<Route path='/home' render={props => <HomePage {...props} />} />

							<Route
								path='/password-reset/:token'
								exact
								component={PasswordReset}
							/>

							<PrivateRoute
								exact
								path='/photos/full-background'
								component={PhotosContainer}
							/>

							<PrivateRoute
								exact
								path='/photos/print-ready'
								component={PhotosContainer}
							/>

							<PrivateRoute
								exact
								path='/search-page'
								component={SearchContainer}
							/>

							<PrivateRoute
								path='/galleries'
								exact
								// cards={galleries}
								component={GalleryCardsContainer}
							/>

							<PrivateRoute
								path='/animals'
								exact
								component={AnimalCardsContainer}
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
						</MessageContext.Provider>
					</DispatchContext.Provider>
				</StateContext.Provider>
			</Router>
		</MuiThemeProvider>
	);
}

export default App;
