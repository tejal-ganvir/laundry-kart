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

const HistoryTable = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log(props.list);
  const rows = props.list;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: 5 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Order Id</StyledTableCell>
              <StyledTableCell align='center'>Address</StyledTableCell>
              <StyledTableCell align='center'>Price</StyledTableCell>
              <StyledTableCell align='center'>Date</StyledTableCell>
              <StyledTableCell>landmark</StyledTableCell>
              <StyledTableCell align='center'>Order Status</StyledTableCell>
              <StyledTableCell align='center'>Payment Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow key={row.objectId}>
                  <StyledTableCell component='th' scope='row'>
                    {row.objectId}
                  </StyledTableCell>
                  <StyledTableCell component='th' scope='row'>
                    {row.address}
                  </StyledTableCell>
                  <StyledTableCell align='right' component='th' scope='row'>
                    {row.grandTotal}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {row.createdAt}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {row.landmark}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {row.orderStatus == 0 && (
                      <Chip label='order Placed' color='info' />
                    )}
                    {row.orderStatus == 1 && (
                      <Chip label='Received' color='primary' />
                    )}
                    {row.orderStatus == 2 && (
                      <Chip label='Rider Assigned' color='secondary' />
                    )}
                    {row.orderStatus == 3 && (
                      <Chip label='In Laundry' color='info' />
                    )}
                    {row.orderStatus == 4 && (
                      <Chip label='Out for Delivery' color='warning' />
                    )}
                    {row.orderStatus == 5 && (
                      <Chip label='Delivered' color='success' />
                    )}
                    {row.orderStatus == 6 && (
                      <Chip label='Delivered' color='error' />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <Chip
                      label={row.isPaid ? "Paid" : "Pending"}
                      color='success'
                    />
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
