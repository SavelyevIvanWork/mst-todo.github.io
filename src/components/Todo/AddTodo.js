import {observer} from "mobx-react-lite";
import styled from "styled-components";
import TodoInput from "./TodoInput";
import {Button} from "../../GlobalStyle";

const ButtonWrapper = styled.div`
  border-top: 1px solid lightgrey;
`
const AddButton = styled(Button)``

const AddTodo = observer(({column}) => {
    const buttonClickHandler = () => {
        column.getInput()
    }
    return (
        column.input
            ? <TodoInput column={column} />
            : <ButtonWrapper>
                <AddButton onClick={() => buttonClickHandler()}>
                    Add task
                </AddButton>
            </ButtonWrapper>
    )
})

export default AddTodo