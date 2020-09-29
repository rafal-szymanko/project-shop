import React from 'react';
import { shallow } from 'enzyme';
import { CartIconComponent } from './CartIcon';

describe('Component CartIcon', () => {
  it('should render without crashing', () => {
    const component = shallow(<CartIconComponent />);
    expect(component).toBeTruthy();
  });
});
