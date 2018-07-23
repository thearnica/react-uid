import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import {uid, UID, UIDReset, generateUID, UIDFork, UIDConsumer} from "../src";


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

  it('test UIDConsumer', () => {
    const a = {};
    const b = {};
    const testRenderer1 = TestRenderer.create(
      <UIDReset>
        <UIDConsumer>
          {id => <span>{id}</span>}
        </UIDConsumer>
        <UIDConsumer>
          {(id, uid) => <span>{id} {uid(a)}</span>}
        </UIDConsumer>
        <UID>
          {id => <span>{id}</span>}
        </UID>
      </UIDReset>
    );

    const testRenderer2 = TestRenderer.create(
      <UIDReset>
        <UIDConsumer>
          {id => <span>{id}</span>}
        </UIDConsumer>
        <UIDReset>
          <UIDConsumer>
            {(id, uid) => <span>{id} {uid(b)}</span>}
          </UIDConsumer>
        </UIDReset>
        <UID>
          {id => <span>{id}</span>}
        </UID>
      </UIDReset>
    );


    expect(testRenderer1.toJSON()).toMatchSnapshot();
    expect(testRenderer2.toJSON()).toMatchSnapshot();
  });

  it('test UIDFork', () => {
    let cc = 0;
    let rc = 0;

    const d = () => new Promise( resolve => setImmediate(resolve));

    const createDelayed = () => {
      const counter = cc++;
      let run = 0;
      let resolve: any = () => ({});
      const p = new Promise(r => resolve = r);

      class C extends React.Component<any, any> {
        state = {
          unblocked: false
        }

        componentDidMount() {
          p.then(() => {
            run=rc++;
            this.setState({unblocked: true})
          })
        }

        render() {
          return this.state.unblocked ? this.props.children : null;
        }
      }

      return {C, p, resolve};
    };

    const testRenderer = (C1: any, C2: any) => (
      TestRenderer.create(
        <UIDReset>
          <UIDFork>
            <C1>
              <UIDConsumer>
                {id => <span>{id}</span>}
              </UIDConsumer>
              <UIDConsumer>
                {id => <span>{id}</span>}
              </UIDConsumer>
            </C1>
          </UIDFork>
          <UIDFork>
            <C2>
              <UIDConsumer>
                {id => <span>{id}</span>}
              </UIDConsumer>
              <UIDConsumer>
                {id => <span>{id}</span>}
              </UIDConsumer>
            </C2>
          </UIDFork>
          <UIDFork>
            <C1>
              <UIDConsumer>
                {id => <span>{id}</span>}
              </UIDConsumer>
            </C1>
          </UIDFork>
          <UIDFork>
            <C2>
              <UIDConsumer>
                {id => <span>{id}</span>}
              </UIDConsumer>
            </C2>
          </UIDFork>
        </UIDReset>
      )
    );

    const C11 = createDelayed();
    const C12 = createDelayed();
    const C21 = createDelayed();
    const C22 = createDelayed();

    const r1 = testRenderer(C11.C, C12.C);
    const r2 = testRenderer(C21.C, C22.C);

    return Promise
      .resolve()
      .then(() => C11.resolve())
      .then(d)
      .then(() => C12.resolve())
      .then(d)
      .then(() => C22.resolve())
      .then(d)
      .then(() => C21.resolve())
      .then(d)
      .then(() => {

        expect(r1.toJSON()).toEqual(r2.toJSON());
        expect(r1.toJSON()).toMatchSnapshot();
        // expect(r2.toJSON()).toMatchSnapshot();
      });
  });
});
