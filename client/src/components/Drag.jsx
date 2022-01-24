import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import LetterCard from './Card';
import styles from './styles.module.css'


const Drag = () => {
    const data = useSelector(state => state.values)
    const letters1 = data.drags.filter((item) => item.id < 14)
    const letters2 = data.drags.filter((item) => item.id > 13 && item.type === 'letter')
    const operts = data.drags.filter((item) => item.type !== 'letter')
    return <div className={'container ' + styles.drag}>
        <Droppable droppableId='drag-from-here-1' direction='horizontal'>
            {(provided) => (
                <div className="d-flex justify-content-around" ref={provided.innerRef} {...provided.droppableProps}>
                    {letters1.map((item, index) => {
                        return <LetterCard
                            key={item.id}
                            id={item.id}
                            index={item.id}
                            type={item.type}
                            action={'drag'}
                            letter={item.letter}
                            value={item.value}
                            margin={'mymargin'}
                        />
                    })}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
        <Droppable droppableId='drag-from-here-2' direction='horizontal'>
            {(provided) => (
                <div className="d-flex justify-content-around" ref={provided.innerRef} {...provided.droppableProps}>
                    {letters2.map((item, index) => {
                        return <LetterCard
                            key={item.id}
                            id={item.id}
                            index={item.id}
                            type={item.type}
                            action={'drag'}
                            letter={item.letter}
                            value={item.value}
                            margin={'mymargin'}
                        />
                    })}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
        <Droppable droppableId='drag-from-here-3' direction='horizontal'>
            {(provided) => (
                <div className="d-flex justify-content-around" ref={provided.innerRef} {...provided.droppableProps}>
                    {operts.map((item, index) => {
                        return <LetterCard
                            key={item.id}
                            id={item.id}
                            index={item.id}
                            type={item.type}
                            action={'drag'}
                            letter={item.letter}
                            value={item.value}
                            margin={'mymargin'}
                        />
                    })}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </div>;
};

export default Drag;
