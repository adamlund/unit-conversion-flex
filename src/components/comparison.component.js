import React from 'react';
import PropTypes from 'prop-types';
import { FloatEq } from '../services/unitconversion.service';

/**
 * Functional component to render value comparison.
 * Provide inputTemp and targetTemp as number values, precision as integer 0-3
 */
const CompareValues = ({ inputTemp, targetTemp, precision }) => {
    if(isNaN(inputTemp)) {
        return <span data-qa="indicator-invalid" className="indicator invalid">Invalid</span>
    }
    return (FloatEq(inputTemp, targetTemp, precision))
        ? <span data-qa="indicator-correct" className="indicator correct">Correct</span>
        : <span data-qa="indicator-incorrect" className="indicator incorrect">Incorrect</span>;
};

CompareValues.propTypes = {
    inputTemp: PropTypes.number,
    targetTemp: PropTypes.number,
    precision: PropTypes.number,
};
CompareValues.defaultProps = {
    inputTemp: 0,
    targetTemp: 0,
    precision: 0,
};

export default CompareValues;
