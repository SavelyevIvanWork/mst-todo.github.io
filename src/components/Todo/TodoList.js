import {observer} from "mobx-react-lite";
import styled from "styled-components";
import Todo from "./Todo";

const Todos = styled.div`
  min-height: 30px;
  max-height: 70vh;
  overflow-y: scroll;
  scrollbar-width: 3px;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'inherit')};

  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }

  &::-webkit-scrollbar-track {
    background-color: inherit;
  }

  &::-webkit-scrollbar-track-piece {
    background-color: inherit;
  }

  &::-webkit-scrollbar-thumb {
    height: 50px;
    background-color: #666;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-corner {
    background-color: #999;
  }

  &::-webkit-resizer {
    background-color: #666;
  }
`
const TodoList = observer( ({provided, snapshot, todos}) => {

    return (
        <Todos
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
        >
            {
                todos.map((todo, index) => {
                    return <Todo key={todo.id} todo={todo} index={index} />
                })
            }
            {provided.placeholder}
        </Todos>
    )
})

export default TodoList