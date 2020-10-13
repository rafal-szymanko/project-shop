import React from 'react';
import { shallow } from 'enzyme';
import { KidsComponent } from './Kids';

describe('Component Kids', () => {
  it('should render without crashing', () => {
    const component = shallow(<KidsComponent forKids={{}} />);
    expect(component).toBeTruthy();
  });
});
