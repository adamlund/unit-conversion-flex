/**
 * Standard string values for supported thermal units
 */
export const THERMAL_UNITS = {
    C: 'celcius',
    F: 'fahrenheight',
    R: 'rankine',
    K: 'kelvin',
};

function UnitToKelvin(value, unitFrom) {
    switch(unitFrom) {
        case THERMAL_UNITS.C: // 0°C + 273.15 = 273.15K
        return (value + 273.15);

        case THERMAL_UNITS.R: // °R × 5/9 = °K
        return (value * (5/9));

        case THERMAL_UNITS.F: // (0°F − 32) × 5/9 + 273.15 = °K
        return ((value - 32) * (5/9) + 273.15);

        case THERMAL_UNITS.K: // °K = °K
        return value;

        default:
        throw new Error(`Unknown conversion unit ${unitFrom}`);
    }
}

function KelvinToUnit(value, unitTo) {
    switch(unitTo) {
        case THERMAL_UNITS.C: // 0°K - 273.15 = -273.15°C
        return (value - 273.15);

        case THERMAL_UNITS.R: // °K × 1.8 = °R
        return (value * (9/5));

        case THERMAL_UNITS.F: // (0°K − 273.15) × 9/5 + 32 = °F
        return ((value - 273.15) * (9/5) + 32);

        case THERMAL_UNITS.K: // °K = °K
        return value;

        default:
        throw new Error(`Unknown conversion unit ${unitTo}`);
    } 
}

/**
 * Convert a temperature value from one unit to another.
 * First convert all incoming values to Kelvin as the SI unit.
 * @param {string or number} value 
 * @param {string} unitFrom one from THERMAL_UNITS, source
 * @param {string} unitTo one from THERMAL_UNITS, target
 */
export const ConvertToUnit = (value, unitFrom, unitTo) => {
    return (unitFrom === unitTo)
        ? parseFloat(value)
        : parseFloat(KelvinToUnit(UnitToKelvin(parseFloat(value), unitFrom), unitTo));
};

/**
 * Test equality of decimal numbers using toFixed(n)
 * @param {number} a decimal number
 * @param {number} b decimal number
 * @param {number} precision 0-3 to specify precision value for toFixed(n)
 */
export const FloatEq = (a, b, precision) => (a.toFixed(precision) === b.toFixed(precision));
