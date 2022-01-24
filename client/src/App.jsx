import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import Drag from './components/Drag';
import Drop from './components/Drop';
import Results from './components/Results';
import { getValues } from './store/actions';
import Values from './components/Values';
import { useDispatch } from 'react-redux';
import { valueActions } from './store/store';

const App = () => {
  const dispatch = useDispatch()
  const [load, setLoad] = useState(false)
  useEffect(() => {
    setLoad(true)
    getValues().then((response) => {
      dispatch(valueActions.setValues(response.payload))
      setLoad(false)
    })
  }, [])

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return
    if (destination.droppableId === 'drop-here' && source.droppableId !== 'drop-here') {
      dispatch(valueActions.setDrops({s: source.index, d: destination.index, id: draggableId}))
    }
    if(destination.droppableId === 'drop-here' && source.droppableId === 'drop-here') {
      dispatch(valueActions.shuffleDrops({s: source.index, d: destination.index, id: draggableId}))
    }
  }

  return load ? <div className='container d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
    <CircularProgress />
  </div> : (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-9">
            <Drag />
            <Drop />
            <Results />
          </div>
          <div className="col-md-3">
            <Values />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
