import { initialState } from './initialState';

const SET = 'SET';
const CLOSE = 'CLOSE';
const CLEAR = 'CLEAR';
const UPDATE = 'UPDATE';
const ADD = 'ADD';
const REMOVE = 'REMOVE';
const REMOVE_PAINTING = 'REMOVE_PAINTING';
const UPDATE_PHOTO = 'UPDATE_PHOTO';
const ADD_PAINTING = 'ADD_PAINTING';
const UPDATE_PAINTING = 'UPDATE_PAINTING';
const DELETE_PAINTING = 'DELETE_PAINTING';
const REMOVE_ANIMAL = 'REMOVE_ANIMAL';

const userReducer = (state, action) => {
	switch (action.type) {
		case SET: {
			return { ...action.payload };
		}
		case UPDATE: {
			return { ...state, ...action.payload };
		}
		default:
			return state;
	}
};

const animalsReducer = (state, action) => {
	switch (action.type) {
		case SET:
			return [...action.payload];
		default:
			return state;
	}
};

const animalReducer = (state, action) => {
	let paintings;
	let photos;
	switch (action.type) {
		case SET:
			return { ...action.payload };
		case UPDATE:
			return { ...state, ...action.payload };
		case ADD_PAINTING:
			return { ...state, paintings: [...state.paintings, action.payload] };
		case UPDATE_PAINTING:
			paintings = state.paintings.map(p => {
				return p.id === action.payload.id ? action.payload : p;
			});
			return { ...state, paintings };
		case DELETE_PAINTING:
			paintings = state.paintings.filter(p => p.id !== action.payload);
			return { ...state, paintings: paintings };
		case UPDATE_PHOTO:
			photos = state.photos.map(p => {
				return p.id === action.payload.id ? action.payload : p;
			});
			return { ...state, photos };
		default:
			return state;
	}
};

const galleriesReducer = (state, action) => {
	switch (action.type) {
		case SET:
			return [...action.payload];
		case ADD:
			return [...state, action.payload];
		case UPDATE:
			const updatedGalleries = state.map(g => {
				return g.id === action.payload.id ? action.payload : g;
			});
			return updatedGalleries;
		default:
			return state;
	}
};

const galleryReducer = (state, action) => {
	let paintings;
	switch (action.type) {
		case SET:
			return { ...action.payload };
		case REMOVE_PAINTING:
			paintings = state.paintings.filter(p => p.id !== action.payload.id);
			return { ...state, paintings };
		case UPDATE_PAINTING:
			paintings = state.paintings.map(p => {
				return p.id === action.payload.id ? action.payload : p;
			});
			return { ...state, paintings };
		default:
			return state;
	}
};

const paintLocsReducer = (state, action) => {
	switch (action.type) {
		case SET:
			return [...action.payload];
		case ADD:
			return [...state, action.payload];
		case UPDATE:
			const updatedPaintLocs = state.map(g => {
				return g.id === action.payload.id ? action.payload : g;
			});
			return updatedPaintLocs;
		default:
			return state;
	}
};

const paintLocReducer = (state, action) => {
	switch (action.type) {
		case SET:
			return { ...action.payload };
		default:
			return state;
	}
};

const sheltersReducer = (state, action) => {
	switch (action.type) {
		case SET:
			return [...action.payload];
		case ADD:
			return [...state, action.payload];
		case UPDATE:
			const updatedShelters = state.map(g => {
				return g.id === action.payload.id ? action.payload : g;
			});
			return updatedShelters;
		default:
			return state;
	}
};

const shelterReducer = (state, action) => {
	switch (action.type) {
		case SET:
			return { ...action.payload };
		default:
			return state;
	}
};

const dialogReducer = (state, action) => {
	switch (action.type) {
		case SET:
			return { ...action.payload };
		case CLOSE:
			return { ...state, open: false };
		case CLEAR:
			return initialState.dialog;
		default:
			return state;
	}
};

const paintFormPropsReducer = (state, action) => {
	switch (action.type) {
		case SET:
			return { ...action.payload };
		case CLOSE:
			return { ...state, open: false };
		case CLEAR:
			return initialState.paintFormProps;
		default:
			return state;
	}
};

const photosReducer = (state, action) => {
	switch (action.type) {
		case SET:
			return [...action.payload];
		case ADD:
			return [...state, action.payload];
		case REMOVE_ANIMAL:
			let newPhotos = state.filter(p => p.animal.id !== action.payload);
			return newPhotos;
		default:
			return state;
	}
};

export {
	userReducer,
	animalsReducer,
	galleriesReducer,
	galleryReducer,
	paintLocsReducer,
	paintLocReducer,
	sheltersReducer,
	shelterReducer,
	animalReducer,
	paintFormPropsReducer,
	dialogReducer,
	photosReducer,
};
