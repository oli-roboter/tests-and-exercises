import { combineReducers } from "redux";
import tableStore from "./features/tables/table-reducer";
import graphStore from "./features/graphs/graph-reducer";

const allReducers = combineReducers({
  tableStore,
  graphStore
});

export default allReducers;
