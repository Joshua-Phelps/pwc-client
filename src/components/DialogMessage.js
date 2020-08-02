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
import { initialState } from '../reducers/initialState';

const useStyles = makeStyles(theme => ({
	border: {
		border: `8px solid ${theme.palette.primary.main}`,
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
		dialogDispatch({ type: 'CLOSE', payload: null });
	};

	const handlePropButton = () => {
		handleClose();
		dialog.handleButton();
	};

	return (
		<div>
			{dialog.open && (
				<Dialog
					open={dialog.open}
					onClose={handleClose}
					aria-labelledby='dialog-title'
					aria-describedby='dialog-description'
					classes={{
						root: classes.root,
						paper: classes.border,
					}}>
					<DialogTitle className={classes.color} id='dialog-title'>
						{dialog.title}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id='dialog-description'>
							{dialog.message}

							<br></br>
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button variant='contained' onClick={handleClose} color='primary'>
							Close
						</Button>
						{dialog.handleButton && (
							<Button
								variant='contained'
								color='secondary'
								onClick={handlePropButton}
								autoFocus>
								{dialog.buttonText}
							</Button>
						)}
					</DialogActions>
				</Dialog>
			)}
		</div>
	);
}
