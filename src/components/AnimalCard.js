import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, green } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 345,
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
	avatar: {
		backgroundColor: red[500],
	},
	subheaderComplete: {
		color: green[500],
	},
	subheaderIncomplete: {
		color: red[700],
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

	const handleClick = () => history.push(`/animals/${id}`);

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
			<CardHeader
				action={
					<IconButton aria-label='settings'>
						<MoreVertIcon onClick={handleClick} />
					</IconButton>
				}
				title={name}
			/>
			<CardMedia
				className={classes.media}
				// image='https://drive.google.com/uc?export=view&id=13xmQNRWPiICreCTeWqLxfe_8meH5V82t'
				image={photo_url}
				title={'animal-photo'}
			/>
			<CardActions disableSpacing>
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
