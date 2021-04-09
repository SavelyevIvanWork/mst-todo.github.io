import {observer} from "mobx-react-lite";
import styled from "styled-components";
import {useContext} from "react";
import {StoreContext} from "../index";

const Shadow = styled.div`
  position: absolute;
  left: ${props => `${props.positionLeft}px`};
  height: ${props => `${props.columnHeight}px`};
  width: ${props => `${props.columnWidth}px`};
  //margin-left: 10px;
  //margin-right: 10px;
  border-radius: 5px;
  background-color: darkcyan;
`

const ShadowColumn = observer( (provided) => {
    const store = useContext(StoreContext)
    const shadowColumn = store.shadowColumn.get('shadow-column')

    return (
        typeof shadowColumn !== 'undefined' && shadowColumn.show && <Shadow columnHeight={shadowColumn.height}
                                                                             columnWidth={shadowColumn.width}
                                                                             positionLeft={shadowColumn.positionLeft}></Shadow>
    )
})

export default ShadowColumn