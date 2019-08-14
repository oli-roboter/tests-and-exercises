import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import CustomTableHead from "./TableHead";
import Paginator from "./Paginator";
import Search from "./Search";
import CustomTableRow from "./CustomTableRow";
import PieChart from "../charts/PieChart";
import { getData } from "../../data/data-function";

class TableMain extends Component {
  state = {
    gotData: false,
    pageData: [],
    pageNumber: 0,
    totalRows: 0,
    filterStr: "",
    pageSize: 10,
    resetDetail: false
  };

  componentDidMount() {
    const { pageNumber, pageSize, filterStr } = this.state;
    const data = getData(pageNumber, pageSize, filterStr);

    this.setState({
      pageData: data.pageData,
      totalRows: data.totalRows,
      gotData: true
    });
  }

  handlePageChange = (event, newPage) => {
    this.setState({ resetDetail: true });
    const { pageSize, filterStr } = this.state;
    const data = getData(newPage, pageSize, filterStr);
    this.setState(
      {
        pageData: data.pageData,
        pageNumber: newPage,
        totalRows: data.totalRows
      },
      () => this.setState({ resetDetail: false })
    );
  };

  handleSearch = event => {
    const { pageNumber, pageSize } = this.state;
    this.setState({ resetDetail: true });
    const data = getData(pageNumber, pageSize, event.target.value);
    this.setState(
      {
        pageData: data.pageData,
        totalRows: data.totalRows,
        filterStr: event.target.value
      },
      () => this.setState({ resetDetail: false })
    );
  };

  render() {
    const {
      gotData,
      pageData,
      pageNumber,
      totalRows,
      filterStr,
      resetDetail
    } = this.state;

    return (
      <div style={{ margin: 15 }}>
        <h3>Sale's orders</h3>

        <Paper>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginRight: 10
            }}
          >
            {gotData && <PieChart filterStr={filterStr} />}
            <Search onChange={this.handleSearch} />
          </div>
          <Table>
            <CustomTableHead />
            {gotData && (
              <TableBody>
                {pageData.map((row, idx) => (
                  <CustomTableRow
                    key={idx}
                    rowData={row}
                    resetDetail={resetDetail}
                  />
                ))}
              </TableBody>
            )}
          </Table>

          <Paginator
            pageNumber={pageNumber}
            totalRows={totalRows}
            handlePageChange={this.handlePageChange}
          />
        </Paper>
      </div>
    );
  }
}

export default TableMain;
