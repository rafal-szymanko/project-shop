import React from 'react';
import { shallow } from 'enzyme';
import { CartIconComponent } from './CartIcon';

const mockObj = {
  products: [],
  totalAmount: 0,
};

describe('Component CartIcon', () => {
  it('should render without crashing', () => {
    const component = shallow(<CartIconComponent cart={mockObj} />);
    expect(component).toBeTruthy();
  });
});
