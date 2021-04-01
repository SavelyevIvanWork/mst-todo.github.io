import {observer} from "mobx-react-lite"
import styled from 'styled-components'
import Todo from "../Todo";
import {values} from "mobx";
import TitleInput from "./TitleInput";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {useContext} from "react";
import {StoreContext} from "../../index";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  max-height: 80vh;
  margin: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  background-color: ${props => (props.isDragging ? 'gray' : 'white')};
`
const Title = styled.h3`
  font-size: 20px;
  margin: 0;
  padding: 10px;
  border-bottom: 1px solid lightgrey;
`

const Column = observer( ({column}) => {
const {todos} = useContext(StoreContext)
    console.log(values(todos).map(todo => todo))

    return (
        <Draggable draggableId={column.id} >
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}>
                    {
                        column.checkedTitle
                            ? <TitleInput column={column} ></TitleInput>
                            : <Title onClick={() => column.clickTitle()}
                            >{column.title}</Title>
                    }

                    {
                        values(todos).map(todo => {
                            return <Todo key={todo.id} todo={todo}/>
                        })
                    }
                </Container>
            )}
        </Draggable>

    )
})

export default Column
