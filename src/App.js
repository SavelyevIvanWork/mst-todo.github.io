import './App.css'
import {observer, Observer} from "mobx-react-lite";
import {autorun, values} from "mobx";
import Column from "./components/Column";
import {useContext} from "react";
import {StoreContext} from "./index";
import styled from "styled-components";
import {DragDropContext, Droppable} from "react-beautiful-dnd";

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  background-color: ${props => (props.isDraggingOver ? 'red' : 'white')};
`

const App = observer(() => {
    const store = useContext(StoreContext)
    const {columns, todos, columnOrder} = store
    // console.log(store.columns.get('column-1'))
    return (


        <DragDropContext>

                <Droppable droppableId={'all-columns'} direction='horizontal' type={'column'}>

                    {(provided, snapshot) => (

                            <Container
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                {columnOrder.map((columnId, index) => {
                                    const column = columns.get(columnId)
                                    const columnTodos = column.todoIds.map(todoId => todos.get(todoId))
                                    return <Column key={column.id} column={column} todos={columnTodos} index={index}
                                    />
                                })}
                                {provided.placeholder}
                                <button onClick={(e) => {
                                    // e.preventDefault()
                                    store.addColumn()
                                }}
                                >Add column</button>
                            </Container>


                    )}

                </Droppable>
            </DragDropContext>
    )
})

export default App

