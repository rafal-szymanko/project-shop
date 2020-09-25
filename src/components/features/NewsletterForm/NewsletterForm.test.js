import React from 'react';
import { shallow } from 'enzyme';
import { NewsletterFormComponent } from './NewsletterForm';

describe('Component NewsletterForm', () => {
  it('should render without crashing', () => {
    const component = shallow(<NewsletterFormComponent />);
    expect(component).toBeTruthy();
  });
});
