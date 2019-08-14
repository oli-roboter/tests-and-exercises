import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpandButton from "../../components/ExpandButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import OrderDetail from "./OrderDetail";
import { getOrderDetail } from "../../data/data-function";

const useStyles = makeStyles({
  tr: {
    padding: "none",
    margin: 1
  },
  td: {
    // textTransform: "capitalize"
    fontSize: 12,
    padding: 3,
    lineHeight: 1
  },
  button: {
    margin: 1
  }
});

const CustomTableRow = ({ rowData, resetDetail }) => {
  const [detail, setDetail] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    return resetDetail ? setShowDetail(false) : undefined;
  }, [resetDetail]);

  const handleClick = () => {
    const orderDetail = getOrderDetail(rowData.SaleOrderDetailAutoKey);
    setDetail(orderDetail[0]);
    setShowDetail(!showDetail);
  };

  return (
    <Fragment>
      <TableRow className={classes.tr}>
        <TableCell className={classes.td} align="left">
          <ExpandButton
            onClick={handleClick}
            showDetail={showDetail}
            className={classes.span}
            margin="none"
          />
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          padding={"none"}
          className={classes.td}
        >
          {rowData.soNumber}
        </TableCell>
        <TableCell align="left" className={classes.td} padding="none">
          {moment(
            rowData.dateCreated,
            moment.HTML5_FMT.DATETIME_LOCAL_SECONDS
          ).format("DD-MM-YYYY")}
        </TableCell>
        <TableCell align="center" className={classes.td} padding="none">
          {rowData.companyRefNumber}
        </TableCell>
        <TableCell align="center" className={classes.td} padding="none">
          {rowData.itemNumber}
        </TableCell>
        <TableCell align="center" className={classes.td} padding="none">
          {rowData.shipAddress1}
        </TableCell>
        <TableCell align="center" className={classes.td} padding="none">
          {rowData.companyName}
        </TableCell>
        <TableCell align="left" className={classes.td} padding="none">
          {rowData.pnUpper}
        </TableCell>
      </TableRow>
      {showDetail && !resetDetail && <OrderDetail detail={detail} />}
    </Fragment>
  );
};

export default CustomTableRow;
