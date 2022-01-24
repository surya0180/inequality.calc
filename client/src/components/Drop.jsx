import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import LetterCard from './Card';
import styles from './styles.module.css'

const Drop = () => {
  const data = useSelector(state => state.values)
  return <Droppable droppableId='drop-here' direction='horizontal'>
    {(provided) => (
      <div className={'container ' + styles.drop} ref={provided.innerRef} {...provided.droppableProps}>
        <div className="d-flex flex-wrap">
          {data.drops.map((item, index) => {
            return <LetterCard
              key={item.id}
              id={item.id}
              type={item.type}
              action={'drop'}
              letter={item.letter}
              value={item.value}
              margin={'mymargin'}
              index={index}
            />
          })}
          {provided.placeholder}
        </div>
      </div>
    )}
  </Droppable>;
};

export default Drop;
