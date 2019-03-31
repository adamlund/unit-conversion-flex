import React from 'react';
import { ConvertToUnit, THERMAL_UNITS } from '../services/unitconversion.service';

/**
 * Ordinarily would import my own library for this...
 * @param {string} str capitalize
 */
const Cap = str => (`${str.charAt(0).toUpperCase()}${str.slice(1)}`);

/**
 * Internal functional component to render value comparison.
 * @param {inputTemp: float, targetTemp: float } props provide inputTemp and targetTemp as float values 
 */
const CompareValues = ({ inputTemp, targetTemp }) => {
    if(isNaN(inputTemp)) {
        return <span data-qa="indicator-invalid" className="indicator invalid">Invalid</span>
    }
    return (inputTemp.toFixed(2) === targetTemp.toFixed(2))
        ? <span data-qa="indicator-correct" className="indicator correct">Correct</span>
        : <span data-qa="indicator-incorrect" className="indicator incorrect">Incorrect</span>;
};

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
                    />
                }
            </div>
        );
    }
}

export default UnitConversion;
