import RootStore from "./models/RootStore";

const store = RootStore.create({
    columns: {
        'column-1': {
            todos: {
                'todo-1': {
                },
                'todo-2': {
                },
                'todo-3': {
                }
            }
        },
        'column-2': {
            todos: {
                'todo-1': {
                }
            }
        },
        'column-3': {
            todos: {
                'todo-1': {
                }
            }
        }
    }
});

export default store