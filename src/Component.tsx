import * as React from 'react';
import {generateUID} from "./uid";

const createSource = () => ({
  value: 1,
  uid: generateUID()
});

let counter = createSource();

const context = React.createContext(createSource());

export interface UIDProps {
  name?: (n: string|number) => string,
  idSource?: {
    value: number,
    uid: (item: any) => string,
  },
  children: (id: string, uid: (item: any) => string) => React.ReactNode
}

const getId = (source: typeof counter) => source.value++;

export class UID extends React.Component<UIDProps> {
  state = {
    quartz: this.props.idSource || counter,
    id: getId(this.props.idSource || counter)
  };

  prefixId = (id: number | string) => String(this.props.name ? this.props.name(id) : id);

  render() {
    const {children} = this.props;
    const {id, quartz} = this.state;
    return children(this.prefixId(id), (item: any) => this.prefixId(quartz.uid(item)))
  }
}

export const UIDReset: React.SFC = ({children}) => (
  <context.Provider value={createSource()}>{children}</context.Provider>
);

export const SmartUID: React.SFC<UIDProps> = (props) => (
  <context.Consumer>
    {(value) => <UID {...props} idSource={value}/>}
  </context.Consumer>
);