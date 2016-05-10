'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ajv = require('ajv');

var _ajv2 = _interopRequireDefault(_ajv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createValidator() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var _options$state = options.state;
  var state = _options$state === undefined ? [] : _options$state;
  var schema = options.schema;
  var _options$collapsed = options.collapsed;
  var collapsed = _options$collapsed === undefined ? true : _options$collapsed;


  if (state.length === 0 || typeof schema === 'undefined') {
    return function () {
      return function (next) {
        return function (action) {
          return next(action);
        };
      };
    };
  }

  function writeGroup(message, style) {
    var consoleCollapsed = collapsed ? console.groupCollapsed : console.group;
    consoleCollapsed.call(console, message, style);
  }

  function printErrors(stateName, errors) {
    writeGroup('%c Redux State Validation Errors, ' + stateName, 'color: white; background-color: red');
    errors.forEach(function (error) {
      writeGroup(error.dataPath + ': ' + error.message);
      console.log(error);
      console.groupEnd();
    });
    console.groupEnd();
  }

  function testSchema(data, stateName) {
    var validator = (0, _ajv2.default)({ allErrors: true });
    var validate = validator.compile(schema[stateName]);
    var valid = validate(data);
    if (valid) console.log('%c Redux State Validation Passed, ' + stateName, 'color: green;');else printErrors(stateName, validate.errors);
  }

  return function (_ref) {
    var getState = _ref.getState;
    return function (next) {
      return function (action) {
        var returnedValue = next(action);
        state.forEach(function (s) {
          return testSchema(getState()[s], s);
        });
        return returnedValue;
      };
    };
  };
}

exports.default = createValidator;
module.exports = exports['default'];