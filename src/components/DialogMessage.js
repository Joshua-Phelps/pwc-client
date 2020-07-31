import React, { useContext } from 'react';
import { StateContext, SetStateContext } from '../App';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	border: {
		border: `8px solid ${theme.palette.secondary.main}`,
	},
	root: {},
	color: {
		color: theme.palette.secondary.main,
	},
}));

export default function DeleteForm() {
	const { setOpenDialog } = useContext(SetStateContext);
	const { openDialog } = useContext(StateContext);
	const classes = useStyles();

	const handleClose = () => {
		setOpenDialog(false);
	};

	const handleDelete = () => {
		// setOpen(false);
	};

	return (
		<div>
			<Dialog
				open={openDialog}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
				classes={{
					root: classes.root,
					paper: classes.border,
				}}>
				<DialogTitle className={classes.color} id='alert-dialog-title'>
					{`Are you sure you want to delete ?`}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Message goes here
						<br></br>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Go Back
					</Button>
					<Button onClick={handleDelete} autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
