import React from 'react';
import { shallow } from 'enzyme';
import { BestsellerSummaryComponent } from './BestsellerSummary';

describe('Component BestsellerSummary', () => {
  it('should render without crashing', () => {
    const component = shallow(<BestsellerSummaryComponent />);
    expect(component).toBeTruthy();
  });
});
