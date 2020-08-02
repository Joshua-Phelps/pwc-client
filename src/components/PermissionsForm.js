import React, { useState, useEffect, useContext } from 'react';
import { api } from '../services/api';
import VenueFormHeader from './VenueFormHeader';
import { states } from '../utils/index';
import {
	TextField,
	Grid,
	Button,
	FormControl,
	MenuItem,
	Select,
	InputLabel,
	FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { userReducer } from '../reducers/Reducers';
import { DispatchContext, MessageContext } from '../App';

const useStyles = makeStyles(theme => ({
	container: {
		padding: theme.spacing(4),
	},
	item: {
		textAlign: 'center',
	},
	input: {
		verticalAlign: 'middle',
		display: 'inline-block',
		padding: theme.spacing(1),
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 300,
		maxWidth: 300,
	},
}));

export default function PermissionsForm() {
	const classes = useStyles();
	const { dialogDispatch } = useContext(DispatchContext);
	const { errorMessage, successMessage } = useContext(MessageContext);
	const [userId, setUserId] = useState(null);
	const [users, setUsers] = useState([]);
	const [permissionLevel, setPermissionLevel] = useState(null);

	useEffect(() => {
		api.auth
			.getUsers()
			.then(res => {
				console.log(res);
				if (res.error) return; // error handle
				return setUsers(res);
			})
			.catch(err => console.log(err));
	}, []);

	const clearState = () => {
		setUserId(null);
		setPermissionLevel(null);
	};

	const handleChange = ({ target: { name, value } }) => {
		name(value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		confirmMessage();
	};

	const confirmMessage = () => {
		return dialogDispatch({
			type: 'SET',
			payload: {
				title: 'Are You Sure?',
				message: `This user will have level ${permissionLevel} access`,
				buttonText: 'Continue',
				handleButton: updateUserPermissions,
				open: true,
			},
		});
	};

	const updateUserPermissions = () => {
		return api.auth
			.updatePermissions(userId, permissionLevel)
			.then(res => {
				if (res.error) return errorMessage();
				return successMessage('User permissions have been updated!');
			})
			.then(() => clearState())
			.catch(err => console.log(err));
	};

	const renderUsers = () => {
		return users.map(u => {
			return (
				<MenuItem key={u.id} value={u.id}>
					{u.email}
				</MenuItem>
			);
		});
	};

	const permissions = [
		{
			level: 1,
			text: 'Level 1',
			helperText: 'Basic - Can read information, create/update paintings',
		},
		{
			level: 2,
			text: 'Level 2',
			helperText:
				'Admin - User can read, write, and update everything except user permissions',
		},
		{ level: 3, text: 'Level 3', helperText: 'Owner - Access to everything' },
	];

	const renderPermissionLevels = () => {
		return permissions.map(p => {
			return (
				<MenuItem key={p.level} value={p.level}>
					{p.text} - {p.helperText}
				</MenuItem>
			);
		});
	};

	return (
		<>
			<VenueFormHeader headerText='Update Permissions' />
			<form onSubmit={handleSubmit}>
				<Grid className={classes.container} spacing={2} container>
					<Grid className={classes.item} item xs={12} sm={12}>
						<div className={classes.input}>
							<FormControl variant='outlined' className={classes.formControl}>
								<InputLabel id='email-label'>Email</InputLabel>
								<Select
									labelId='email-label'
									id='email-select'
									value={userId}
									onChange={handleChange}
									name={setUserId}
									label='Email'>
									{renderUsers()}
								</Select>
							</FormControl>
						</div>

						<div className={classes.input}>
							<FormControl variant='outlined' className={classes.formControl}>
								<InputLabel id='permission-label'>Level</InputLabel>
								<Select
									labelId='permission-label'
									id='permission-select'
									value={permissionLevel}
									onChange={handleChange}
									name={setPermissionLevel}
									label='Permission Level'>
									{renderPermissionLevels()}
								</Select>
							</FormControl>
						</div>

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
