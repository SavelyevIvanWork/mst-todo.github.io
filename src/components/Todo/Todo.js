import {observer} from "mobx-react-lite";
import styled from 'styled-components'
import {Draggable} from "react-beautiful-dnd";

const Container = styled.div`
  margin: 5px;
  border: 1px solid lightgray;
  border-color: ${props => (props.isDragging ? 'gray' : 'lightgray')};
  border-radius: 5px;
  background-color: ${props => (props.isDragging ? 'lightgray' : 'white')};
`

const Title = styled.h3`
  position: relative;
  margin: 5px;

  &::before {
    content: '';
    position: absolute;
    top: 25px;
    width: 100%;
    height: 2px;
    background-color: darkcyan;
  }
`;

const Content = styled.p`
  display: block;
  margin: 5px;
  padding: 5px
`;

const Todo = observer(({todo, index}) => {
    return (
        <Draggable draggableId={todo.id} index={index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    <Title>{todo.title}</Title>
                    <Content>{todo.content}</Content>

                    {provided.placeholder}
                </Container>
            )}
        </Draggable>
    )
})

export default Todo