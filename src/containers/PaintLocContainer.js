import React, { useContext } from 'react';
import clsx from 'clsx';
import VenueCard from '../components/VenueCard';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { StateContext } from '../App';

const useStyles = makeStyles(theme => ({
	container: {
		padding: theme.spacing(4),
	},
	smallContainer: {
		padding: theme.spacing(1),
	},
}));

function PaintLocContainer({ history }) {
	const classes = useStyles();
	const { paintLocs } = useContext(StateContext);

	const renderCards = () => {
		return paintLocs.map(pl => {
			return (
				<Grid key={pl.id} item sm={4} xs={12}>
					<VenueCard
						venue={pl}
						buttonText='Visit Paint Location'
						pushPath={`/paint-locations/${pl.id}`}
						history={history}
					/>
				</Grid>
			);
		});
	};

	return (
		<>
			<Grid
				className={clsx(classes.container, 'large-view')}
				container
				spacing={3}>
				{renderCards()}
			</Grid>
			<Grid
				className={clsx(classes.smallContainer, 'small-view')}
				container
				spacing={3}>
				{renderCards()}
			</Grid>
		</>
	);
}

export default PaintLocContainer;
