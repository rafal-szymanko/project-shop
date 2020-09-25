import React from 'react';
import { shallow } from 'enzyme';
import { BanerComponent } from './Baner';

describe('Component Baner', () => {
  it('should render without crashing', () => {
    const component = shallow(<BanerComponent />);
    expect(component).toBeTruthy();
  });
});
