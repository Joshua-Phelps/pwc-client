import React from 'react';
import SearchBar from './SearchBar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		width: '100%',
		margin: 0,
	},
}));

export default function SearchPage() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<SearchBar />
		</div>
	);
}
