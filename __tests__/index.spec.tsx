import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import {uid, UID, UIDReset, generateUID, SmartUID} from "../src";


describe('uid', () => {
  it('test uid', () => {
    const a = {};
    const b = {}
    expect(uid(a)).toEqual('uid1');
    expect(uid(a)).toEqual('uid1');
    expect(uid(b)).toEqual('uid2');
    expect(uid(a)).toEqual('uid1');
    expect(uid(a, 42)).toEqual('uid1');

    expect(uid("test")).toEqual("not-unique-test");
    expect(uid(42)).toEqual("not-unique-42");

    expect(uid(42, 1)).toEqual("by-index-1");
    expect(uid(42, 2)).toEqual("by-index-2");
  });

  it('generate', () => {
    const uid1 = generateUID();
    const uid2 = generateUID();

    const a = {};
    const b = {}
    expect(uid1(a)).toEqual('uid1');
    expect(uid2(b)).toEqual('uid1');
    expect(uid1(b)).toEqual('uid2');
    expect(uid2(a)).toEqual('uid2');
  })
});

describe('UID', () => {
  it('test UID', () => {
    const a = {};
    const b = {};
    const testRenderer = TestRenderer.create(
      <div>
        <UID>
          {id => <span>{id}</span>}
        </UID>
        <UID>
          {(id, uid) => <span>{id} {uid(a)}</span>}
        </UID>
      </div>
    );

    testRenderer.update(
      <div>
        <UID>
          {id => <span>{id}</span>}
        </UID>
        <UID>
          {(id, uid) => <span>{id} {uid(a)}</span>}
        </UID>
      </div>
    );

    expect(testRenderer.toJSON()).toMatchSnapshot();

    const testRenderer2 = TestRenderer.create(
      <div>
        <UID name={id => `key-${id}`}>
          {id => <span>{id}</span>}
        </UID>
        <UID name={id => `key-${id}`}>
          {(id, uid) => <span>{id} {uid(b)}</span>}
        </UID>
      </div>
    );

    expect(testRenderer2.toJSON()).toMatchSnapshot();
  })

  it('test UID', () => {
    const a = {};
    const b = {};
    const testRenderer1 = TestRenderer.create(
      <UIDReset>
        <SmartUID>
          {id => <span>{id}</span>}
        </SmartUID>
        <SmartUID>
          {(id, uid) => <span>{id} {uid(a)}</span>}
        </SmartUID>
        <UID>
          {id => <span>{id}</span>}
        </UID>
      </UIDReset>
    );

    const testRenderer2 = TestRenderer.create(
      <UIDReset>
        <SmartUID>
          {id => <span>{id}</span>}
        </SmartUID>
        <UIDReset>
          <SmartUID>
            {(id, uid) => <span>{id} {uid(b)}</span>}
          </SmartUID>
        </UIDReset>
        <UID>
          {id => <span>{id}</span>}
        </UID>
      </UIDReset>
    );


    expect(testRenderer1.toJSON()).toMatchSnapshot();
    expect(testRenderer2.toJSON()).toMatchSnapshot();
  })
});
