import React from "react";
import TablePagination from "@material-ui/core/TablePagination";

const Paginator = ({ totalRows, pageNumber, handlePageChange }) => {
  return (
    <TablePagination
      component="div"
      rowsPerPageOptions={[10]}
      count={totalRows}
      rowsPerPage={10}
      page={pageNumber}
      backIconButtonProps={{
        "aria-label": "Previous Page"
      }}
      nextIconButtonProps={{
        "aria-label": "Next Page"
      }}
      onChangePage={handlePageChange}
    />
  );
};

export default Paginator;
