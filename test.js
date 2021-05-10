"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDropzone = require("react-dropzone");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getColor = props => {
  if (props.isDragAccept) {
    return '#00e676';
  }

  if (props.isDragReject) {
    return '#ff1744';
  }

  if (props.isDragActive) {
    return '#2196f3';
  }

  return '#eeeeee';
};

const Container = _styledComponents.default.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;
const Root = _styledComponents.default.div`
  height:500px;
  length:400px;
  background:#c8dbd6;
  display:grid;
  place-items:center;
`;

function StyledDropzone(props) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = (0, _reactDropzone.useDropzone)({
    accept: 'image/*'
  });
  return /*#__PURE__*/_react.default.createElement(Root, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(Container, getRootProps({
    isDragActive,
    isDragAccept,
    isDragReject
  }), /*#__PURE__*/_react.default.createElement("input", getInputProps()), /*#__PURE__*/_react.default.createElement("p", null, "Drag 'n' drop some files here, or click to select files"))));
}

var _default = StyledDropzone;
exports.default = _default;
