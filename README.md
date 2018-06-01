UID
=======
[![Build Status](https://travis-ci.org/thearnica/react-uid.svg?branch=master)](https://travis-ci.org/thearnica/react-uid)
[![NPM version](https://img.shields.io/npm/v/react-uid.svg)](https://www.npmjs.com/package/react-uid)


Generate UID for an item, Renderless UID containers, SSR-friendly UID generation

## API
- `uid` - generates UID for an object(function and so on). Quite usable for React `key` property.
```js
 import {uid} from 'react-uid';
 
 data.map( item => <li key={uid(item)}>{item}</li>)
``` 

- `UID` - renderless container for generation Ids
```js
 <UID>
     {id => (
       <Fragment>
         <input id={id} />
         <label htmlFor={id} />
       </Fragment> 
     )}
 </UID> 
```

- `UIDReset` && `SmartUID` - SSR friendly UID. Could maintain consistency across renders.
```js
 <UIDReset>
     <SmartUID>
         {id => (
           <Fragment>
             <input id={id} />
             <label htmlFor={id} />
           </Fragment> 
         )}
     </SmartUID>
 </UIDReset>
```

# Licence
 MIT
  
