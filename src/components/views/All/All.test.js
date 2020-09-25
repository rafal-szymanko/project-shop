import React from 'react';
import { shallow } from 'enzyme';
import { AllComponent } from './All';

describe('Component All', () => {
  it('should render without crashing', () => {
    const component = shallow(<AllComponent />);
    expect(component).toBeTruthy();
  });
});
