import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';

const mockObj = {
  kids: {},
  kits: {},
  books: {},
  accessories: {},
};

describe('Component Homepage', () => {
  it('should render without crashing', () => {
    const component = shallow(<HomepageComponent allProducts={mockObj}/>);
    expect(component).toBeTruthy();
  });
});
