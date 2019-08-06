import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import LoadingIndicator from 'elements/organisms/LoadingIndicator/index';

describe('<LoadingIndicator />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<LoadingIndicator />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});