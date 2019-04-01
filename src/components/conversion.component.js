import React from 'react';
import CompareValues from './comparison.component';
import { ConvertToUnit, THERMAL_UNITS } from '../services/unitconversion.service';

/**
 * Shorthand to capitalize
 * @param {string} str capitalize
 */
const Cap = str => (`${str.charAt(0).toUpperCase()}${str.slice(1)}`);

/**
 * Given a temperature input, input unit, output unit, and test value.
 * Determine if the input and test values match.
 */
class UnitConversion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputTemp: '0',
            inputUnit: '',
            targetTemp: '0',
            targetUnit: '',
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        const { target } = event;
        const { name, value } = target;
        this.setState({ [name]: value });
    }

    render() {
        const { inputTemp, targetTemp, inputUnit, targetUnit } = this.state;
        const unitsDefined = (inputUnit !== '' && targetUnit !== '');
        return (
            <div>
                Convert
                <input type="text" name="inputTemp" value={inputTemp} onChange={this.onChange} /> 
                <select value={inputUnit} name="inputUnit" onChange={this.onChange}>
                    <option value=''>Input unit</option>
                    {Object
                        .keys(THERMAL_UNITS)
                        .map(tk => (
                            <option
                                key={`inputUnit-${THERMAL_UNITS[tk]}`}
                                value={THERMAL_UNITS[tk]}
                            >{Cap(THERMAL_UNITS[tk])}
                            </option>
                        ))}
                </select>
                to
                <select value={targetUnit} name="targetUnit" onChange={this.onChange}>
                    <option value=''>Target Unit</option>
                    {Object
                        .keys(THERMAL_UNITS)
                        .map(tk => (
                            <option
                                key={`targetUnit-${THERMAL_UNITS[tk]}`}
                                value={THERMAL_UNITS[tk]}
                            >{Cap(THERMAL_UNITS[tk])}
                            </option>
                        ))}
                </select>
                Answer
                <input type="text" name="targetTemp" value={targetTemp} onChange={this.onChange} /> 
                {(unitsDefined) && 
                    <CompareValues
                        inputTemp={ConvertToUnit(inputTemp, inputUnit, targetUnit)}
                        targetTemp={parseFloat(targetTemp)}
                        precision={0}
                    />
                }
            </div>
        );
    }
}

export default UnitConversion;
