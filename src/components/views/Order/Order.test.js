import React from 'react';
import { shallow } from 'enzyme';
import { OrderComponent } from './Order';

const mockObj = {
  products: [],
  totalAmount: 0,
};

describe('Component Order', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderComponent basket={mockObj}/>);
    expect(component).toBeTruthy();
  });
});
