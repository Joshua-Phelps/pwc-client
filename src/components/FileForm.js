import React from 'react';
import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	item: {
		textAlign: 'center',
	},
}));

export default function FileForm({ handleChange, handleClick }) {
	const classes = useStyles();

	return (
		<>
			<input
				hidden
				accept='txt'
				className={classes.input}
				variant='outlined'
				onChange={handleChange}
				id='contained-button-file'
				multiple
				type='file'
			/>
			<label htmlFor='contained-button-file'>
				<Button
					variant='contained'
					component='span'
					color='secondary'
					onClick={handleClick}
					className={classes.button}>
					Upload
				</Button>
			</label>
		</>
	);
}
