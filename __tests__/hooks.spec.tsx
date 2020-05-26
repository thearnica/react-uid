import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import {UIDReset, UIDFork, UIDConsumer, useUID, useUIDSeed} from "../src";


describe('uid hooks', () => {
  it('test uid', () => {
    const Target = () => {
      const id = useUID();
      const seed = useUIDSeed();
      return <i>id1: {id} id2:{seed('second-')}</i>;
    }

    const Component = (
      <UIDReset prefix={"(test-uid)"}>
        <Target/>
        <Target/>
        ---fork1:
        <UIDFork prefix={"fork1:"}>
          <Target/>
        </UIDFork>
        ---
        <Target/>
        ---fork2:
        <UIDFork>
          <Target/>
        </UIDFork>
        ---
        <UIDConsumer>
          {(uid) => <i>{uid}</i>}
        </UIDConsumer>
      </UIDReset>
    );

    const testRenderer = TestRenderer.create(Component);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});