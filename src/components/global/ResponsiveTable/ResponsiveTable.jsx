import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';

const ResponsiveTable = (props) => {
	const { columns, items, removeMethod } = props;
	const isSmallScreen = useMediaQuery('(max-width:700px)');

	const horizontalTable = (
		<Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
			<TableHead>
				<TableRow>
					{removeMethod ? (
						<TableCell
							sx={{ color: 'primary.main' }}
							key={'Id-TableCellHead'}
							align="center"
							style={{ minWidth: 50 }}
						>
							#
						</TableCell>
					) : null}
					{columns.map((column, index) => (
						<TableCell
							sx={{ color: 'primary.main' }}
							key={column.id + '-TableCellHead-' + index}
							align={column.align}
							style={{ minWidth: column.minWidth }}
						>
							{column.label}
						</TableCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{items.map((row, index) => {
					return (
						<TableRow
							hover
							role="checkbox"
							tabIndex={-1}
							key={index + '-TableRow'}
						>
							{removeMethod ? (
								<TableCell key={'Id-TableCell-' + index} align="center">
									{index}
								</TableCell>
							) : null}
							{columns.map((column, index) => {
								const value = row[column.id];
								return (
									<TableCell
										key={column.id + '-TableCell-' + index}
										align={column.align}
									>
										{column.format ? column.format(value, row) : value}
									</TableCell>
								);
							})}
							{removeMethod ? (
								<TableCell key={'RemoveBtn-TableCell-' + index} align="center">
									<Button
										variant="contained"
										color="error"
										onClick={() => removeMethod(index)}
									>
										{'Eliminar'}
									</Button>
								</TableCell>
							) : null}
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);

	const verticalTable = (
		<Table sx={{ minWidth: 280 }} stickyHeader aria-label="sticky table">
			<TableBody>
				{items.map((row, index) => {
					return (
						<TableRow
							hover
							role="checkbox"
							tabIndex={-1}
							key={index + '-TableRow'}
							sx={{
								'td, th': {
									border: 0,
									p: 1,
								},
								borderBottom: items?.length != index + 1 && 1,
								borderColor: 'lightgrey',
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							{columns.map((column, index) => {
								const value = row[column.id];
								return (
									<TableCell
										key={column.id + '-TableCell-' + index}
										sx={{
											display: 'flex',
											justifyContent: 'space-between',
										}}
									>
										<Typography variant="subtitle2">{column.label}</Typography>
										<Box textAlign="right">
											{column.format ? column.format(value, row) : value}
										</Box>
									</TableCell>
								);
							})}
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);

	return (
		<TableContainer /*sx={{ maxHeight: 440 }}*/>
			{items.length > 0 ? (
				isSmallScreen ? (
					verticalTable
				) : (
					horizontalTable
				)
			) : (
				<Typography
					align="center"
					sx={{
						minHeight: 150,
						color: '#919EAB',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					No hay resultados
				</Typography>
			)}
		</TableContainer>
	);
};

export default ResponsiveTable;
