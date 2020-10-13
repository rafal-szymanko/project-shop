import React from 'react';
import { shallow } from 'enzyme';
import { CartComponent } from './Cart';

const mockObj = {
  products: [],
  totalAmount: 0,
};

describe('Component Cart', () => {
  it('should render without crashing', () => {
    const component = shallow(<CartComponent basket={mockObj}/>);
    expect(component).toBeTruthy();
  });
});
