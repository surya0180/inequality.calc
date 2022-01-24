import React from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.css'

const Values = () => {
    const data = useSelector(state => state.values)
    return <div className={'container ' + styles.values}>
        <h3>Alphabet values</h3>
        <div className="d-flex flex-column flex-wrap align-items-center" style={{ height: '70vh' }}>
            {data.values.map((item, index) => {
                return item.type === 'letter' && <div key={index} className={styles.valInd + " shadow"}><b>{item.letter}</b>: {item.value}</div>
            })}
        </div>
    </div>
};

export default Values;
