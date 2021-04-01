import Column from "./Column";
import Todo from "./Todo";
import ColumnIds from "./ColumnIds";

const {types} = require("mobx-state-tree");

const RootStore = types.model({
    todos: types.map(Todo),
    columns: types.map(Column),
    columnOrder: types.array(ColumnIds)
})

export default RootStore
