import { ConvertToUnit, FloatEq, THERMAL_UNITS } from '../src/services/unitconversion.service';

describe('Unit Conversion Tests', () => {

    it('Should not convert values if the same unit', () => {
        const testVal = 1.12777777;
        // dont convert if the same unit
        Object.keys(THERMAL_UNITS).forEach(k => {
            expect(ConvertToUnit(testVal, THERMAL_UNITS[k], THERMAL_UNITS[k])).toEqual(testVal);
        });
    });

    it('Should convert F values to C,K,R', () => {
        const testValue = 4;
        expect(FloatEq(ConvertToUnit(testValue, THERMAL_UNITS.F, THERMAL_UNITS.C), -15.56, 2)).toBe(true);
        expect(FloatEq(ConvertToUnit(testValue, THERMAL_UNITS.F, THERMAL_UNITS.K), 257.59, 2)).toBe(true);
        expect(FloatEq(ConvertToUnit(testValue, THERMAL_UNITS.F, THERMAL_UNITS.R), 463.67, 2)).toBe(true);
    });

    it('Should convert C values to F,K,R', () => {
        const testValue = 4;
        expect(FloatEq(ConvertToUnit(testValue, THERMAL_UNITS.C, THERMAL_UNITS.F), 39.2, 1)).toBe(true);
        expect(FloatEq(ConvertToUnit(testValue, THERMAL_UNITS.C, THERMAL_UNITS.K), 277.15, 2)).toBe(true);
        expect(FloatEq(ConvertToUnit(testValue, THERMAL_UNITS.C, THERMAL_UNITS.R), 498.87, 2)).toBe(true);
    });

    it('Should convert K values to F,C,R', () => {
        const testValue = 276;
        expect(FloatEq(ConvertToUnit(testValue, THERMAL_UNITS.K, THERMAL_UNITS.F), 37.13, 2)).toBe(true);
        expect(FloatEq(ConvertToUnit(testValue, THERMAL_UNITS.K, THERMAL_UNITS.C), 2.85, 2)).toBe(true);
        expect(FloatEq(ConvertToUnit(testValue, THERMAL_UNITS.K, THERMAL_UNITS.R), 496.8, 2)).toBe(true);
    });

    it('Should convert R values to F,C,K', () => {
        const testValue = 515.2;
        expect(FloatEq(ConvertToUnit(testValue, THERMAL_UNITS.R, THERMAL_UNITS.F), 55.53, 2)).toBe(true);
        expect(FloatEq(ConvertToUnit(testValue, THERMAL_UNITS.R, THERMAL_UNITS.C), 13, 0)).toBe(true);
        expect(FloatEq(ConvertToUnit(testValue, THERMAL_UNITS.R, THERMAL_UNITS.K), 286.22, 2)).toBe(true);
    });

    it('Should report equality based on requirements', () => {
        expect(FloatEq(ConvertToUnit(84.2, THERMAL_UNITS.F, THERMAL_UNITS.R), 543.5, 0)).toBe(true);
        expect(FloatEq(ConvertToUnit(-45.14, THERMAL_UNITS.C, THERMAL_UNITS.K), 227.5, 0)).toBe(true);

        expect(FloatEq(ConvertToUnit(317.33, THERMAL_UNITS.K, THERMAL_UNITS.F), 110.5, 0)).toBe(false);
        expect(FloatEq(ConvertToUnit(317.33, THERMAL_UNITS.K, THERMAL_UNITS.F), 111.5, 0)).toBe(true);

        expect(FloatEq(ConvertToUnit(444.5, THERMAL_UNITS.R, THERMAL_UNITS.C), -30.9, 0)).toBe(false);
        expect(FloatEq(ConvertToUnit(444.5, THERMAL_UNITS.R, THERMAL_UNITS.C), -26, 0)).toBe(true);
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