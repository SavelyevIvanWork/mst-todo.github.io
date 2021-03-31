import './App.css'
import {observer} from "mobx-react-lite";
import {values} from "mobx";
import Column from "./components/Column";
import {useContext} from "react";
import {StoreContext} from "./index";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  background-color: ${props => (props.isDraggingOver ? 'red' : 'white')};
`

const App = observer(() => {
    const store = useContext(StoreContext)
    // console.log(store.columns.get('column-1'))
    return (
        <Container>
        {
            values(store.columns).map(column => {
                return <Column key={column.id} column={column}/>
            })
        }
       </Container>
    )
})

export default App
