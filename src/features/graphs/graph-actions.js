import {
  getScatterData,
  getBarChartData,
  getUniqueFields
} from "../../fake-server/db-functions";

export const GRAPH_ACTION_TYPES = {
  GET_SCATTER_DATA: "GRAPH/GET_SCATTER_DATA",
  GOT_SCATTER_DATA: "GRAPH/GOT_SCATTER_DATA",
  GET_INDUSTRIES: "GRAPH/GET_INDUSTRIES",
  GOT_INDUSTRIES: "GRAPH/GOT_INDUSTRIES",
  GET_BAR_DATA: "GRAPH/GET_BAR_DATA",
  GOT_BAR_DATA: "GRAPH/GOT_BAR_DATA"
};

export function loadScatterGraph(xAxis, yAxis, filterScatterArr) {
  return dispatch => {
    dispatch({ type: GRAPH_ACTION_TYPES.GET_SCATTER_DATA });
    const data = getScatterData(xAxis, yAxis, filterScatterArr);
    return setTimeout(
      () =>
        dispatch({
          type: GRAPH_ACTION_TYPES.GOT_SCATTER_DATA,
          payload: { data, filterScatterArr }
        }),
      200
    );
  };
}

export function getIndustries() {
  return dispatch => {
    dispatch({ type: GRAPH_ACTION_TYPES.GET_INDUSTRIES });
    const industries = getUniqueFields("industry");
    return setTimeout(
      () =>
        dispatch({
          type: GRAPH_ACTION_TYPES.GOT_INDUSTRIES,
          payload: { industries }
        }),
      300
    );
  };
}

export function loadBarGraph(axis, filterBarArr) {
  return dispatch => {
    dispatch({ type: GRAPH_ACTION_TYPES.GET_BAR_DATA });
    const data = getBarChartData(axis, filterBarArr);
    return setTimeout(
      () =>
        dispatch({
          type: GRAPH_ACTION_TYPES.GOT_BAR_DATA,
          payload: { data, filterBarArr }
        }),
      400
    );
  };
}
