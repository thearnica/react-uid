import * as React from 'react';

let counter = {
  value: 0
};

const context = React.createContext({value: 0});

export interface UIDProps {
  name?: (n: number) => string,
  idSource?: { value: number },
  children: (n: string) => React.ReactNode
}

const getId = (source: typeof counter) => source.value++;

export class UID extends React.Component<UIDProps> {
  state = {
    id: getId(this.props.idSource || counter)
  };

  render() {
    const {name, children} = this.props;
    const {id} = this.state;
    return children(String(name ? name(id) : id))
  }
}

export const UIDReset: React.SFC = ({children}) => <context.Provider value={{value: 0}}>{children}</context.Provider>;
export const SmartUID: React.SFC<UIDProps> = (props) => (
  <context.Consumer>
    {
      (value) => <UID {...props} idSource={value}/>
    }
  </context.Consumer>
);