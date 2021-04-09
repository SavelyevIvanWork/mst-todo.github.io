import {v4 as uuidv4} from 'uuid'
import Column from "./Column";
import Todo from "./Todo";
import Error from "./Error";
import ShadowColumn from "./ShadowColumn";
import {values} from "mobx";

const {types} = require("mobx-state-tree");

const RootStore = types.model({
    todos: types.map(Todo),
    columns: types.map(Column),
    columnOrder: types.array(types.string),
    shadowColumn: types.map(ShadowColumn),
    isDragging: false,
    errors: types.map(Error)
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

        function addTodo(id, title, content) {
            self.todos.put(Todo.create({ id, title, content }));
        }

        function setColumnDraggable(columnDraggable) {
            self.columnDraggable.put(columnDraggable)
        }

        function addShadow(positionLeft, width, height) {
            self.shadowColumn.put(ShadowColumn.create({positionLeft, width, height}))
        }

        function setDragging(boolean) {
            self.isDragging = boolean
        }

        function addError(type, content) {
            self.errors.put(Error.create({type, content}))
        }

        function deleteError(type) {
            values(self.errors).map(item => {
                if (item.type === type) {
                   return self.errors.delete(item.id)
                }
            })
        }

        return {getColumnIds, addColumn, columnOrderUpdate, addTodo, setColumnDraggable, addShadow, setDragging, addError, deleteError}
    })

export default RootStore
