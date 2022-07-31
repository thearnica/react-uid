import * as React from 'react';

import { counter, getId, getPrefix, UIDProps } from './context';

// --------------------------------------------

const prefixId = (id: number | string, prefix: string, name: UIDProps['name']) => {
  const uid = prefix + id;

  return String(name ? name(uid) : uid);
};

/**
 * @deprecated
 * UID in form of renderProps (not SSR friendly)
 * @see https://github.com/thearnica/react-uid#react-components
 * @example
 * // get UID to connect label to input
 * <UID>
 *   {(id)} => <label htmlFor={id}><input id={id}/>}
 * </UID>
 *
 * // get uid to generate uid for a keys in a list
 * <UID>
 *   {(, uid)} => items.map(item => <li key={uid(item) />)}
 * </UID>
 */
export class UID extends React.Component<UIDProps> {
  state = {
    quartz: this.props.idSource || counter,
    prefix: getPrefix(this.props.idSource),
    id: getId(this.props.idSource || counter),
  };

  uid = (item: any): string =>
    prefixId(this.state.id + '-' + this.state.quartz.uid(item), this.state.prefix, this.props.name);

  render() {
    const { children, name } = this.props;
    const { id, prefix } = this.state;

    return children(prefixId(id, prefix, name), this.uid);
  }
}
