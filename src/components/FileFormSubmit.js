import React from 'react';
import { Button, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	container: {
		padding: theme.spacing(4),
	},
	item: {
		textAlign: 'center',
	},
	button: {
		background: theme.palette.success.main,
	},
}));

function FileFormSubmit({ handleSubmit }) {
	const classes = useStyles();
	return (
		<Grid container className={classes.container}>
			<Grid item xs={2} sm={4}></Grid>
			<Grid className={classes.item} item xs={8} sm={4}>
				<Button
					className={classes.button}
					onClick={handleSubmit}
					color='primary'
					variant='contained'>
					Submit to Database
				</Button>
			</Grid>
			<Grid item xs={2} sm={4}></Grid>
		</Grid>
	);
}

export default FileFormSubmit;
