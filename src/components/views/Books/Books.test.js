import React from 'react';
import { shallow } from 'enzyme';
import { BooksComponent } from './Books';

describe('Component Books', () => {
  it('should render without crashing', () => {
    const component = shallow(<BooksComponent books={{}} />);
    expect(component).toBeTruthy();
  });
});
