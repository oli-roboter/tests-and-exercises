import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  td: {
    fontSize: 12,
    padding: 3,
    lineHeight: 1
  }
});

const CustomTableHead = () => {
  const classes = useStyles();
  return (
    <TableHead>
      <TableRow>
        <TableCell align="center" />
        <TableCell align="left" className={classes.td}>
          SALES ORDER
        </TableCell>

        <TableCell align="left">DATE</TableCell>

        <TableCell align="center">PO REF</TableCell>

        <TableCell align="center" className={classes.td}>
          LINE ITEM
        </TableCell>

        <TableCell align="center">SHIP TO</TableCell>

        <TableCell align="center">CUSTOMER</TableCell>

        <TableCell align="left" className={classes.td}>
          PART NUMBER
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHead;
