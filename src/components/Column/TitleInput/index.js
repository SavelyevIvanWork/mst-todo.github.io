import styled from 'styled-components'
import {useRef} from "react";
import useOutsideClick from "@rooks/use-outside-click";
import {observer} from "mobx-react-lite";
import {useState} from "react";

const Input = styled.input`
  margin: 0;
  padding: 10px;
  border: none;
  border-bottom: 1px solid lightgrey;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  outline: none;
  font-size: 20px;
  line-height: 16px;
  font-weight: bold;
`

const TitleInput = observer(({column}) => {

    const inputRef = useRef()
    const [title, setTitle] = useState(column.title)

    function outsidePClick() {
        column.closedTitleInput()
    }
    useOutsideClick(inputRef, outsidePClick);

    const inputChangeHandler = (e) => {
        setTitle(e.target.value)
    }

    const updateColumnTitleHandler = (e) => {
        if (e.key === 'Enter') {
            column.updateTitle(title)
        }
    }

    return (
        <Input
            ref={inputRef}
            value={title}
            autoFocus={true}
            onChange={(e) => inputChangeHandler(e)}
            onKeyDown={(e) => updateColumnTitleHandler(e)}
        />
    )
})

export default TitleInput