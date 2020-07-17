const API_ROOT = 'http://localhost:3000';

const token = () => localStorage.getItem('token');

const headers = () => {
	return {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		Authorization: token(),
	};
};

const getAnimals = () => {
	return fetch(`${API_ROOT}/animals`, {
		headers: headers(),
	}).then(res => res.json());
};

const getAnimalById = id => {
	return fetch(`${API_ROOT}/animals/${id}`, {
		headers: headers(),
	}).then(res => res.json());
};

const getGalleries = () => {
	return fetch(`${API_ROOT}/galleries`, {
		headers: headers(),
	}).then(res => res.json());
};

const getGalleryById = id => {
	return fetch(`${API_ROOT}/galleries/${id}`, {
		headers: headers(),
	}).then(res => res.json());
};

const getPaintLocs = () => {
	return fetch(`${API_ROOT}/paint_locations`, {
		headers: headers(),
	}).then(res => res.json());
};

const getPaintLocById = id => {
	return fetch(`${API_ROOT}/paint_locations/${id}`, {
		headers: headers(),
	}).then(res => res.json());
};

const getPaintingById = id => {
	return fetch(`${API_ROOT}/paintings/${id}`, {
		headers: headers(),
	}).then(res => res.json());
};

const createPainting = painting => {
	return fetch(`${API_ROOT}/paintings`, {
		headers: headers(),
		method: 'POST',
		body: JSON.stringify(painting),
	}).then(res => res.json());
};

const updatePainting = painting => {
	console.log(painting);
	return fetch(`${API_ROOT}/paintings/${painting.id}`, {
		method: 'PATCH',
		headers: headers(),
		body: JSON.stringify(painting),
	}).then(res => res.json());
};

const deletePainting = id => {
	return fetch(`${API_ROOT}/paintings/${id}`, {
		method: 'DELETE',
		headers: headers(),
	}).then(res => res.json());
};

const getShelters = () => {
	return fetch(`${API_ROOT}/shelters`, {
		headers: headers(),
	}).then(res => res.json());
};

const getShelterById = id => {
	return fetch(`${API_ROOT}/shelters/${id}`, {
		headers: headers(),
	}).then(res => res.json());
};

export const api = {
	animals: {
		getAnimals,
		getAnimalById,
	},
	galleries: {
		getGalleries,
		getGalleryById,
	},
	paintLocs: {
		getPaintLocs,
		getPaintLocById,
	},
	paintings: {
		getPaintingById,
		createPainting,
		updatePainting,
		deletePainting,
	},
	shelters: {
		getShelters,
		getShelterById,
	},
};
