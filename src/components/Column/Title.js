import {observer} from "mobx-react-lite";
import TitleInput from "./TitleInput";
import styled from "styled-components";

const BaseTitle = styled.h3`
  font-size: 20px;
  margin: 0;
  padding: 10px;
  border-bottom: 1px solid lightgrey;
`

const Title = observer(({column, provided}) => {
    return (
        column.checkedTitle
            ? <TitleInput column={column}></TitleInput>
            : <BaseTitle {...provided.dragHandleProps} onClick={() => column.clickTitle()}
            >{column.title}</BaseTitle>
    )
})

export default Title