import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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

export default function AnimalCard({ animal, history }) {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);
	const {
		animal_type,
		name,
		id,
		photo_url,
		shelter_name,
		total_paintings,
		photo_status,
	} = animal;

	const handleExpandClick = () => setExpanded(!expanded);

	const handleVisitAnimalShowPage = () => history.push(`/animals/${id}`);

	const renderInfo = (key, value) => {
		return (
			<>
				<b>{key}:</b> {value}
				<br></br>
			</>
		);
	};

	return (
		<Card className={classes.root}>
			<CardHeader className={classes.header} title={name} />
			<CardMedia
				className={classes.media}
				// image='https://drive.google.com/uc?export=view&id=13xmQNRWPiICreCTeWqLxfe_8meH5V82t'
				image={photo_url}
				title={'animal-photo'}
			/>
			<CardActions disableSpacing>
				<Button
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
					<Typography>
						{renderInfo('ID', id)}
						{renderInfo('Shelter', shelter_name)}
						{renderInfo('Total Paintings', total_paintings)}
						{renderInfo('Photo Status', photo_status)}
					</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
}
