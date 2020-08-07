import React from 'react';

function PaintingsTableCells() {
	return (
		<TableRow key={p.id}>
			<TableCell align='center'>
				<Typography variant='body2'>{p.id}</Typography>
			</TableCell>
			<TableCell>
				{p.google_drive_url && (
					<div className={classes.imageContainer}>
						<a href={p.google_drive_url || ''} target='_blank'>
							<span>
								{console.log(p.visible_url)}
								<img
									className={classes.image}
									onMouseOut={() => setMouseOver(false)}
									onMouseOver={() => setMouseOver(true)}
									src={p.visible_url || ''}
								/>
							</span>
						</a>
					</div>
				)}
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
}

export default PaintingsTableCells;
