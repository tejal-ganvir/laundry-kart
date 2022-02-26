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
import { Link, useNavigate } from "react-router-dom";
import OTPModal from "../../pages/Rider/order/OTP";

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

const OrderTable = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const rows = props.data;

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
              <StyledTableCell align='center'>Order Status</StyledTableCell>
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

                  <StyledTableCell align='center'>
                    {row.address}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {row.grandTotal}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {row.createdAt}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {row.orderStatus == 0 && (
                      <Chip
                        label='order Placed'
                        color='info'
                        onClick={() =>
                          navigate(`/rider/orders/${row.objectId}`)
                        }
                      />
                    )}
                    {row.orderStatus == 1 && (
                      <Chip
                        label='Rider Assigned'
                        color='primary'
                        onClick={() =>
                          navigate(`/rider/orders/${row.objectId}`)
                        }
                      />
                    )}
                    {row.orderStatus == 2 && (
                      <Chip
                        label='Laundry Picked up'
                        color='secondary'
                        onClick={() =>
                          navigate(`/rider/orders/${row.objectId}`)
                        }
                      />
                    )}
                    {row.orderStatus == 3 && (
                      <Chip
                        label='In Laundry'
                        color='info'
                        onClick={() =>
                          navigate(`/rider/orders/${row.objectId}`)
                        }
                      />
                    )}
                    {row.orderStatus == 4 && (
                      <Chip
                        label='Out for Delivery'
                        color='warning'
                        onClick={() =>
                          navigate(`/rider/orders/${row.objectId}`)
                        }
                      />
                    )}
                    {row.orderStatus == 5 && (
                      <Chip
                        label='Delivered'
                        color='success'
                        onClick={() =>
                          navigate(`/rider/orders/${row.objectId}`)
                        }
                      />
                    )}
                    {row.orderStatus == 6 && (
                      <Chip
                        label='Rejected'
                        color='error'
                        onClick={() =>
                          navigate(`/rider/orders/${row.objectId}`)
                        }
                      />
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <OTPModal open={open} close={handleClose} /> */}
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

export default OrderTable;
