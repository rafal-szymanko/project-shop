import React from 'react';
import { shallow } from 'enzyme';
import { KitsComponent } from './Kits';

describe('Component Kits', () => {
  it('should render without crashing', () => {
    const component = shallow(<KitsComponent kits={{}}/>);
    expect(component).toBeTruthy();
  });
});
