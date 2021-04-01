import './App.css'
import {observer} from "mobx-react-lite";
import {values} from "mobx";
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
    const {columns, columnOrder} = useContext(StoreContext)
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
                        {
                            values(columns).map(column => {
                                columnOrder.map(columnId => {
                                    columnId.getColumnIds(column.id)
                                })
                                return <Column key={column.id} column={column}/>
                            })
                        }
                        {provided.placeholder}
                    </Container>
                )}

            </Droppable>
        </DragDropContext>
    )
})

export default App

