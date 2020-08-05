import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { StateContext } from '../App';
import { render } from 'react-dom';

const useStyles = makeStyles(theme => ({
	detailsList: {
		padding: theme.spacing(1),
	},
}));

export default function TabPanelDetails() {
	const classes = useStyles();
	const { animal } = useContext(StateContext);
	const { id, name, description, external_id, paintings } = animal;

	const details = [
		{ key: 'ID:', value: id },
		{ key: 'External ID:', value: external_id },
		{ key: 'Name:', value: name },
		{ key: 'Total Paintings:', value: paintings.length },
		{ key: 'Description:', value: description },
	];

	const renderDetails = () => {
		return details.map(info => {
			return (
				<>
					<Typography display='inline' variant='body2'>
						{info.key}
					</Typography>{' '}
					<Typography display='inline' variant='body2'>
						{info.value}
					</Typography>
					<br></br>
				</>
			);
		});
	};

	return <div className={classes.detailsList}>{renderDetails()}</div>;
}
