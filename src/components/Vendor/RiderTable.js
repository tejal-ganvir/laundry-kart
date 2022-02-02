import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, phone, address, vehicle, date, status) {
  return { name, phone, address, vehicle, date, status };
}

const rows = [
  createData(
    "Rider 1",
    "+00 0000000000",
    "India",
    "KA 01,SN 0987",
    "27-01-2022",
    "Active",
  ),
  createData(
    "Rider 2",
    "+00 0000000000",
    "India",
    "KA 01,SN 0987",
    "27-01-2022",
    "Active",
  ),
  createData(
    "Rider 3",
    "+00 0000000000",
    "India",
    "KA 01,SN 0987",
    "27-01-2022",
    "Active",
  ),
  createData(
    "Rider 4",
    "+00 0000000000",
    "India",
    "KA 01,SN 0987",
    "27-01-2022",
    "Active",
  ),
];

const RiderTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: 5 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Rider Name</StyledTableCell>
              <StyledTableCell align='right'>Phone</StyledTableCell>
              <StyledTableCell align='right'>Address</StyledTableCell>
              <StyledTableCell align='right'>vehicle Number</StyledTableCell>
              <StyledTableCell align='right'>Joined On</StyledTableCell>
              <StyledTableCell align='right'>Status</StyledTableCell>
              <StyledTableCell align='center'>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component='th' scope='row'>
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align='right'>{row.phone}</StyledTableCell>
                  <StyledTableCell align='right'>{row.address}</StyledTableCell>
                  <StyledTableCell align='right'>{row.vehicle}</StyledTableCell>
                  <StyledTableCell align='right'>{row.date}</StyledTableCell>
                  <StyledTableCell align='right'>
                    <Chip label={row.status} color='success' />
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <IconButton aria-label='save'>
                      <EditIcon color='primary' />
                    </IconButton>
                    <IconButton aria-label='delete'>
                      <DeleteIcon color='error' />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default RiderTable;
