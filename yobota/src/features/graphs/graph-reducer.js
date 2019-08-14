import { GRAPH_ACTION_TYPES } from "./graph-actions";

const defaultState = {
  scatterData: null,
  gotScatterData: false,
  gotIndustries: false,
  industries: null,
  filterScatterArr: null,
  filterBarArr: null,
  gotBarData: false,
  barData: null
};

export default function graphReducer(state = defaultState, action) {
  switch (action.type) {
    case GRAPH_ACTION_TYPES.GET_SCATTER_DATA:
      return {
        ...state,
        gotScatterData: false
      };

    case GRAPH_ACTION_TYPES.GOT_SCATTER_DATA:
      return {
        ...state,
        gotScatterData: true,
        scatterData: action.payload.data,
        filterScatterArr: action.payload.filterScatterArr
      };

    case GRAPH_ACTION_TYPES.GET_INDUSTRIES:
      return {
        ...state,
        gotIndustries: false
      };

    case GRAPH_ACTION_TYPES.GOT_INDUSTRIES:
      return {
        ...state,
        gotIndustries: true,
        industries: action.payload.industries
      };

    case GRAPH_ACTION_TYPES.GET_BAR_DATA:
      return {
        ...state,
        gotBarData: false
      };

    case GRAPH_ACTION_TYPES.GOT_BAR_DATA:
      return {
        ...state,
        gotBarData: true,
        barData: action.payload.data,
        filterBarArr: action.payload.filterBarArr
      };

    default:
      return state;
  }
}
