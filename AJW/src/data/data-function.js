const data = require("./Orders.json");

export function getData(pageNumber, pageSize, filterStr) {
  const filteredData = getFilteredData(filterStr);
  const totalRows = filteredData.length;
  const pageData = filteredData.filter((item, idx) =>
    pageNumber * pageSize <= idx && idx < pageNumber * pageSize + 10
      ? item
      : null
  );

  return { pageData, totalRows };
}

function getFilteredData(filterStr) {
  return data.orders.sOrders.data.filter(item => {
    const searchString = item.soNumber + "/" + item.pnUpper;
    return searchString.includes(filterStr) ? item : null;
  });
}

export function getOrderStatus(filterStr) {
  const filteredData = getFilteredData(filterStr);
  const total = filteredData.length;
  const openOrders = filteredData.filter(item => item.openFlag === "T").length;
  return { openOrders, closedOrders: total - openOrders };
}

export function getOrderDetail(SaleOrderDetailAutoKey) {
  return data.orders.sOrders.data.filter(
    item => item.SaleOrderDetailAutoKey === SaleOrderDetailAutoKey
  );
}
