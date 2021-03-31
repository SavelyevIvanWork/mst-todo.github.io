import {observer} from "mobx-react-lite";
import styled from 'styled-components'

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

const Todo = observer(({todo}) => {
    return (
        <Container>
            <Title>{todo.title}</Title>
            <Content>{todo.content}</Content>
        </Container>
    )
})

export default Todo