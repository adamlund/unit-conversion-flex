import React from 'react';
import { mount } from 'enzyme';
import { THERMAL_UNITS } from '../src/services/unitconversion.service';
import UnitConversion from '../src/components/conversion.component';

describe('Unit Conversion', () => {
    it('should mount', () => {
        const wrapper = mount(<UnitConversion />);
        expect(wrapper.find('input[name="inputTemp"]')).toHaveLength(1);
        expect(wrapper.find('select[name="inputUnit"]')).toHaveLength(1);
        expect(wrapper.find('input[name="targetTemp"]')).toHaveLength(1);
        expect(wrapper.find('select[name="targetUnit"]')).toHaveLength(1);
    });
    it('should respond to a correct conversion value', () => {
        const wrapper = mount(<UnitConversion />);
        wrapper.find('input[name="inputTemp"]').simulate('change', { target: { name: 'inputTemp', value: '32.5'}});
        wrapper.find('select[name="inputUnit"]').simulate('change', { target: { name: 'inputUnit', value: THERMAL_UNITS.F }});

        wrapper.find('select[name="targetUnit"]').simulate('change', { target: { name: 'targetUnit', value: THERMAL_UNITS.C }});
        wrapper.find('input[name="targetTemp"]').simulate('change', { target: { name: 'targetTemp', value: '0.28' }});
        wrapper.update();
        expect(wrapper.find('[data-qa="indicator-correct"]')).toHaveLength(1);
    });
    it('should respond to incorrect conversion value', () => {
        const wrapper = mount(<UnitConversion />);
        wrapper.find('input[name="inputTemp"]').simulate('change', { target: { name: 'inputTemp', value: '10'}});
        wrapper.find('select[name="inputUnit"]').simulate('change', { target: { name: 'inputUnit', value: THERMAL_UNITS.R }});

        wrapper.find('select[name="targetUnit"]').simulate('change', { target: { name: 'targetUnit', value: THERMAL_UNITS.K }});
        wrapper.find('input[name="targetTemp"]').simulate('change', { target: { name: 'targetTemp', value: '5.1' }});
        wrapper.update();
        expect(wrapper.find('[data-qa="indicator-correct"]')).toHaveLength(0);
        expect(wrapper.find('[data-qa="indicator-incorrect"]')).toHaveLength(1);
    });
    it('should respond to invalid conversion values', () => {
        const wrapper = mount(<UnitConversion />);
        wrapper.find('input[name="inputTemp"]').simulate('change', { target: { name: 'inputTemp', value: 'hello'}});
        wrapper.find('select[name="inputUnit"]').simulate('change', { target: { name: 'inputUnit', value: THERMAL_UNITS.R }});

        wrapper.find('select[name="targetUnit"]').simulate('change', { target: { name: 'targetUnit', value: THERMAL_UNITS.K }});
        wrapper.find('input[name="targetTemp"]').simulate('change', { target: { name: 'targetTemp', value: '5.1' }});
        wrapper.update();
        expect(wrapper.find('[data-qa="indicator-correct"]')).toHaveLength(0);
        expect(wrapper.find('[data-qa="indicator-incorrect"]')).toHaveLength(0);
        expect(wrapper.find('[data-qa="indicator-invalid"]')).toHaveLength(1);
    });
});
