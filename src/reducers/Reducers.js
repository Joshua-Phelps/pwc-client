const SET_ANIMALS = 'SET_ANIMALS';
const SET_GALLERIES = 'SET_GALLERIES';
const SET_GALLERY = 'SET_GALLERY';
const SET_PAINT_LOCS = 'SET_PAINT_LOCS';
const SET_PAINT_LOCATION = 'SET_PAINT_LOCATION';
const SET_SHELTERS = 'SET_SHELTERS';
const SET_SHELTER = 'SET_SHELTER';
const SET_FORM = 'SET_FORM';
const UPDATE_FORM = 'UPDATE_FORM';
const CLEAR_FORM = 'CLEAR_FORM';
const SET_ANIMAL = 'SET_ANIMAL';
const ADD_PAINTING = 'ADD_PAINTING';
const UPDATE_PAINTING = 'UPDATE_PAINTING';
const DELETE_PAINTING = 'DELETE_PAINTING';

const animalsReducer = (state, action) => {
	switch (action.type) {
		case SET_ANIMALS:
			return [...action.payload];
		default:
			return state;
	}
};

const animalReducer = (state, action) => {
	let paintings;
	switch (action.type) {
		case SET_ANIMAL:
			return { ...action.payload };
		case ADD_PAINTING:
			return { ...state, paintings: [...state.paintings, action.payload] };
		case UPDATE_PAINTING:
			paintings = state.paintings.map(p => {
				return p.id === action.payload.id ? action.payload : p;
			});
			return { ...state, paintings: paintings };
		case DELETE_PAINTING:
			paintings = state.paintings.filter(p => p.id !== action.payload);
			return { ...state, paintings: paintings };
		default:
			return state;
	}
};

const galleriesReducer = (state, action) => {
	switch (action.type) {
		case SET_GALLERIES:
			return [...action.payload];
		default:
			return state;
	}
};

const galleryReducer = (state, action) => {
	switch (action.type) {
		case SET_GALLERY:
			return { ...action.payload };
		default:
			return state;
	}
};

const paintLocsReducer = (state, action) => {
	switch (action.type) {
		case SET_PAINT_LOCS:
			return [...action.payload];
		default:
			return state;
	}
};

const paintLocReducer = (state, action) => {
	switch (action.type) {
		case SET_PAINT_LOCATION:
			return { ...action.payload };
		default:
			return state;
	}
};

const sheltersReducer = (state, action) => {
	switch (action.type) {
		case SET_SHELTERS:
			return [...action.payload];
		default:
			return state;
	}
};

const shelterReducer = (state, action) => {
	switch (action.type) {
		case SET_SHELTER:
			return { ...action.payload };
		default:
			return state;
	}
};

const formReducer = (state, action) => {
	switch (action.type) {
		case SET_FORM:
			return { ...action.payload };
		case UPDATE_FORM:
			return { ...state, [action.key]: action.payload };
		case CLEAR_FORM:
			return {};
		default:
			return state;
	}
};

export {
	animalsReducer,
	galleriesReducer,
	galleryReducer,
	paintLocsReducer,
	paintLocReducer,
	sheltersReducer,
	shelterReducer,
	animalReducer,
	formReducer,
};
