import { ConvertToUnit, THERMAL_UNITS } from '../src/services/unitconversion.service';

describe('Unit Conversion Tests', () => {

    it('Should not convert values if the same unit', () => {
        const testVal = 1.12777777;
        // dont convert if the same unit
        expect(ConvertToUnit(testVal, THERMAL_UNITS.F, THERMAL_UNITS.F)).toEqual(testVal);
        expect(ConvertToUnit(testVal, THERMAL_UNITS.K, THERMAL_UNITS.K)).toEqual(testVal);
        expect(ConvertToUnit(testVal, THERMAL_UNITS.C, THERMAL_UNITS.C)).toEqual(testVal);
        expect(ConvertToUnit(testVal, THERMAL_UNITS.R, THERMAL_UNITS.R)).toEqual(testVal);
    });

    it('Should convert F values to C,K,R', () => {
        const testValue = 4;
        expect(ConvertToUnit(testValue, THERMAL_UNITS.F, THERMAL_UNITS.C)).toBeCloseTo(-15.56, 2);
        expect(ConvertToUnit(testValue, THERMAL_UNITS.F, THERMAL_UNITS.K)).toBeCloseTo(257.59, 2);
        expect(ConvertToUnit(testValue, THERMAL_UNITS.F, THERMAL_UNITS.R)).toBeCloseTo(463.67, 2);
    });

    it('Should convert C values to F,K,R', () => {
        const testValue = 4;
        expect(ConvertToUnit(testValue, THERMAL_UNITS.C, THERMAL_UNITS.F)).toBeCloseTo(39.2, 2);
        expect(ConvertToUnit(testValue, THERMAL_UNITS.C, THERMAL_UNITS.K)).toBeCloseTo(277.15, 2);
        expect(ConvertToUnit(testValue, THERMAL_UNITS.C, THERMAL_UNITS.R)).toBeCloseTo(498.87, 2);
    });

    it('Should convert K values to F,C,R', () => {
        const testValue = 276;
        expect(ConvertToUnit(testValue, THERMAL_UNITS.K, THERMAL_UNITS.F)).toBeCloseTo(37.13, 2);
        expect(ConvertToUnit(testValue, THERMAL_UNITS.K, THERMAL_UNITS.C)).toBeCloseTo(2.85, 2);
        expect(ConvertToUnit(testValue, THERMAL_UNITS.K, THERMAL_UNITS.R)).toBeCloseTo(496.8, 2);
    });

    it('Should convert R values to F,C,K', () => {
        const testValue = 515.2;
        expect(ConvertToUnit(testValue, THERMAL_UNITS.R, THERMAL_UNITS.F)).toBeCloseTo(55.53, 2);
        expect(ConvertToUnit(testValue, THERMAL_UNITS.R, THERMAL_UNITS.C)).toBeCloseTo(13.07, 2);
        expect(ConvertToUnit(testValue, THERMAL_UNITS.R, THERMAL_UNITS.K)).toBeCloseTo(286.22, 2);
    });

    it('Should throw errors for unknown units', () => {
        const testValue = 42;

        expect(() => {
            ConvertToUnit(testValue, 'foo', THERMAL_UNITS.F);
        }).toThrowError('Unknown conversion unit foo');

        expect(() => {
            ConvertToUnit(testValue, THERMAL_UNITS.F, 'bar');
        }).toThrowError('Unknown conversion unit bar');
    });
});