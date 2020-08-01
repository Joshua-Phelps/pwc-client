const API_ROOT = 'http://localhost:3000';

const token = () => localStorage.getItem('token');

const headers = () => {
	return {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		Authorization: token(),
	};
};

const login = data => {
	return fetch(`${API_ROOT}/auth`, {
		method: 'POST',
		headers: headers(),
		body: JSON.stringify(data),
	}).then(res => res.json());
};

const signup = user => {
	return fetch(`${API_ROOT}/users`, {
		method: 'POST',
		headers: headers(),
		body: JSON.stringify({
			user: {
				username: user.username,
				password: user.password,
				email: user.email,
			},
		}),
	}).then(res => res.json());
};

const getCurrentUser = () => {
	return fetch(`${API_ROOT}/current_user`, {
		headers: headers(),
	}).then(res => res.json());
};

const generateCard = id => {
	return fetch(`${API_ROOT}/card_generator/${id}`, {
		headers: headers(),
	}).then(res => res.json());
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

const createAnimal = animal => {
	return fetch(`${API_ROOT}/animals`, {
		headers: headers(),
		method: 'POST',
		body: JSON.stringify(animal),
	}).then(res => res.json());
};

const toTitleCase = phrase => {
	return phrase
		.toLowerCase()
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};

const getAnimalByName = name => {
	let titleizedName = toTitleCase(name);
	return fetch(`${API_ROOT}/animals_by_name/${titleizedName}`, {
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

const createGallery = gallery => {
	return fetch(`${API_ROOT}/galleries`, {
		headers: headers(),
		method: 'POST',
		body: JSON.stringify(gallery),
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

const createPaintLoc = paint_location => {
	return fetch(`${API_ROOT}/paint_locations`, {
		headers: headers(),
		method: 'POST',
		body: JSON.stringify(paint_location),
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

const createShelter = shelter => {
	return fetch(`${API_ROOT}/shelters`, {
		headers: headers(),
		method: 'POST',
		body: JSON.stringify(shelter),
	}).then(res => res.json());
};

const getIncompletePhotos = () => {
	return fetch(`${API_ROOT}/photos/incomplete`, {
		headers: headers(),
	}).then(res => res.json());
};

const getPrintReadyPhotos = () => {
	return fetch(`${API_ROOT}/photos/print_ready`, {
		headers: headers(),
	}).then(res => res.json());
};

const getFiles = () => {
	return fetch(`${API_ROOT}/google_drive`, {
		headers: headers(),
	}).then(res => res.json());
};

const createFile = formData => {
	return fetch(`${API_ROOT}/google_drive`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: token(),
		},
		body: formData,
	}).then(res => res.json());
};

const sendPasswordResetEmail = email => {
	return fetch(`${API_ROOT}/password_resets`, {
		method: 'POST',
		headers: headers(),
		body: JSON.stringify({ password_reset: { email } }),
	}).then(res => res.json());
};

const updatePassword = (password, passwordToken) => {
	return fetch(`${API_ROOT}/password_resets/${passwordToken}`, {
		method: 'PATCH',
		headers: headers(),
		body: JSON.stringify(password),
	}).then(res => res.json());
};

export const api = {
	auth: {
		login,
		getCurrentUser,
		signup,
		sendPasswordResetEmail,
		updatePassword,
	},
	animals: {
		getAnimals,
		getAnimalById,
		getAnimalByName,
		createAnimal,
	},
	galleries: {
		getGalleries,
		getGalleryById,
		createGallery,
	},
	paintLocs: {
		getPaintLocs,
		getPaintLocById,
		createPaintLoc,
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
		createShelter,
	},
	cards: {
		generateCard,
	},
	google: {
		getFiles,
		createFile,
	},
	photos: {
		getIncompletePhotos,
		getPrintReadyPhotos,
	},
};
