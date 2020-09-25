import React from 'react';
import { shallow } from 'enzyme';
import { KitComponent } from './Kit';

describe('Component Kit', () => {
  it('should render without crashing', () => {
    const component = shallow(<KitComponent />);
    expect(component).toBeTruthy();
  });
});
