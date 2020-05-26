import * as React from 'react';
import {createSource, UIDProps, source} from "./context";
import {UID} from "./UIDComponent";

interface WithPrefix {
  prefix?: string;
}

export const UIDReset: React.SFC<WithPrefix> = ({children, prefix = ''}) => (
  <source.Provider value={createSource(prefix)}>{children}</source.Provider>
);

export const UIDFork: React.SFC<WithPrefix> = ({children, prefix = ''}) => (
  <UIDConsumer>
    {(id) => (
      <source.Provider value={createSource(id + '-' + prefix)}>
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