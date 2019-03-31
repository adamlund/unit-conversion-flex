import React from 'react';
import { mount } from 'enzyme';
import App from '../src/components/app';

test('Mount and load App', () => {
    const wrapper = mount(<App />);
    expect(wrapper.html()).toContain('Temperature');
});