import React, { useState } from 'react';
import styles from './styles.module.css'
import { evaluate } from 'mathjs';
import { Check, Clear } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const Results = () => {
    const data = useSelector(state => state.values)
    const [results, setResults] = useState({
        status: '',
        message: '',
        description: []
    })

    const validateExpression = (types, values) => {
        let isComp = false
        if (types[types.length - 1] === 'comp') {
            return false
        }
        for (var i = 0; i < types.length; i++) {
            if (types[i] === types[i + 1] && i !== types.length - 1) {
                return false
            }
            if (types[i] === 'comp' && i !== types.length - 1) {
                isComp = true
            }
            if (types[i] === 'input' && (values[i] === null || values[i] === "")) {
                return false
            }
            if (types[i] === 'opert' && types[i + 1] === 'comp' && i !== types.length - 1) {
                return false
            }
            console.log(types[i], values[i+1])
            if (((types[i] === 'comp' && values[i + 1] === '*') || (types[i] === 'comp' && values[i + 1] === '/')) && (i !== types.length - 1)) {
                return false
            }
        }
        return isComp
    }

    const splitExpression = (values, idx) => {
        let lhs = '', rhs = ''
        for (var i = 0; i < idx; i++) {
            lhs = lhs + values[i]
        }
        for (var j = idx + 1; j < values.length; j++) {
            rhs = rhs + values[j]
        }
        return [evaluate(lhs), values[idx], evaluate(rhs)]
    }

    const evaluateExpression = (event) => {
        event.preventDefault()
        let values = []
        let types = []
        data.drops.map((item, index) => {
            values.push(item.value)
            types.push(item.type)
        })
        const isValid = validateExpression(types, values)
        if (isValid) {
            const [lhs, comp, rhs] = splitExpression(values, types.indexOf('comp'))
            if (comp === '>') {
                setResults({
                    status: 'success',
                    message: 'Expression evaluated successfully! Here are the results',
                    description: [
                        `The LHS of the expression evaluates to ${lhs}`,
                        `The RHS of the expression evaluates to ${rhs}`,
                        `Hence the expression ${lhs} ${comp} ${rhs} evaluates to ${lhs > rhs}`
                    ]
                })
            }
            if (comp === '<') {
                setResults({
                    status: 'success',
                    message: 'Expression evaluated successfully! Here are the results',
                    description: [
                        `The LHS of the expression evaluates to ${lhs}`,
                        `The RHS of the expression evaluates to ${rhs}`,
                        `Hence the expression ${lhs} ${comp} ${rhs} evaluates to ${lhs < rhs}`
                    ]
                })
            }
            if (comp === '=') {
                setResults({
                    status: 'success',
                    message: 'Expression evaluated successfully! Here are the results',
                    description: [
                        `The LHS of the expression evaluates to ${lhs}`,
                        `The RHS of the expression evaluates to ${rhs}`,
                        `Hence the expression ${lhs} ${comp} ${rhs} evaluates to ${lhs === rhs}`
                    ]
                })
            }
        } else {
            if (values.length === 0) {
                setResults({
                    status: 'failure',
                    message: 'Please enter the expression !',
                    description: [
                        'Make sure that no two letters or no two operators are placed side by side',
                        'Make sure that the comparator does exist in the expression and doesn\'t come at the end of expression',
                        'Make sure that all integer fields are filled correctly'
                    ]
                })
            } else {
                setResults({
                    status: 'failure',
                    message: 'Expression evaluation failed! Please check the following possible reasons',
                    description: [
                        'Make sure that no two letters or no two operators are placed side by side',
                        'Make sure that the comparator does exist in the expression and doesn\'t come at the end of expression',
                        'Make sure that all integer fields are filled correctly'
                    ]
                })
            }
        }
    }

    return <div className={'container ' + styles.results}>
        <div className="d-flex justify-content-between">
            <button className='btn btn-primary shadow-none' onClick={evaluateExpression}>Evaluate</button>
            {results.status !== '' && <button className='btn btn-primary shadow-none' onClick={(event) => {
                event.preventDefault()
                setResults({
                    status: '',
                    message: '',
                    description: [],
                })
            }}>Clear</button>}
        </div>
        {results.status !== '' && <div className={styles.evalRes}>
            <div className={results.status === 'success' ? styles.success : styles.failure}>{results.status === 'success' ? <Check /> : <Clear />} {results.message}</div>
            {results.description.map((line, index) => {
                return <p key={index}>{line}</p>
            })}
        </div>}
    </div>;
};

export default Results;
