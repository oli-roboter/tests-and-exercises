import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getWorkerData } from "./table-actions";
import FilterListIcon from "@material-ui/icons/FilterList";

const mapStateToProps = state => {
  return {
    pageSize: state.tableStore.pageSize,
    orderBy: state.tableStore.orderBy,
    order: state.tableStore.order,
    filterDisplay: state.tableStore.filterDisplay
  };
};

const Filter = props => {
  const { pageSize, orderBy, order, filterDisplay } = props;

  const handleChange = e =>
    props.getWorkerData(e.target.value, 0, pageSize, orderBy, order);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FilterListIcon style={{ margin: 8 }} />
      <input
        type="text"
        onChange={handleChange}
        value={filterDisplay}
        style={{
          padding: 5,
          margin: 5
        }}
      />
    </div>
  );
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getWorkerData }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Filter);
