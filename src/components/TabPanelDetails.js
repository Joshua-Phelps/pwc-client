import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { StateContext } from '../App';

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
		return details.map((info, idx) => {
			return (
				<span key={idx}>
					<Typography display='inline' variant='body2'>
						<b>{info.key}</b> {info.value}
					</Typography>
					<br></br>
				</span>
			);
		});
	};

	return <div className={classes.detailsList}>{renderDetails()}</div>;
}
