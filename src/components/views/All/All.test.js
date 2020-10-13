import React from 'react';
import { shallow } from 'enzyme';
import { AllComponent } from './All';

const mockObj = {
  kids: {},
  kits: {},
  books: {},
  accessories: {},
};

describe('Component All', () => {
  it('should render without crashing', () => {
    const component = shallow(<AllComponent allProducts={mockObj}/>);
    expect(component).toBeTruthy();
  });
});
