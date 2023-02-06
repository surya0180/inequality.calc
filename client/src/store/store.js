import { configureStore, createSlice, current } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialValueState = {
  values: [],
  drops: [],
  drags: [],
};

const valueSlice = createSlice({
  name: "values",
  initialState: initialValueState,
  reducers: {
    setValues(state, action) {
      return {
        values: action.payload,
        drops: state.drops,
        drags: action.payload,
      };
    },

    setDrops(state, action) {
      const src = parseInt(action.payload.s);
      const des = parseInt(action.payload.d);

      const id = action.payload.id;
      const obj = state.drags.filter((item) => item.id === parseInt(id));
      state.drags = state.drags.filter((item) => item.id !== parseInt(id));

      if (obj[0].type !== "letter") {
        state.drags.push(obj[0]);
        state.drags.sort((a, b) => a.id - b.id);
        state.drops.splice(150, 1);
        state.drops.splice(des, 0, { ...obj[0], id: uuidv4() });
      } else {
        state.drops.splice(150, 1);
        state.drops.splice(des, 0, { ...obj[0] });
      }
    },
    setInteger(state, action) {
      state.drops[action.payload.index].value = action.payload.value;
    },
    removeDrop(state, action) {
      const obj = state.drops.filter((item) =>
        item.type === "letter"
          ? item.id === parseInt(action.payload)
          : item.id === action.payload
      );
      state.drops = state.drops.filter((item) =>
        item.type === "letter"
          ? item.id !== parseInt(action.payload)
          : item.id !== action.payload
      );
      if (obj[0].type === "letter") {
        state.drags.push(obj[0]);
        state.drags.sort((a, b) => a.id - b.id);
      }
    },
    shuffleDrops(state, action) {
      const src = parseInt(action.payload.s);
      const des = parseInt(action.payload.d);
      const id = action.payload.id;
      const obj = state.drops.filter((item) =>
        id.length > 3 ? item.id === id : item.id === parseInt(id)
      );
      state.drops.splice(src, 1);
      state.drops.splice(des, 0, obj[0]);
    },
  },
});

const store = configureStore({
  reducer: {
    values: valueSlice.reducer,
  },
});

export const valueActions = valueSlice.actions;
export default store;
