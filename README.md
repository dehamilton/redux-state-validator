# JSON Schema Validator for Redux

## Install
`npm i --save-dev redux-state-validator`

## Usage
```javascript
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createValidator from 'redux-state-validator';

import { applicationStateSchema } from './state-schema';
const validatorMiddleware = createValidator({ schema: applicationStateSchema, state: ['formEditor', 'options'] });

const store = createStore(
  reducer,
  applyMiddleware(thunk, promise, validatorMiddleware)
);
```

Additionally, you will need to add these lines to your webpack configuration

Under plugins:

new webpack.IgnorePlugin(/regenerator|nodent|js\-beautify/, /ajv/)

Under loaders:

{ test: /\.json$/, loader: 'json-loader' }

## API
`redux-state-validator` exposes a single constructor function.

```
createValidator(options?: Object) => ValidatorMiddleware
```

### Options
```js
{
 state = array of redux reducer objects to validate
 schema = JSON schema object to be used for validation 
 collapsed = true | false // collapse console log group
}
```