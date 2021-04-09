import {types} from "mobx-state-tree";

const Todo = types.model('Todo',{
    id: types.identifier,
    title: types.optional(types.string, 'Untitled'),
    content: types.optional(types.string, 'Todo content'),
    checked: types.optional(types.boolean, false)
})

export default Todo