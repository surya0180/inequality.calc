import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import LetterCard from "./Card";
import styles from "./styles.module.css";

const Drag = () => {
  const data = useSelector((state) => state.values);
  const letters = data.drags;

  return (
    <div className={"container-fluid " + styles.drag}>
      <Droppable droppableId="drag-from-here-1" direction="horizontal">
        {(provided) => (
          <div
            className={"d-flex " + styles.tokens}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {letters.map((item, index) => {
              return (
                <LetterCard
                  key={item.id}
                  id={item.id}
                  index={item.id}
                  type={item.type}
                  action={"drag"}
                  letter={item.letter}
                  value={item.value}
                  margin={"mymargin"}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Drag;
