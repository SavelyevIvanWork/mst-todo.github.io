import {types} from "mobx-state-tree";
import {v4 as uuidv4} from 'uuid'

const Error = types.model('Todo',{
    id: types.optional(types.identifier, () => uuidv4()),
    type: types.string,
    content: types.string,
    show: types.optional(types.boolean, true),
})

export default Error