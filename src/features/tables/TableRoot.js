import NumberFormat from "react-number-format";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getWorkerData } from "./table-actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CustomTableHead from "./TableHead";
import Paginator from "./Paginator";
import Filter from "./Filter";

const mapStateToProps = state => {
  return {
    gotWorkers: state.tableStore.gotWorkers,
    pageData: state.tableStore.pageData,
    currentPage: state.tableStore.currentPage,
    pageSize: state.tableStore.pageSize,
    filterDisplay: state.tableStore.filterDisplay
  };
};

class TableRoot extends Component {
  componentDidMount() {
    const { currentPage, pageSize, orderBy, filterDisplay } = this.props;
    this.props.getWorkerData(filterDisplay, currentPage, pageSize, orderBy);
  }

  render() {
    const { gotWorkers, pageData } = this.props;
    return (
      <div style={{ margin: 15 }}>
        <h3>Worker's Table</h3>

        <Paper>
          <Filter />
          {!gotWorkers && <CircularProgress color="primary" />}
          {gotWorkers && (
            <Table>
              <CustomTableHead />
              <TableBody>
                <Fragment>
                  {pageData.map(row => (
                    <TableRow key={row.id}>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ width: 100 }}
                      >
                        {row.first_name}
                      </TableCell>
                      <TableCell align="left" style={{ width: 100 }}>
                        {row.last_name}
                      </TableCell>
                      <TableCell align="center" style={{ width: 100 }}>
                        {row.email}
                      </TableCell>
                      <TableCell align="center" style={{ width: 50 }}>
                        {row.date_of_birth}
                      </TableCell>
                      <TableCell align="center" style={{ width: 250 }}>
                        {row.industry}
                      </TableCell>
                      <TableCell align="right" style={{ width: 50 }}>
                        <NumberFormat
                          value={Math.round(row.salary)}
                          thousandSeparator={true}
                          displayType={"text"}
                        />
                      </TableCell>
                      <TableCell align="right" style={{ width: 50 }}>
                        {row.years_of_experience === null
                          ? row.years_of_experience
                          : row.years_of_experience.toFixed(1)}
                      </TableCell>
                    </TableRow>
                  ))}
                </Fragment>
              </TableBody>
            </Table>
          )}
          <Paginator />
        </Paper>
      </div>
    );
  }
}

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
)(TableRoot);
