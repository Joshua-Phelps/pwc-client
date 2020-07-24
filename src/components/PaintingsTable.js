import React, { useContext } from 'react';
import { StateContext, DispatchContext } from '../App';
import { api } from '../services/api';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Container,
	ThemeProvider,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	container: {
		paddingLeft: '5%',
		paddingRight: '5%',
	},
}));

export default function PaintingsTable({
	paintings,
	setPaintingId,
	setOpenForm,
	openForm,
}) {
	const classes = useStyles();
	const { galleries, paintLocs } = useContext(StateContext);
	const { animalDispatch } = useContext(DispatchContext);

	const handleEdit = id => {
		setPaintingId(id);
		setOpenForm(!openForm);
	};

	const handleDelete = id => {
		api.paintings
			.deletePainting(id)
			.then(res => {
				if (res.msg) {
					removePainting(id);
				} else {
					console.log(res);
				}
			})
			.catch(err => console.log(err));
	};

	const removePainting = id => {
		animalDispatch({ type: 'DELETE_PAINTING', payload: id });
	};

	const getGallery = id => {
		return galleries.filter(g => g.id === id)[0];
	};

	const getPaintLocation = id => {
		return paintLocs.filter(pl => pl.id === id)[0];
	};

	const renderRows = () => {
		return paintings.map(p => {
			let gallery = getGallery(p.gallery_id);
			let paintLocation = getPaintLocation(p.paint_location_id);
			return (
				<TableRow key={p.id}>
					<TableCell component='th' scope='p'>
						{p.id}
					</TableCell>
					<TableCell align='right'>{p.painting_status}</TableCell>
					<TableCell align='right'>{gallery && gallery.name}</TableCell>
					<TableCell align='right'>{p.painter}</TableCell>
					<TableCell align='right'>
						{paintLocation && paintLocation.name}
					</TableCell>
					<TableCell align='right'>
						<EditIcon onClick={() => handleEdit(p.id)} />
					</TableCell>
					<TableCell align='right'>
						<DeleteIcon onClick={() => handleDelete(p.id)} />
					</TableCell>
				</TableRow>
			);
		});
	};

	return (
		<Container className={classes.container} maxWidth='lg'>
			<TableContainer component={Paper}>
				<Table aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Painting ID</TableCell>
							<TableCell align='right'>Status</TableCell>
							<TableCell align='right'>Gallery</TableCell>
							<TableCell align='right'>Painted By</TableCell>
							<TableCell align='right'>Painted at</TableCell>
							<TableCell align='right'></TableCell>
							<TableCell align='right'></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>{renderRows()}</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
}
