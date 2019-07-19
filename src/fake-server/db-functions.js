import moment from "moment";
import { DATA_TYPES } from "./constants";
const workers = require("./MOCK_DATA.json");

// TABLES
export function getTableData(filterStr, currentPage, pageSize, orderBy, order) {
  const filteredData =
    filterStr === "" ? workers : filterData(workers, filterStr);
  const sortedData = handleSorting(filteredData, orderBy, order);
  const dataLength = sortedData.length;

  const dataInPage = sortedData.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );
  return { dataInPage, dataLength };
}

function filterData(arr, str) {
  const filteredResults = arr.filter(x => {
    const fullName = x.first_name + "/" + x.last_name;
    const adjFullName = fullName.includes(null)
      ? fullName.replace(null, "")
      : fullName;
    return adjFullName.toLowerCase().includes(str.toLowerCase());
  });
  return filteredResults;
}

function handleSorting(arr, orderBy, order) {
  if (DATA_TYPES[orderBy] === "date") {
    return sortByDate(arr, orderBy, order);
  } else if (DATA_TYPES[orderBy] === "text") {
    return sortByText(arr, orderBy, order);
  } else if (DATA_TYPES[orderBy] === "number") {
    return sortByNumber(arr, orderBy, order);
  } else return arr;
}

function sortByNumber(arr, orderBy, order) {
  return arr.sort((a, b) => {
    if (a[orderBy] === b[orderBy]) {
      return 0;
    } else if (a[orderBy] === null) {
      return -1;
    } else if (order === "asc") {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });
}

function sortByText(arr, orderBy, order) {
  arr.forEach(item =>
    item[orderBy] === null ? (item[orderBy] = "") : item[orderBy]
  );
  return arr.sort((a, b) => {
    if (a[orderBy] === b[orderBy]) {
      return 0;
    } else if (a[orderBy] === null) {
      return -1;
    } else if (order === "asc") {
      return ("" + a[orderBy]).localeCompare("" + b[orderBy]);
    } else {
      return ("" + b[orderBy]).localeCompare("" + a[orderBy]);
    }
  });
}

function sortByDate(arr, orderBy, order) {
  return arr.sort((a, b) => {
    const aDate = moment(a[orderBy], "DD/MM/YYYY").toDate();
    const bDate = moment(b[orderBy], "DD/MM/YYYY").toDate();
    if (aDate === bDate) {
      return 0;
    } else if (order === "asc") {
      return aDate < bDate ? -1 : 1;
    } else {
      return aDate < bDate ? 1 : -1;
    }
  });
}

//GRAPHS
export function getScatterData(xAxis, yAxis, filterArr) {
  const noEmptyData = workers.filter(r => {
    return r[xAxis] !== null && r[yAxis] !== null;
  });

  const filteredData = returnFilteredData(noEmptyData, filterArr);

  return filteredData.map(r => {
    return {
      //x axis always dob
      x: moment(r[xAxis], "DD/MM/YYYY").format("YYYY"),
      y: r[yAxis] / 1000
    };
  });
}

export function getBarChartData(axis, filterArr) {
  const noEmptyData = workers.filter(r => {
    return r[axis] !== null;
  });
  const filteredData = returnFilteredData(noEmptyData, filterArr);
  const groupedData = groupByBirthYear(filteredData);

  return groupedData;
}

export function getUniqueFields(fieldName) {
  const result = [];
  const map = new Map();
  for (const item of workers) {
    if (!map.has(item[fieldName])) {
      map.set(item[fieldName], true);
      result.push({
        value: item[fieldName],
        label: item[fieldName]
      });
    }
  }
  return result.sort((a, b) => (a.value < b.value ? -1 : 1));
}

function returnFilteredData(dataArr, filter) {
  if (filter.length > 0) {
    return dataArr.filter(data => filter.includes(data.industry));
  } else return dataArr;
}

function groupByBirthYear(dataArr) {
  const result = [];
  const dateMap = new Map();
  for (const item of dataArr) {
    const yob = moment(item.date_of_birth, "DD/MM/YYYY").format("YYYY");
    if (!dateMap.has(yob)) {
      dateMap.set(yob, 1);
    } else {
      dateMap.set(yob, dateMap.get(yob) + 1);
    }
  }

  dateMap.forEach((key, value) => {
    result.push({ x: value, y: key });
  });
  return result.sort((a, b) => (a.x < b.x ? -1 : 1));
}
