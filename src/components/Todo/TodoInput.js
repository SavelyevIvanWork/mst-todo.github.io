import styled from "styled-components";
import {useRef, useState} from "react";
import useOutsideClick from "@rooks/use-outside-click";
import {observer} from "mobx-react-lite";
import {StoreContext} from "../../index";
import {useContext} from "react";
import {v4 as uuidv4} from 'uuid'
import {Button} from "../../GlobalStyle";
import {values} from "mobx";

const TODO_TITLE_INVALID ='TODO_TITLE_INVALID'
const TODO_CONTENT_INVALID ='TODO_CONTENT_INVALID'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 5px;
  background-color: white;
  z-index: 10;
`

const TextareaWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
  border-top: 1px solid lightgrey;
  border-radius: 5px;
`

const Title = styled.textarea`
  box-sizing: border-box;
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 0;
  padding: 10px 5px;
  resize: none;
  border: 1px solid lightgrey;
  border-color: ${props => (props.invalid ? 'red' : 'lightgrey')};
  border-radius: 5px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  outline: none;
  
  &::before {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    width: 300px;
    height: 2px;
    background-color: darkcyan;
  }
`

const Textarea = styled(Title)`
  height: 100px;
  margin-top: 0;
  border-top: none;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
`

const AddButton = styled(Button)``


const TodoInput = observer(({column}) => {

    const store = useContext(StoreContext)
    const containerRef = useRef(null)
    const inputTitleRef = useRef(null)
    const inputContentRef = useRef(null)

    const [title, setTitle] = useState()
    const [content, setContent] = useState()

    const [invalidTitle, setInvalidTitle] = useState()

    const validation = (value) => {
        const reg = /^\s*$/;
        return !reg.test(value) && typeof value !== 'undefined'
    }

    function outsideInputTitle() {
        if (!validation(title)) {
            store.addError(TODO_TITLE_INVALID,'Заполните поле Title!')
            setInvalidTitle(true)
            console.log('Заполните поле Title!')
        }
    }
    useOutsideClick(inputTitleRef, outsideInputTitle);

    function outsideContentTitle() {
        if (!validation(content)) {
            store.addError(TODO_CONTENT_INVALID,'Заполните поле Content!')
            console.log('Заполните поле Content!')
        }
    }
    useOutsideClick(inputContentRef, outsideContentTitle);

    function outsideContainer() {
        column.closedInput()
    }
    useOutsideClick(containerRef, outsideContainer);

    const updateNewTodoTitleHandler = (e) => {
        setTitle(e.target.value)
        if (validation(title)) {
            store.deleteError(TODO_TITLE_INVALID)
            setInvalidTitle(false)
        }
    }

    const updateNewTaskContentHandler = (e) => {
        setContent(e.target.value)
        if (validation(content)) {
            store.deleteError(TODO_CONTENT_INVALID)
        }
    }

    const addTaskHandler = (e) => {
        e.stopPropagation()
        const id = `todo-${uuidv4()}`
        if (validation(title) && validation(content)) {
            store.addTodo(id, title, content)
            column.addTodoIds(id)
            column.closedInput()
        }
        if (!validation(title)) {
            store.addError(TODO_TITLE_INVALID,'Заполните поле Title!')
            console.log('Заполните поле Title!')
        }
        if (!validation(content)) {
            store.addError(TODO_CONTENT_INVALID,'Заполните поле Content!')
            console.log('Заполните поле Content!')
        }
    }

    return (
        <Container ref={containerRef}>
            <TextareaWrapper>
                <Title
                    ref={inputTitleRef}
                    value={title}
                    onChange={(e) => updateNewTodoTitleHandler(e)}
                    autoFocus={true}
                    rows='1'
                    invalid={invalidTitle}
                >
                    {}
                </Title>
                <Textarea
                    ref={inputContentRef}
                    placeholder='Add a new task!'
                    value={content}
                    onChange={(e) => updateNewTaskContentHandler(e)}
                >
                    {}
                </Textarea>
            </TextareaWrapper>

            <AddButton onClick={(e) => addTaskHandler(e)}
            >Save</AddButton>
        </Container>
    )
})

export default TodoInput