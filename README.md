UID
=======
[![Build Status](https://travis-ci.org/thearnica/react-uid.svg?branch=master)](https://travis-ci.org/thearnica/react-uid)
[![coverage-badge](https://img.shields.io/codecov/c/github/thearnica/react-uid.svg?style=flat-square)](https://codecov.io/github/thearnica/react-uid)
[![NPM version](https://img.shields.io/npm/v/react-uid.svg)](https://www.npmjs.com/package/react-uid)
[![Greenkeeper badge](https://badges.greenkeeper.io/thearnica/react-uid.svg)](https://greenkeeper.io/)
[![bundle size](https://badgen.net/bundlephobia/minzip/react-uid)](https://bundlephobia.com/result?p=react-uid)
[![downloads](https://badgen.net/npm/dm/react-uid)](https://www.npmtrends.com/react-uid)

To generate a _stable_ UID/Key for a given `item`, consistently between client and server, __in 900 bytes__.

Example - https://codesandbox.io/s/kkmwr6vv47

## API
React UID provides 3 different APIs
- vanilla js API - `uid(item) -> key` 
- React Component, via renderProp based API - `<UID>{ id => <><label htmlFor={id}/><input id={id}/></>}</UID>
- React Hooks - `useUID`

#### Javascript
- `uid(item, [index])` - generates UID for an object(array, function and so on), result could be used as React `key`.
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

JS API might be NOT (multi-tenant)__SSR friendly__,

#### React Components
- (deprecated)`UID` - renderless container for generation Ids
- `UIDConsumer` - renderless container for generation Ids
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
       {(_, uid) => (
         data.map( item => <li key={uid(item)}>{item}</li>) 
       )}
  </UID>
  
  // in the case `item` is not an object, but number or string - provide and index
  <UID>
       {(_, uid) => (
         data.map( (item, index) => <li key={uid(item, index)}>{item}</li>) 
       )}
  </UID>
```
The difference between `uid` and `UID` versions are in "nesting" - any `UID` used inside another `UID` would contain "parent prefix" in the result, scoping `uid` to the local tree branch.

UID might be NOT __SSR friendly__,

#### Hooks (16.8+)
- `useUID()` will generate a "stable" UID
- `useUIDSeed()` will generate a seed generator, you can use for multiple fields
```js
const Form = () => {
  const uid = useUID();  
  return (
    <>
     <label for={uid}>Email: </label>
     <input id={uid} name="email" />
    </>
  )
}

const Form = () => {
  const seed = useUIDSeed();  
  return (
    <>
     <label for={seed('email')}>Email: </label>
     <input id={seed('email')} name="email" />
     {data.map(item => <div key={seed(item)}>...</div>
    </>
  )
}
```
Hooks API __is SSR friendly__,

### Server-side friendly UID

- `UIDReset`, `UIDConsumer`, `UIDFork` - SSR friendly UID. Could maintain consistency across renders.
They are much more complex than `UID`, and provide functionality you might not need.

The key difference - they are not using global "singlentone" to track used IDs, 
but read it from Context API, thus works without side effects.

Next example will generate the same code, regardless how many time you will render it
```js
 import {UIDReset, UIDConsumer} from 'react-uid';

 <UIDReset>
     <UIDConsumer>
         {(id,uid) => (
           <Fragment>
             <input id={id} />
             <label htmlFor={id} />
             data.map( item => <li key={uid(item)}>{item}</li>)
           </Fragment> 
         )}
     </UIDConsumer>
 </UIDReset>
```

__UID__ is not 100% SSR friendly - use __UIDConsumer__.

### Code splitting
Codesplitting may affect the order or existence of the components, so alter
the `componentDidMount` order, and change the generated ID as result.

In case of SPA, this is not something you should be bothered about, but for SSR
this could be fatal.

Next example  will generate consistent keys regardless of component mount order.
Each call to `UIDFork` creates a new branch of UIDs untangled from siblings. 
```js
import {UIDReset, UIDFork, UIDConsumer} from 'react-uid';

 <UIDReset>
     <UIDFork>
      <AsyncLoadedCompoent>
         <UIDConsumer>
           { uid => <span>{uid} is unique </span>}
         </UIDConsumer>
     </UIDFork>
     <UIDFork>
       <AsyncLoadedCompoent>
          <UIDConsumer>
            { uid => <span>{uid} is unique </span>}
          </UIDConsumer>
      </UIDFork>    
 </UIDReset>
```

The hooks API only needs the `<UIDFork>` wrapper.

### So hard?
"Basic API" is not using Context API to keep realization simple, and React tree more flat.

# Types
Written in TypeScript

# Licence
 MIT
  
