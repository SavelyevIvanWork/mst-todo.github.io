import {v4 as uuidv4} from 'uuid'
import Column from "./Column";
import Todo from "./Todo";

const {types} = require("mobx-state-tree");

const RootStore = types.model({
    todos: types.map(Todo),
    columns: types.map(Column),
    columnOrder: types.array(types.string)
})
    .actions(self => {
        function addColumn() {
            const key = `column-${uuidv4()}`
            self.columns.set(key, {id: key})
            self.columnOrder.push(key)
        }

        function getColumnIds(columnId) {
            self.columnOrder.push(columnId)
        }

        function columnOrderUpdate(result) {
            self.columnOrder.splice(result.source.index, 1)
            self.columnOrder.splice(result.destination.index, 0, result.draggableId)
        }

        return {getColumnIds, addColumn, columnOrderUpdate}
    })

export default RootStore
