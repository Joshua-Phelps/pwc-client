import React, { useContext } from 'react';
import { StateContext } from '../App';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@material-ui/core';

const useStyles = makeStyles({
	table: {
		minWidth: '10%',
		maxWidth: '25%',
	},
});

function createData(id, painter, gallery, painting_status) {
	return { id, painter, gallery, painting_status };
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function PaintingsTable({
	paintings,
	setPaintingId,
	setOpenModal,
	openModal,
}) {
	const classes = useStyles();
	const { galleries } = useContext(StateContext);

	const handleEdit = id => {
		setPaintingId(id);
		setOpenModal(!openModal);
	};

	const getGallery = id => {
		return galleries.filter(g => g.id === id)[0];
	};

	const renderRows = () => {
		return paintings.map(p => {
			let gallery = getGallery(p.gallery_id);
			console.log(gallery);
			return (
				<TableRow key={p.id}>
					<TableCell component='th' scope='p'>
						{p.id}
					</TableCell>
					<TableCell align='right'>{p.painter}</TableCell>
					<TableCell align='right'>{gallery && gallery.name}</TableCell>
					<TableCell align='right'>{p.painting_status}</TableCell>
					<TableCell align='right'>
						<EditIcon onClick={() => handleEdit(p.id)} />
					</TableCell>
				</TableRow>
			);
		});
	};

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>Painting ID</TableCell>
						<TableCell align='right'>Painter</TableCell>
						<TableCell align='right'>Gallery</TableCell>
						<TableCell align='right'>Status</TableCell>
						<TableCell align='right'></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>{renderRows()}</TableBody>
			</Table>
		</TableContainer>
	);
}
