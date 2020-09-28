import React from 'react';
import { shallow } from 'enzyme';
import { ItemSummaryComponent } from './ItemSummary';

describe('Component ItemSummary', () => {
  it('should render without crashing', () => {
    const component = shallow(<ItemSummaryComponent />);
    expect(component).toBeTruthy();
  });
});
