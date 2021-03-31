import {types} from "mobx-state-tree";
import {v4 as uuidv4} from 'uuid'

const Todo = types.model('Todo',{
    id: types.optional(types.string, () => `todo-${uuidv4()}`),
    title: types.optional(types.string, 'Untitled'),
    content: types.optional(types.string, 'Todo content'),
    checked: types.optional(types.boolean, false)
})

export default Todo