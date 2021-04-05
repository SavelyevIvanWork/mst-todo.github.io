import './App.css'
import {observer, Observer} from "mobx-react-lite";
import {useContext} from "react";
import {StoreContext} from "./index";
import styled from "styled-components";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import Columns from "./components/Column/Columns";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 20px;
`

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  background-color: ${props => (props.isDraggingOver ? 'red' : 'white')};
`

const App = observer(() => {
    const store = useContext(StoreContext)
    // console.log(store.columns.get('column-1'))

    const onDragStart = start => {
        const column = store.columns.get(start.draggableId)
        column.addShadow()
    }

    const onDragUpdate = update => {
        const column = store.columns.get(update.draggableId)
        const columnId = store.columnOrder[update.destination.index]
        const columnPosition = store.columns.get(columnId).positionLeft
        column.updatePosition(columnPosition)
        console.log(column)
    }

    const onDragEnd = result => {
        const column = store.columns.get(result.draggableId)
        column.addShadow()
        const {destination, source} = result
        // destination - назначение
        // source - источник
        // draggable - перетаскиваемый
        if (!destination) {
            return
        }

        if (destination.droppableId === source.droppableId
            &&
            destination.index === source.index) {
            return
        }
        if (result.type === 'column') {
            store.columnOrderUpdate(result)
        }

        if (result.type === 'card') {
            return store.updateCard(result)
        }
    }

    return (
        <DragDropContext onDragStart={onDragStart} onDragUpdate={onDragUpdate} onDragEnd={onDragEnd}>
            <Wrapper>
                <Droppable droppableId={'all-columns'} direction='horizontal' type={'column'}>
                    {(provided, snapshot) => (
                        <Container
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            <Columns {...provided}/>
                            {console.log(provided)}
                            {provided.placeholder}
                        </Container>
                    )}
                </Droppable>
                <button onClick={(e) => {
                    // e.preventDefault()
                    store.addColumn()
                }}
                >Add column
                </button>
            </Wrapper>
        </DragDropContext>
    )
})

export default App