import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadScatterGraph } from "./graph-actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  MarkSeries
} from "react-vis";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "../../../node_modules/react-vis/dist/style.css";

const mapStateToProps = state => {
  return {
    scatterData: state.graphStore.scatterData,
    industries: state.graphStore.industries,
    gotIndustries: state.graphStore.gotIndustries,
    filterScatterArr: state.graphStore.filterScatterArr
  };
};

const ScatterGraph = ({ width, height, ...props }) => {
  const animatedComponents = makeAnimated();
  const { scatterData, industries, gotIndustries, filterScatterArr } = props;

  const handleChange = selectedOption => {
    return selectedOption !== null
      ? props.loadScatterGraph(
          "date_of_birth",
          "salary",
          selectedOption.map(item => item.value)
        )
      : props.loadScatterGraph("date_of_birth", "salary", []);
  };

  return (
    <div>
      {gotIndustries ? (
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          defaultValue={filterScatterArr.map(item => {
            return { value: item, label: item };
          })}
          isMulti
          options={industries}
          onChange={handleChange}
        />
      ) : (
        <CircularProgress />
      )}
      <XYPlot width={width} height={height}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis
          title={"Year of Birth"}
          style={{
            title: { fontSize: 16, fontWeight: "bold", fill: "lightBlue" }
          }}
          tickFormat={value => moment(value, "YYYY").format("YYYY")}
        />
        <YAxis
          title={"£ '000"}
          style={{
            title: { fontSize: 16, fontWeight: "bold", fill: "lightBlue" }
          }}
        />
        <MarkSeries data={scatterData} opacity={0.7} />
      </XYPlot>
    </div>
  );
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadScatterGraph
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(ScatterGraph);
