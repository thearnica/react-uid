import * as React from 'react';
import {counter, getId, getPrefix, UIDProps} from "./context";

// --------------------------------------------

export class UID extends React.Component<UIDProps> {
  state = {
    quartz: this.props.idSource || counter,
    prefix: getPrefix(this.props.idSource),
    id: getId(this.props.idSource || counter)
  };


  prefixId(id: number | string) {
    const uid = (this.state.prefix + id);
    return String(this.props.name ? this.props.name(uid) : uid);
  }

  uid = (item: any) => this.prefixId(this.state.id + '-' + this.state.quartz.uid(item));

  render() {
    const {children} = this.props;
    const {id} = this.state;
    return children(this.prefixId(id), this.uid)
  }
}