import {types} from 'mobx-state-tree'
import {v4 as uuidv4} from 'uuid'
import Todo from "./Todo";


const Column = types.model('Column', {
    id: types.optional(types.identifier, () => `column-${uuidv4()}`),
    title: types.optional(types.string, 'Untitled'),
    newTitle: types.optional(types.string, ''),
    checkedTitle: types.optional(types.boolean, false),
    todoIds: types.array(types.string)
})
    .actions(self => {
        function clickTitle() {
            self.checkedTitle = true
            self.newTitle = self.title
        }
        function updateNewTitle(newTitle) {
            self.newTitle = newTitle
        }
        function updateTitle(title) {
            self.title = title
            self.checkedTitle = false
        }
        function closedTitleInput() {
            self.checkedTitle = false
        }

        return {clickTitle, updateNewTitle, updateTitle, closedTitleInput}
    })

export default Column