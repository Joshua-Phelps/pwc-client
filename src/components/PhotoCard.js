import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
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
import { api } from '../services/api';
import { MessageContext, DispatchContext } from '../App';

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

export default function PhotoCard({ photo }) {
	const { errorMessage } = useContext(MessageContext);
	const { photosDispatch } = useContext(DispatchContext);
	const classes = useStyles();
	const history = useHistory();
	const [expanded, setExpanded] = React.useState(false);
	const { id, animal, bkgd_removed, google_drive_path, size, url } = photo;

	const handleExpandClick = () => setExpanded(!expanded);

	const handleMarkComplete = () => {
		let completedPhoto = { ...photo, complete: true };
		api.photos.updatePhoto(photo).then(res => {
			if (res.error) return errorMessage;
			return photosDispatch({ type: 'REMOVE', payload: res });
		});
	};

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
			<CardHeader className={classes.header} title={animal.name} />
			<CardMedia
				className={classes.media}
				// image='https://drive.google.com/uc?export=view&id=13xmQNRWPiICreCTeWqLxfe_8meH5V82t'
				image={url}
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
						<Button
							color='secondary'
							onClick={handleMarkComplete}
							aria-label='mark complete'
							variant='contained'>
							Mark Complete
						</Button>
						Photo Path:
						{/* {renderInfo('ID', id)}
						{renderInfo('Shelter', shelter_name)}
						{renderInfo('Total Paintings', total_paintings)}
						{renderInfo('Photo Status', photo_status)} */}
					</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
}
