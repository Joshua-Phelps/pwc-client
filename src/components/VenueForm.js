import React, { useState, useEffect, useContext } from 'react';
import { api } from '../services/api';
import { DispatchContext, MessageContext } from '../App';
import VenueFormHeader from './VenueFormHeader';
import { states } from '../utils/index';
import {
	TextField,
	Grid,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	container: {
		padding: theme.spacing(4),
	},
	item: {
		width: '100%',
		textAlign: 'left',
	},
	input: {
		display: 'inline-block',
		padding: theme.spacing(1),
	},

	formControl: {
		minWidth: '194px',
	},
}));

const intialState = {
	id: null,
	email: '',
	phone_number: '',
	max_paintings: '',
	name: '',
	address: {
		street_address: '',
		city: '',
		zip: '',
		state: '',
	},
};

export default function VenueForm({ max_paintings, venueType, venue }) {
	const classes = useStyles();
	const [form, setForm] = useState(intialState);
	const { galleriesDispatch, sheltersDispatch, paintLocsDispatch } = useContext(
		DispatchContext
	);
	const { errorMessage } = useContext(MessageContext);

	useEffect(() => {
		if (venue) {
			setForm(venue);
		}
	}, [venue]);

	const handleSubmit = e => {
		e.preventDefault();
		if (venueType === 'Gallery') {
			api.galleries.createGallery(form).then(res => {
				if (res.error) return errorMessage();
				console.log(res);
				return galleriesDispatch({ type: 'ADD', payload: res });
			});
		} else if (venueType === 'Shelter') {
			api.shelters.createShelter(form).then(res => {
				if (res.error) return errorMessage();
				sheltersDispatch({ type: 'ADD', payload: res });
			});
		} else if (venueType === 'Paint Location') {
			api.paintLocs.createPaintLoc(form).then(res => {
				if (res.error) return errorMessage();
				paintLocsDispatch({ type: 'ADD', payload: res });
			});
		}
	};

	const handleChange = ({ target: { name, value } }) => {
		setForm(prevState => {
			return { ...prevState, [`${name}`]: value };
		});
	};

	const handleAddressChange = ({ target: { name, value } }) => {
		setForm(prevState => {
			return {
				...prevState,
				address: {
					...prevState.address,
					[`${name}`]: value,
				},
			};
		});
	};

	const renderStateValues = () => {
		return states.map(st => {
			return (
				<MenuItem key={st} value={st}>
					{st}
				</MenuItem>
			);
		});
	};

	return (
		<>
			<VenueFormHeader headerText={`Add ${venueType}`} />
			<form onSubmit={handleSubmit}>
				<Grid className={classes.container} spacing={2} container>
					<Grid item xs={false} sm={2}>
						{''}
					</Grid>
					<Grid className={classes.item} item xs={12} sm={10}>
						<div className={classes.input}>
							<TextField
								aria-label='name text field'
								variant='outlined'
								label='Name'
								id='name-field'
								name='name'
								value={form.name}
								onChange={handleChange}
							/>
						</div>

						<div className={classes.input}>
							<TextField
								aria-label='name text field'
								variant='outlined'
								label='Email'
								id='name-field'
								name='email'
								value={form.email}
								onChange={handleChange}
							/>
						</div>

						<div className={classes.input}>
							<TextField
								aria-label='name text field'
								variant='outlined'
								label='Phone Number'
								id='name-field'
								name='phone_number'
								value={form.phone_number}
								onChange={handleChange}
							/>
						</div>
						{venueType === 'Gallery' && (
							<div className={classes.input}>
								<TextField
									aria-label='max paintings field'
									variant='outlined'
									label='Max paintings'
									id='max-paintings-field'
									name='max_paintings'
									value={form.max_paintings}
									onChange={handleChange}
								/>
							</div>
						)}
					</Grid>
					<Grid item xs={false} sm={2}>
						{''}
					</Grid>

					<Grid className={classes.item} item xs={12} sm={10}>
						<div className={classes.input}>
							<TextField
								aria-label='street address field'
								variant='outlined'
								label='Street Address'
								id='street-address-field'
								name={'street_address'}
								value={form.address.street_address}
								onChange={handleAddressChange}
							/>
						</div>

						<div className={classes.input}>
							<TextField
								aria-label='city field'
								variant='outlined'
								label='City'
								id='city-field'
								name='city'
								value={form.address.city}
								onChange={handleAddressChange}
							/>
						</div>

						<div className={classes.input}>
							<TextField
								aria-label='zip code field'
								variant='outlined'
								label='Zip Code'
								id='zip-code=field'
								name='zip'
								value={form.address.zip}
								onChange={handleAddressChange}
							/>
						</div>

						<div className={classes.input}>
							<FormControl variant='outlined' className={classes.formControl}>
								<InputLabel id='state-select-label'>State</InputLabel>
								<Select
									labelId='state-select-label'
									id='state-select'
									value={form.address.state}
									name='state'
									onChange={handleAddressChange}>
									{renderStateValues()}
								</Select>
							</FormControl>
						</div>
					</Grid>

					<Grid item xs={false} sm={2}></Grid>

					<Grid item xs={12} sm={10}>
						<div className={classes.input}>
							<Button type='submit' color='secondary' variant='contained'>
								Submit
							</Button>
						</div>
					</Grid>
				</Grid>
			</form>
		</>
	);
}
