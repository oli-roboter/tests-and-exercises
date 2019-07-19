import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import CircularProgress from "@material-ui/core/CircularProgress";
import { loadBarGraph } from "./graph-actions";
import {
  XYPlot,
  VerticalBarSeries,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines
} from "react-vis";
import "../../../node_modules/react-vis/dist/style.css";

const mapStateToProps = state => {
  return {
    barData: state.graphStore.barData,
    industries: state.graphStore.industries,
    gotIndustries: state.graphStore.gotIndustries,
    filterBarArr: state.graphStore.filterBarArr
  };
};

const BarGraph = ({ height, width, yAxisLimits, ...props }) => {
  const animatedComponents = makeAnimated();
  const { barData, gotIndustries, filterBarArr, industries } = props;

  const handleChange = selectedOption => {
    return selectedOption !== null
      ? props.loadBarGraph(
          "date_of_birth",
          selectedOption.map(item => item.value)
        )
      : props.loadBarGraph("date_of_birth", []);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {gotIndustries ? (
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          defaultValue={filterBarArr.map(item => {
            return { value: item, label: item };
          })}
          isMulti
          options={industries}
          onChange={handleChange}
        />
      ) : (
        <CircularProgress />
      )}

      <XYPlot xType="ordinal" width={width} height={height}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis
          title={"Year of Birth"}
          style={{
            title: { fontSize: 16, fontWeight: "bold", fill: "lightBlue" }
          }}
          tickFormat={value => moment(value, "YYYY").format("YY")}
        />
        <YAxis
          title={"People"}
          style={{
            title: { fontSize: 16, fontWeight: "bold", fill: "lightBlue" }
          }}
        />
        <VerticalBarSeries data={barData} />
      </XYPlot>
    </div>
  );
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ loadBarGraph }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(BarGraph);
