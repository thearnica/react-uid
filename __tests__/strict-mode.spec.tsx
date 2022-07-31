import { render } from '@testing-library/react';
import * as React from 'react';

import { UIDReset, useUID } from '../src';

describe('uid hooks in strict mode', () => {
  it('test uid', () => {
    const Target = ({ x }: any) => {
      const id = useUID();

      return (
        <i>
          {x} == {id} ?
        </i>
      );
    };

    const markup = (
      <React.StrictMode>
        <UIDReset prefix={''}>
          <Target x={1} />
        </UIDReset>
      </React.StrictMode>
    );

    const test = render(markup);
    expect(test.baseElement.innerHTML).toMatchSnapshot();
  });
});
