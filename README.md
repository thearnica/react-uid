UID
=======
[![Build Status](https://travis-ci.org/thearnica/react-uid.svg?branch=master)](https://travis-ci.org/thearnica/react-uid)
[![coverage-badge](https://img.shields.io/codecov/c/github/thearnica/react-uid.svg?style=flat-square)](https://codecov.io/github/thearnica/react-uid)
[![NPM version](https://img.shields.io/npm/v/react-uid.svg)](https://www.npmjs.com/package/react-uid)


Generate UID for an item, Renderless UID containers, SSR-friendly UID generation

## API
- `uid(item, [index])` - generates UID for an object(function and so on). Quite usable for React `key` property.
`item` should be an object, but could be anything. In case it is not an "object", and might have non-unique value - you have to specify second argument - `index`
```js
 import {uid} from 'react-uid';
 
 // objects
 const data = [{a:1}, {b:2}];
 data.map( item => <li key={uid(item)}>{item}</li>)
 
 // unique strings
 const data = ["a", "b"];
 data.map( item => <li key={uid(item)}>{item}</li>)
 
 // strings
 const data = ["a", "a"];
  data.map( (item, index) => <li key={uid(item, index)}>{item}</li>)
``` 

- `UID` - renderless container for generation Ids
```js
 import {UID} from 'react-uid';

 <UID>
     {id => (
       <Fragment>
         <input id={id} />
         <label htmlFor={id} />
       </Fragment> 
     )}
 </UID>

 // you can apply some "naming conventions" to the keys
  <UID name={ id => `unique-${id}` }>
      {id => (
        <Fragment>
          <input id={id} />
          <label htmlFor={id} />
        </Fragment>
      )}
  </UID>
  
  // UID also provide `uid` as a second argument
  <UID>
       {(id,uid) => (
         data.map( item => <li key={uid(item)}>{item}</li>) 
       )}
  </UID>
  
  // in the case `item` is not an object, but number or string - provide and index
  <UID>
       {(id,uid) => (
         data.map( (item, index) => <li key={uid(item, index)}>{item}</li>) 
       )}
  </UID>
```

- `UIDReset` && `SmartUID` - SSR friendly UID. Could maintain consistency across renders.
Including "scoped" `uid`, available as a second argument.
```js
 import {UIDReset, SmartUID} from 'react-uid';

 <UIDReset>
     <SmartUID>
         {(id,uid) => (
           <Fragment>
             <input id={id} />
             <label htmlFor={id} />
             data.map( item => <li key={uid(item)}>{item}</li>)
           </Fragment> 
         )}
     </SmartUID>
 </UIDReset>
```

# Licence
 MIT
  
