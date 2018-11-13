import * as React from 'react';
import {createSource, UIDProps, source} from "./context";
import {UID} from "./UIDComponent";

export const UIDReset: React.SFC = ({children}) => (
  <source.Provider value={createSource()}>{children}</source.Provider>
);

export const UIDFork: React.SFC = ({children}) => (
  <UIDConsumer>
    {(id) => (
      <source.Provider value={createSource(id + '-')}>
        {children}
      </source.Provider>
    )}
  </UIDConsumer>
);

export const UIDConsumer: React.SFC<UIDProps> = ({name, children}) => (
  <source.Consumer>
    {(value) => (
      <UID name={name} idSource={value} children={children}/>
    )}
  </source.Consumer>
);