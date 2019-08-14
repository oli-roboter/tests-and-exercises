import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setPageNumber, setRowsPerPage } from "./table-actions";
import TablePagination from "@material-ui/core/TablePagination";

const mapStateToProps = state => {
  return {
    pageData: state.tableStore.tableData,
    currentPage: state.tableStore.currentPage,
    pageSize: state.tableStore.pageSize,
    totalRows: state.tableStore.totalRows,
    orderBy: state.tableStore.orderBy,
    order: state.tableStore.order,
    filterDisplay: state.tableStore.filterDisplay
  };
};

const Paginator = props => {
  const {
    filterDisplay,
    totalRows,
    currentPage,
    pageSize,
    order,
    orderBy
  } = props;

  const handleChangePage = (e, newPage) => {
    props.setPageNumber(filterDisplay, newPage, pageSize, orderBy, order);
  };

  const handleChangeRowsPerPage = e => {
    props.setRowsPerPage(
      filterDisplay,
      currentPage,
      e.target.value,
      orderBy,
      order
    );
  };

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={totalRows}
      rowsPerPage={pageSize}
      page={currentPage}
      backIconButtonProps={{
        "aria-label": "Previous Page"
      }}
      nextIconButtonProps={{
        "aria-label": "Next Page"
      }}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setPageNumber,
      setRowsPerPage
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Paginator);
