import makeInspectable from 'mobx-devtools-mst';
import RootStore from "./models/RootStore";

const store = RootStore.create({
    todos: {
        'todo-1': {},
        'todo-2': {},
        'todo-3': {}
    },
    columns: {
        'column-1': {},
    },
    columnOrder: [{}]
});

export default makeInspectable(store)