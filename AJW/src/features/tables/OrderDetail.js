import React, { Fragment } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    background: "hsl(0, 0%, 96%)",
    padding: 5
  },
  td: {
    border: "1px solid white"
  }
}));

const OrderDetail = ({ detail }) => {
  const classes = useStyles();
  const keys = Object.keys(detail);
  const existingData = [
    "companyRefNumber",
    "dateCreated",
    "itemNumber",
    "shipAddress1",
    "companyName",
    "pnUpper"
  ];
  const filteredKeys = keys.filter(k => existingData.indexOf(k) < 0);

  return (
    <Fragment>
      {filteredKeys.map((key, idx) => (
        <TableRow key={idx}>
          <TableCell className={classes.td} />
          <TableCell colSpan={2} align="left" className={classes.root}>
            {key}:
          </TableCell>
          <TableCell colSpan={3} align="left" className={classes.root}>
            {detail[key]}
          </TableCell>
        </TableRow>
      ))}
    </Fragment>
  );
};
export default OrderDetail;
