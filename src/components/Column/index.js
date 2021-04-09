import {observer} from "mobx-react-lite"
import styled from 'styled-components'
import {Draggable, Droppable} from "react-beautiful-dnd";
import {useContext, useEffect, useLayoutEffect, useRef} from "react";
import Title from "./Title";
import AddTodo from "../Todo/AddTodo";
import TodoList from "../Todo/TodoList";
import {StoreContext} from "../../index";
import ShadowColumn from "../ShadowColumn";

const Wrapper = styled.section`
  margin: 0 10px;
  background-color: inherit;
`

const Container = styled.div`
  position: ${props => (props.isDragging ? 'absolute' : 'static')} !important;
  display: flex;
  flex-direction: column;
  width: 280px;
  max-height: 80vh;
  border: 1px solid lightgrey;
  border-radius: 5px;
  background-color: ${props => (props.isDragging ? 'gray' : 'white')};
`

const Column = observer(({column, todos, index}) => {
    const store = useContext(StoreContext)
    const containerRef = useRef(null)

    useLayoutEffect(() => {
        if (!store.isDragging) {
            const positionLeft = containerRef.current.offsetLeft
            const height = containerRef.current.clientHeight
            const width = containerRef.current.clientWidth
            column.getSizesColumn(width, height, positionLeft)
        }

    })

    return (
        <>
            <Draggable draggableId={column.id} index={index}>
                {(provided, snapshot) => (
                    <Wrapper ref={containerRef}>
                        <Container
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            isDragging={snapshot.isDragging}>
                            <Title column={column} provided={provided}/>
                            <Droppable droppableId={column.id} direction='vertical' type='card'>
                                {(provided, snapshot) => {
                                    return (<>
                                        <TodoList provided={provided} snapshot={snapshot} todos={todos}/>
                                    </>)
                                }}
                            </Droppable>
                            <AddTodo column={column}/>
                        </Container>
                    </Wrapper>
                )}
            </Draggable>
        </>
    )
})

export default Column
