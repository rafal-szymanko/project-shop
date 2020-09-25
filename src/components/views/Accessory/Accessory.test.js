import React from 'react';
import { shallow } from 'enzyme';
import { AccessoryComponent } from './Accessory';

describe('Component Accessory', () => {
  it('should render without crashing', () => {
    const component = shallow(<AccessoryComponent />);
    expect(component).toBeTruthy();
  });
});
