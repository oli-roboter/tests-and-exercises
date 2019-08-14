import { TABLE_ACTION_TYPES } from "./table-actions";

const defaultState = {
  pageSize: 10,
  totalRows: 0,
  gotWorkers: false,
  currentPage: 0,
  pageData: null,
  orderBy: null,
  order: null,
  filterDisplay: ""
};

export default function tableReducer(state = defaultState, action) {
  switch (action.type) {
    case TABLE_ACTION_TYPES.GET_ALL:
      return {
        ...state,
        gotWorkers: false
      };

    case TABLE_ACTION_TYPES.GOT_ALL:
      return {
        ...state,
        gotWorkers: true,
        pageData: action.payload.tableData,
        orderBy: action.payload.orderBy,
        order: action.payload.order,
        totalRows: action.payload.totalRows,
        filterDisplay: action.payload.str,
        currentPage: action.payload.currentPage
      };

    case TABLE_ACTION_TYPES.SET_PAGE:
      return {
        ...state,
        gotWorkers: false,
        currentPage: action.payload.page
      };

    case TABLE_ACTION_TYPES.SET_PAGE_OK:
      return {
        ...state,
        gotWorkers: true,
        pageData: action.payload.tableData
      };

    case TABLE_ACTION_TYPES.SET_PAGESIZE:
      return {
        ...state,
        gotWorkers: false,
        pageSize: action.payload.rowsPerPage
      };

    case TABLE_ACTION_TYPES.SET_PAGESIZE_OK:
      return {
        ...state,
        gotWorkers: true,
        pageData: action.payload.tableData
      };

    default:
      return state;
  }
}
