import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#1e293b', 
        color: theme.palette.common.white,
        fontSize: 17,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 15,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#cbd5e1',
        '&:hover': {
            backgroundColor: '#94a3b8',
            color:'#f8fafc'
        },
    },
    '&:nth-of-type(even)': {
        backgroundColor:'#e2e8f0',
        '&:hover': {
            backgroundColor: '#94a3b8',
            color:'#f8fafc',
        },
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    '& td, & th': {
        textTransform: 'capitalize', // Capitalize text
    },
   
}));


const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function MU_Table({myTasks}) {

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Task</StyledTableCell>
                        <StyledTableCell align="right">Status</StyledTableCell>
                        <StyledTableCell align="right">Deadline</StyledTableCell>
                        <StyledTableCell align="right">Priority</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {myTasks?.map((row) => (
                        <StyledTableRow key={row.title}>
                            <StyledTableCell component="th" scope="row">
                                {row.title}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.status}</StyledTableCell>
                            <StyledTableCell align="right">{formatDate(row.dueDate)}</StyledTableCell>
                            <StyledTableCell align="right">{row.priority}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
