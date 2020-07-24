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
	Typography,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	container: {
		width: '100%',
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
					<TableCell align='center'>
						<Typography variant='body2'>{p.id}</Typography>
					</TableCell>
					<TableCell align='center'>
						<Typography variant='body2'>{p.painting_status}</Typography>
					</TableCell>
					<TableCell align='center'>
						<Typography variant='body2'>{gallery && gallery.name}</Typography>
					</TableCell>
					<TableCell align='center'>
						<Typography variant='body2'>{p.painter}</Typography>
					</TableCell>
					<TableCell align='center'>
						<Typography variant='body2'>
							{paintLocation && paintLocation.name}
						</Typography>
					</TableCell>
					<TableCell align='right'>
						<EditIcon onClick={() => handleEdit(p.id)} />
					</TableCell>
					<TableCell align='left'>
						<DeleteIcon onClick={() => handleDelete(p.id)} />
					</TableCell>
				</TableRow>
			);
		});
	};

	return (
		<TableContainer component={Paper}>
			<Table aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell align='center'>
							<Typography variant='overline'>
								<b>Painting ID</b>
							</Typography>
						</TableCell>
						<TableCell align='center'>
							<Typography variant='overline'>
								<b>Status</b>
							</Typography>
						</TableCell>
						<TableCell align='center'>
							<Typography variant='overline'>
								<b>Gallery</b>
							</Typography>
						</TableCell>
						<TableCell align='center'>
							<Typography variant='overline'>
								<b>Painted By</b>
							</Typography>
						</TableCell>
						<TableCell align='center'>
							<Typography variant='overline'>
								<b>Painted at</b>
							</Typography>
						</TableCell>
						<TableCell align='center'></TableCell>
						<TableCell align='center'></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>{renderRows()}</TableBody>
			</Table>
		</TableContainer>
	);
}
