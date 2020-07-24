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
	const {
		id,
		name,
		description,
		gender,
		animal_type,
		external_id,
		paintings,
		photo_status,
	} = animal;

	const details = [
		{ key: 'ID:', value: id },
		{ key: 'External ID:', value: external_id },
		{ key: 'Name:', value: name },
		{ key: 'Type:', value: animal_type },
		{ key: 'Photo Status:', value: photo_status },
		{ key: 'Total Paintings:', value: paintings.length },
		{ key: 'Description:', value: description },
	];

	const renderDetails = () => {
		return details.map(info => {
			return (
				<>
					<Typography display='inline' variant='h5'>
						{info.key}
					</Typography>{' '}
					<Typography display='inline' variant='h6'>
						{info.value}
					</Typography>
					<br></br>
					<br></br>
				</>
			);
		});
	};

	return <div className={classes.detailsList}>{renderDetails()}</div>;
}
