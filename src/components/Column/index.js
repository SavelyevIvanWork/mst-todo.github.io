import {observer} from "mobx-react-lite"
import styled from 'styled-components'
import Todo from "../Todo";
import {values} from "mobx";
import TitleInput from "./TitleInput";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {useContext, useLayoutEffect, useRef} from "react";
import {StoreContext} from "../../index";
import Title from "./Title";

const Wrapper = styled.section`
  margin: 0 10px;
  background-color: inherit;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  max-height: 80vh;
  border: 1px solid lightgrey;
  border-radius: 5px;
  background-color: ${props => (props.isDragging ? 'gray' : 'white')};
`

const Shadow = styled.div`
  position: absolute;
  left: ${props => `${props.positionLeft}px`};
  height: ${props => `${props.columnHeight}px`};
  width: ${props => `${props.columnWidth}px`};
  border-radius: 5px;
  background-color: blue;
`

const Column = observer(({column, todos, index, provided}) => {
    const containerRef = useRef(null)

    useLayoutEffect(() => {
        const positionLeft = containerRef.current.offsetLeft
        console.log(positionLeft)
        const height = containerRef.current.clientHeight
        const width = containerRef.current.clientWidth
        column.getSizesColumn(width, height, positionLeft)
    }, [column])
    return (

        <>
            {column.shadow && <Shadow columnHeight={column.height} columnWidth={column.width} positionLeft={column.positionLeft} ></Shadow>}
            <Draggable draggableId={column.id} index={index}>

                {(provided, snapshot) => (
                    <Wrapper ref={containerRef}>
                    <Container
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}>
                        <Title column={column} provided={provided}/>
                        {
                            todos.map(todo => {
                                return <Todo key={todo.id} todo={todo}/>
                            })
                        }
                    </Container>
                    </Wrapper>
                )}
            </Draggable>

        </>
    )
})

export default Column
