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
import OrderModal from "../../pages/Vendor/orders/AssignOrder";

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

function createData(
  sno,
  order_id,
  cust_name,
  phone,
  address,
  price,
  date,
  status,
  payment,
) {
  return {
    sno,
    order_id,
    cust_name,
    phone,
    address,
    price,
    date,
    status,
    payment,
  };
}

const rows = [
  createData(
    1,
    "ord_001",
    "customer 1",
    "+00 0000000000",
    "India",
    "250",
    "27-01-2022",
    "Completed",
    "Pending",
  ),
  createData(
    2,
    "ord_002",
    "customer 2",
    "+00 0000000000",
    "India",
    "250",
    "27-01-2022",
    "Completed",
    "Paid",
  ),
  createData(
    3,
    "ord_003",
    "customer 3",
    "+00 0000000000",
    "India",
    "250",
    "27-01-2022",
    "Completed",
    "Paid",
  ),
  createData(
    4,
    "ord_004",
    "customer 4",
    "+00 0000000000",
    "India",
    "250",
    "27-01-2022",
    "Completed",
    "Pending",
  ),
];

const HistoryTable = () => {
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
              <StyledTableCell>S.No</StyledTableCell>
              <StyledTableCell>Order Id</StyledTableCell>
              <StyledTableCell align='right'>Customer Name</StyledTableCell>
              <StyledTableCell align='right'>Phone</StyledTableCell>
              <StyledTableCell align='right'>Address</StyledTableCell>
              <StyledTableCell align='right'>Price</StyledTableCell>
              <StyledTableCell align='right'>Date</StyledTableCell>
              <StyledTableCell align='center'>Order Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow key={row.sno}>
                  <StyledTableCell component='th' scope='row'>
                    {row.sno}
                  </StyledTableCell>
                  <StyledTableCell component='th' scope='row'>
                    {row.order_id}
                  </StyledTableCell>
                  <StyledTableCell align='right' component='th' scope='row'>
                    {row.cust_name}
                  </StyledTableCell>
                  <StyledTableCell align='right'>{row.phone}</StyledTableCell>
                  <StyledTableCell align='right'>{row.address}</StyledTableCell>
                  <StyledTableCell align='right'>{row.price}</StyledTableCell>
                  <StyledTableCell align='right'>{row.date}</StyledTableCell>
                  <StyledTableCell align='right'>
                    <Chip label={row.status} color='success' />
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

export default HistoryTable;
