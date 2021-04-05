import {types} from 'mobx-state-tree'
import {v4 as uuidv4} from 'uuid'

const Column = types.model('Column', {
    id: types.optional(types.identifier, () => `column-${uuidv4()}`),
    title: types.optional(types.string, 'Untitled'),
    newTitle: types.optional(types.string, ''),
    checkedTitle: types.optional(types.boolean, false),
    todoIds: types.array(types.string),
    height: types.optional(types.number, 0),
    width: types.optional(types.number, 0),
    positionLeft: types.optional(types.number, 0),
    shadow: false
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
        function getSizesColumn(width, height, positionLeft) {
            self.width = width
            self.height = height
            self.positionLeft = positionLeft
        }

        function addShadow() {
            self.shadow = !self.shadow
        }

        function updatePosition(columnPosition) {
            self.positionLeft = columnPosition
        }

        return {clickTitle, updateNewTitle, updateTitle, closedTitleInput, getSizesColumn, addShadow, updatePosition}
    })

export default Column