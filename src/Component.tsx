import * as React from 'react';
import {generateUID} from "./uid";

export type IdSourceType = {
  value: number,
  prefix: string,
  uid: (item: any, index?: number) => string,
}

export const createSource = (prefix = ''): IdSourceType => ({
  value: 1,
  prefix: prefix,
  uid: generateUID()
});

export interface UIDProps {
  name?: (n: string | number) => string,
  idSource?: IdSourceType,
  children: (id: string, uid: (item: any, index?: number) => string) => React.ReactNode
}

export let counter = createSource();

export const source = React.createContext(createSource());
export const lastUsed = React.createContext("");

export const getId = (source: IdSourceType) => source.value++;
export const getPrefix = (source?: IdSourceType) => source ? source.prefix : '';

// --------------------------------------------

export class UID extends React.Component<UIDProps> {
  state = {
    quartz: this.props.idSource || counter,
    prefix: getPrefix(this.props.idSource),
    id: getId(this.props.idSource || counter)
  };


  prefixId (id: number | string) {
    const uid = (this.state.prefix + id);
    return String(this.props.name ? this.props.name(uid) : uid);
  }

  uid = (item: any) => this.prefixId(this.state.quartz.uid(item));

  render() {
    const {children} = this.props;
    const {id} = this.state;
    return children(this.prefixId(id), this.uid)
  }
}

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