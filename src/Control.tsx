import * as React from 'react';

import { useState } from 'react';

import { UID } from './UIDComponent';
import { createSource, UIDProps, source } from './context';
import { useUID } from './hooks';

interface WithPrefix {
  prefix?: string;
}

/**
 * UID isolation component, required for SSR and testing.
 * Wrap your application with it to guarantee UID consistency between SSR and CSR.
 * @param {String} [prefix] - prefix for all generated ids
 * @example
 * <UIDReset>
 *    <App />
 * </UIDReset/>
 * @see https://github.com/thearnica/react-uid#server-side-friendly-uid
 */
export const UIDReset: React.FC<React.PropsWithChildren<WithPrefix>> = ({ children, prefix = '' }) => {
  const [valueSource] = useState(() => createSource(prefix));

  return <source.Provider value={valueSource}>{children}</source.Provider>;
};

/**
 * Creates a sub-ids for nested components, isolating from inside a branch.
 * Useful for self-contained elements or code splitting
 * @see https://github.com/thearnica/react-uid#code-splitting
 */
export const UIDFork: React.FC<React.PropsWithChildren<WithPrefix>> = ({ children, prefix = '' }) => {
  const id = useUID();
  const [valueSource] = useState(() => createSource(id + '-' + prefix));

  return <source.Provider value={valueSource}>{children}</source.Provider>;
};

/**
 * UID in form of renderProps. Supports nesting and SSR. Prefer {@link useUID} hook version if possible.
 * @see https://github.com/thearnica/react-uid#server-side-friendly-uid
 * @see https://github.com/thearnica/react-uid#react-components
 * @example
 * // get UID to connect label to input
 * <UIDConsumer>
 *   {(id)} => <label htmlFor={id}><input id={id}/>}
 * </UIDConsumer>
 *
 * // get uid to generate uid for a keys in a list
 * <UIDConsumer>
 *   {(, uid)} => items.map(item => <li key={uid(item) />)}
 * </UIDConsumer>
 *
 * @see {@link useUID} - a hook version of this component
 * @see {@link UID} - not SSR compatible version
 */
export const UIDConsumer: React.FC<UIDProps> = ({ name, children }) => (
  <source.Consumer>{(value) => <UID name={name} idSource={value} children={children} />}</source.Consumer>
);
