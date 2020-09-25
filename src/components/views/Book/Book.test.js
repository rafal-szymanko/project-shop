import React from 'react';
import { shallow } from 'enzyme';
import { BookComponent } from './Book';

describe('Component Book', () => {
  it('should render without crashing', () => {
    const component = shallow(<BookComponent />);
    expect(component).toBeTruthy();
  });
});
