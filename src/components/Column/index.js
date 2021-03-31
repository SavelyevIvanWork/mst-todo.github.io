import {observer} from "mobx-react-lite"
import styled from 'styled-components'
import Todo from "../Todo";
import {values} from "mobx";
import TitleInput from "./TitleInput";

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


    return (
        <Container>
            {
                column.checkedTitle
                    ? <TitleInput column={column} ></TitleInput>
                    : <Title onClick={() => column.clickTitle()}
                    >{column.title}</Title>
            }

            {
                values(column.todos).map(todo => {
                    return <Todo key={todo.id} todo={todo}/>
                })
            }
        </Container>
    )
})

export default Column
