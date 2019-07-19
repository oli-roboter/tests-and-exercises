import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getWorkerData } from "./table-actions";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const mapStateToProps = state => {
  return {
    currentPage: state.tableStore.currentPage,
    pageSize: state.tableStore.pageSize,
    orderBy: state.tableStore.orderBy,
    order: state.tableStore.order,
    filterDisplay: state.tableStore.filterDisplay
  };
};

const CustomTableHead = props => {
  const { filterDisplay, order, orderBy, pageSize, currentPage } = props;

  const setOrder = (order, orderBy, property) => {
    if (order === undefined) {
      return "asc";
    } else {
      return orderBy !== property ? order : order === "asc" ? "desc" : "asc";
    }
  };

  const sortHandler = property => event => {
    const newOrder = setOrder(order, orderBy, property);
    props.getWorkerData(
      filterDisplay,
      currentPage,
      pageSize,
      property,
      newOrder
    );
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell align="left" style={{ width: 100 }}>
          First Name
        </TableCell>

        <TableCell align="left" style={{ width: 100 }}>
          Last Name
        </TableCell>

        <TableCell align="center" style={{ width: 100 }}>
          Email
        </TableCell>

        <TableCell
          style={{ width: 50 }}
          align="center"
          sortDirection={orderBy === "date_of_birth" ? order : false}
        >
          <TableSortLabel
            active={orderBy === "date_of_birth"}
            direction={order}
            onClick={sortHandler("date_of_birth")}
          >
            DOB
          </TableSortLabel>
        </TableCell>

        <TableCell
          align="center"
          style={{ width: 250 }}
          sortDirection={orderBy === "industry" ? order : false}
        >
          <TableSortLabel
            active={orderBy === "industry"}
            direction={order}
            onClick={sortHandler("industry")}
          >
            Industry
          </TableSortLabel>
        </TableCell>

        <TableCell
          align="right"
          style={{ width: 50 }}
          sortDirection={orderBy === "salary" ? order : false}
        >
          <TableSortLabel
            active={orderBy === "salary"}
            direction={order}
            onClick={sortHandler("salary")}
          >
            Salary
          </TableSortLabel>
        </TableCell>

        <TableCell align="right" style={{ width: 50 }}>
          Experience (years)
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getWorkerData
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(CustomTableHead);
