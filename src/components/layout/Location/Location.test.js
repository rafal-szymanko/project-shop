import React from 'react';
import { shallow } from 'enzyme';
import { LocationComponent } from './Location';

describe('Component Location', () => {
  it('should render without crashing', () => {
    const component = shallow(<LocationComponent />);
    expect(component).toBeTruthy();
  });
});
