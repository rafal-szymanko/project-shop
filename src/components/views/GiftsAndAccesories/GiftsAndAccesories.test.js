import React from 'react';
import { shallow } from 'enzyme';
import { GiftsAndAccesoriesComponent } from './GiftsAndAccesories';

describe('Component GiftsAndAccesories', () => {
  it('should render without crashing', () => {
    const component = shallow(<GiftsAndAccesoriesComponent accessories={{}}/>);
    expect(component).toBeTruthy();
  });
});
