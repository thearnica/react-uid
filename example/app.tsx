import * as React from 'react';
import {Component} from 'react';
import {UID, UIDConsumer, UIDFork, useUIDSeed} from "../src";

const HookEmailField = () => {
  const getId = useUIDSeed();
  return (
    <div>
      <label htmlFor={getId("email")}>Email: </label>
      <input id={getId("email")} name="email"/>
      <span>id is {getId("email")}</span>
    </div>
  );
};

const RPEmailField = () => {
  return (
    <UIDConsumer>
      {(_, getId) => (
        <div>
          <label htmlFor={getId("email")}>Email: </label>
          <input id={getId("email")} name="email"/>
          <span>id is {getId("email")}</span>
        </div>
      )}
    </UIDConsumer>
  );
};

const EmailField = () => {
  return (
    <UID>
      {id => (
        <div>
          <label htmlFor={id}>Email: </label>
          <input id={id} name="email"/>
          <span>id is {id}</span>
        </div>
      )}
    </UID>
  );
};

const CEmailField = () => {
  return (
    <UIDConsumer>
      {id => (
        <div>
          <label htmlFor={id}>Email: </label>
          <input id={id} name="email"/>
          <span>id is {id}</span>
        </div>
      )}
    </UIDConsumer>
  );
};


const HookApp = () => (
  <>
    Hook
    <HookEmailField/>
    <UIDFork>
      <HookEmailField/>
      <HookEmailField/>
    </UIDFork>
    <UIDFork>
      <HookEmailField/>
      <UIDFork>
        <HookEmailField/>
        <HookEmailField/>
      </UIDFork>
      <HookEmailField/>
    </UIDFork>
    <HookEmailField/>
    <HookEmailField/>
  </>
);

const UIDApp = () => (
  <>
    Component
    <EmailField/>
    <UIDFork>
      <EmailField/>
      <EmailField/>
    </UIDFork>
    <UIDFork>
      <EmailField/>
      <UIDFork>
        <EmailField/>
        <EmailField/>
      </UIDFork>
      <EmailField/>
    </UIDFork>
    <EmailField/>
    <EmailField/>
  </>
)

const CUIDApp = () => (
  <>
    Smart Component 
    <CEmailField/>
    <UIDFork>
      <CEmailField/>
      <CEmailField/>
    </UIDFork>
    <UIDFork>
      <CEmailField/>
      <UIDFork>
        <CEmailField/>
        <CEmailField/>
      </UIDFork>
      <CEmailField/>
    </UIDFork>
    <CEmailField/>
    <CEmailField/>
  </>
)

const RPUIDApp = () => (
  <>
    RP
    <RPEmailField/>
    <UIDFork>
      <RPEmailField/>
      <RPEmailField/>
    </UIDFork>
    <UIDFork>
      <RPEmailField/>
      <UIDFork>
        <RPEmailField/>
        <RPEmailField/>
      </UIDFork>
      <RPEmailField/>
    </UIDFork>
    <RPEmailField/>
    <RPEmailField/>
  </>
)

export default class App extends Component <{}> {

  render() {
    return (
      <div>
        <HookApp/>
        <UIDApp/>
        <CUIDApp/>
        <RPUIDApp/>
      </div>
    )
  }
}