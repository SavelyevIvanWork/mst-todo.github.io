import makeInspectable from 'mobx-devtools-mst';
import RootStore from "./models/RootStore";

const store = RootStore.create({
    todos: {
        'todo-1': {},
        'todo-2': {},
        'todo-3': {}
    },
    columns: {
        'column-1': {id: 'column-1', todoIds: ['todo-1', 'todo-2', 'todo-3']},
        'column-2': {id: 'column-2'},
        'column-3': {id: 'column-3'},
    },
    columnOrder: ['column-1', 'column-2', 'column-3']
});

export default makeInspectable(store)