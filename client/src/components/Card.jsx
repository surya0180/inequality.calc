import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { valueActions } from "../store/store";
import styles from "./styles.module.css";

const Entity = (props) => {
  const data = useSelector((state) => state.values);
  const dispatch = useDispatch();

  const changeHandler = (event) => {
    const idx = data.drops.findIndex((item) => item.id === props.id);
    dispatch(
      valueActions.setInteger({ index: idx, value: event.target.value })
    );
  };

  return props.type === "input" && props.action === "drop" ? (
    <input type={"number"} className={styles.intinp} onChange={changeHandler} />
  ) : (
    props.letter
  );
};

const LetterCard = (props) => {
  const dispatch = useDispatch();

  return (
    <Draggable draggableId={props.id.toString()} index={props.index}>
      {(provided) => (
        <div
          className={
            "shadow " +
            styles.card +
            " " +
            styles[props.type] +
            " " +
            styles[props.margin]
          }
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {props.action === "drop" && (
            <IconButton
              className={styles.closebtn}
              onClick={() => {
                dispatch(valueActions.removeDrop(props.id));
              }}
            >
              <Close sx={{ color: "black", fontSize: "0.7em" }} />
            </IconButton>
          )}
          <Entity
            id={props.id}
            type={props.type}
            action={props.action}
            letter={props.letter}
          />
        </div>
      )}
    </Draggable>
  );
};

export default LetterCard;
