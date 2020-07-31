import React, { useContext } from 'react';
import { StateContext, DispatchContext } from '../App';
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

export default function DialogMessage() {
	const { dialogDispatch } = useContext(DispatchContext);
	const { dialog } = useContext(StateContext);
	const classes = useStyles();

	const handleClose = () => {
		dialogDispatch({ type: 'CLOSE', payload: {} });
	};

	return (
		<div>
			<Dialog
				open={dialog.open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
				classes={{
					root: classes.root,
					paper: classes.border,
				}}>
				<DialogTitle className={classes.color} id='alert-dialog-title'>
					{dialog.title}
					{`Are you sure you want to delete ?`}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						{dialog.message}
						Message goes here
						<br></br>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Go Back
					</Button>
					<Button onClick={dialog.handleButton} autoFocus>
						{dialog.buttonText}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
