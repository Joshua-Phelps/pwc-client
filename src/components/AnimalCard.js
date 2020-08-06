import React from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import {
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CardActions,
	Collapse,
	IconButton,
	Typography,
	Button,
	makeStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 345,
	},
	header: {
		textAlign: 'center',
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
}));

export default function AnimalCard({ shelter_name, animal }) {
	const classes = useStyles();
	const history = useHistory();
	const [expanded, setExpanded] = React.useState(false);
	const { name, id, photo_url, total_paintings } = animal;

	const handleExpandClick = () => setExpanded(!expanded);

	const handleVisitAnimalShowPage = () => history.push(`/animals/${id}`);

	const info = [
		{ key: 'ID', value: id },
		{ key: 'Shelter', value: shelter_name },
		{ key: 'Total Paintings', value: total_paintings },
	];

	const renderInfo = () => {
		return info.map((i, index) => {
			return (
				<span key={index}>
					<b>{i.key}:</b> {i.value}
					<br></br>
				</span>
			);
		});
	};

	return (
		<Card className={classes.root}>
			<CardHeader className={classes.header} title={name} />
			<CardMedia
				className={classes.media}
				image={photo_url}
				title={'animal-photo'}
			/>
			<CardActions disableSpacing>
				<Button
					color='secondary'
					onClick={handleVisitAnimalShowPage}
					aria-label='visit animal homepage'
					variant='contained'>
					My Page
				</Button>
				<IconButton
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded,
					})}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label='show more'>
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout='auto' unmountOnExit>
				<CardContent>
					<Typography>{renderInfo()}</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
}
