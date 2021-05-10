"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactTable = require("react-table");

var _namor = _interopRequireDefault(require("namor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const range = len => {
  const arr = [];

  for (let i = 0; i < len; i++) {
    arr.push(i);
  }

  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: _namor.default.generate({
      words: 1,
      numbers: 0
    }),
    lastName: _namor.default.generate({
      words: 1,
      numbers: 0
    }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status: statusChance > 0.66 ? 'relationship' : statusChance > 0.33 ? 'complicated' : 'single'
  };
};

function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map(d => {
      return { ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
      };
    });
  };

  return makeDataLevel();
}

const Styles = _styledComponents.default.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

function Table({
  columns,
  data
}) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: {
      pageIndex,
      pageSize
    }
  } = (0, _reactTable.useTable)({
    columns,
    data,
    initialState: {
      pageIndex: 2
    }
  }, _reactTable.usePagination); // Render the UI for your table

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("pre", null, /*#__PURE__*/_react.default.createElement("code", null, JSON.stringify({
    pageIndex,
    pageSize,
    pageCount,
    canNextPage,
    canPreviousPage
  }, null, 2))), /*#__PURE__*/_react.default.createElement("table", getTableProps(), /*#__PURE__*/_react.default.createElement("thead", null, headerGroups.map(headerGroup => /*#__PURE__*/_react.default.createElement("tr", headerGroup.getHeaderGroupProps(), headerGroup.headers.map(column => /*#__PURE__*/_react.default.createElement("th", column.getHeaderProps(), column.render('Header')))))), /*#__PURE__*/_react.default.createElement("tbody", getTableBodyProps(), page.map((row, i) => {
    prepareRow(row);
    return /*#__PURE__*/_react.default.createElement("tr", row.getRowProps(), row.cells.map(cell => {
      return /*#__PURE__*/_react.default.createElement("td", cell.getCellProps(), cell.render('Cell'));
    }));
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "pagination"
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => gotoPage(0),
    disabled: !canPreviousPage
  }, '<<'), ' ', /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => previousPage(),
    disabled: !canPreviousPage
  }, '<'), ' ', /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => nextPage(),
    disabled: !canNextPage
  }, '>'), ' ', /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => gotoPage(pageCount - 1),
    disabled: !canNextPage
  }, '>>'), ' ', /*#__PURE__*/_react.default.createElement("span", null, "Page", ' ', /*#__PURE__*/_react.default.createElement("strong", null, pageIndex + 1, " of ", pageOptions.length), ' '), /*#__PURE__*/_react.default.createElement("span", null, "| Go to page:", ' ', /*#__PURE__*/_react.default.createElement("input", {
    type: "number",
    defaultValue: pageIndex + 1,
    onChange: e => {
      const page = e.target.value ? Number(e.target.value) - 1 : 0;
      gotoPage(page);
    },
    style: {
      width: '100px'
    }
  })), ' ', /*#__PURE__*/_react.default.createElement("select", {
    value: pageSize,
    onChange: e => {
      setPageSize(Number(e.target.value));
    }
  }, [10, 20, 30, 40, 50].map(pageSize => /*#__PURE__*/_react.default.createElement("option", {
    key: pageSize,
    value: pageSize
  }, "Show ", pageSize)))));
}

function App() {
  const columns = _react.default.useMemo(() => [{
    Header: 'Name',
    columns: [{
      Header: 'First Name',
      accessor: 'firstName'
    }, {
      Header: 'Last Name',
      accessor: 'lastName'
    }]
  }, {
    Header: 'Info',
    columns: [{
      Header: 'Age',
      accessor: 'age'
    }, {
      Header: 'Visits',
      accessor: 'visits'
    }, {
      Header: 'Status',
      accessor: 'status'
    }, {
      Header: 'Profile Progress',
      accessor: 'progress'
    }]
  }], []);

  const data = _react.default.useMemo(() => makeData(100000), []);

  return /*#__PURE__*/_react.default.createElement(Styles, null, /*#__PURE__*/_react.default.createElement(Table, {
    columns: columns,
    data: data
  }));
}

var _default = App;
exports.default = _default;
