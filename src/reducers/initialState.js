const dialog = { title: '', handleButton: null, buttonText: '', message: '' };

const paintFormProps = {
	paintingId: null,
	updateAnimal: false,
	updateGallery: false,
	animalId: null,
	animalName: '',
	open: false,
	googleDriveUrl: '',
};

export const initialState = { dialog, paintFormProps };
