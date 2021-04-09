import {observer} from "mobx-react-lite";
import Column from "./index";
import {useContext} from "react";
import {StoreContext} from "../../index";
import ShadowColumn from "../ShadowColumn";

const Columns = observer( (provided) => {
    const store = useContext(StoreContext)
    const {columns, todos, columnOrder} = store

    return (<>
        {/*<ShadowColumn />*/}
        {columnOrder.map((columnId, index) => {
            const column = columns.get(columnId)
            const columnTodos = column.todoIds.map(todoId => todos.get(todoId))
            return <Column key={column.id} column={column} todos={columnTodos} index={index} provided={provided}/>
        })}
    </>)
})

export default Columns