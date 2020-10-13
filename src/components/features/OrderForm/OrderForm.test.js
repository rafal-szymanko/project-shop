import React from 'react';
import { shallow } from 'enzyme';
import { OrderFormComponent } from './OrderForm';

const mockObj = {
  products: [],
  totalAmount: 0,
};

describe('Component OrderForm', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderFormComponent basket={mockObj}/>);
    expect(component).toBeTruthy();
  });
});
