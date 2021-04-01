import {types} from 'mobx-state-tree'
import {v4 as uuidv4} from 'uuid'
import Todo from "./Todo";


const ColumnIds = types.model('Column', {
    id: types.optional(types.string, ''),
})
    .actions(self => {
        function getColumnIds(columnId) {
            self.id = columnId
        }

        return {getColumnIds}
    })

export default ColumnIds