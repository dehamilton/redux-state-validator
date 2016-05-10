import Ajv from 'ajv';

function createValidator(options = {}) {
  const { state = [], schema, collapsed = true } = options;
  
  if (state.length === 0 || typeof schema === 'undefined') {
    return () => next => action => next(action);
  }
  
  function writeGroup(message, style) {
    const consoleCollapsed = collapsed ? console.groupCollapsed : console.group;
    consoleCollapsed.call(console, message, style);
  }
    
  function printErrors(stateName, errors) {
    writeGroup(`%c Redux State Validation Errors, ${stateName}`, 'color: white; background-color: red');
    errors.forEach(error => {
      writeGroup(`${error.dataPath}: ${error.message}`);
      console.log(error);
      console.groupEnd();
    });
    console.groupEnd();
  }
  
  function testSchema(data, stateName) {
    var validator = Ajv({ allErrors: true });
    var validate = validator.compile(schema[stateName]);
    var valid = validate(data);
    if (valid) console.log(`%c Redux State Validation Passed, ${stateName}`, 'color: green;');
    else printErrors(stateName, validate.errors);
  }
  
  return ({ getState }) => next => action => {
    const returnedValue = next(action);
    state.forEach(s => testSchema(getState()[s], s));
    return returnedValue;
  };
}

export default createValidator;
