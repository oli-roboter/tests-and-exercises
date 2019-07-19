import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadScatterGraph, loadBarGraph, getIndustries } from "./graph-actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import ScatterGraph from "./ScatterGraph";
import BarGraph from "./BarGraph";

const mapStateToProps = state => {
  return {
    gotScatterData: state.graphStore.gotScatterData,
    gotBarData: state.graphStore.gotBarData
  };
};

class GraphRoot extends Component {
  componentDidMount() {
    this.props.loadScatterGraph("date_of_birth", "salary", []);
    this.props.loadBarGraph("date_of_birth", []);
    this.props.getIndustries();
  }

  render() {
    const { gotScatterData, gotBarData } = this.props;
    return (
      <div>
        <div
          style={{
            height: 450,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <h3>Salary vs Date of Birth Analysis</h3>
          {!gotScatterData && <CircularProgress color="primary" />}
          {gotScatterData && <ScatterGraph height={350} width={1000} />}
        </div>

        <div
          style={{
            height: 450,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <h3>Workforce Age Graph</h3>
          {!gotBarData && <CircularProgress color="primary" />}
          {gotBarData && <BarGraph height={350} width={1000} />}
        </div>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadScatterGraph,
      loadBarGraph,
      getIndustries
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(GraphRoot);
