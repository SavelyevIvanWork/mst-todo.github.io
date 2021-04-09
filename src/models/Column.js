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
    input: types.optional(types.boolean, false)
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

        function updatePosition(columnPosition) {
            self.positionLeft = columnPosition
        }

        function getInput() {
            self.input = true
        }

        function updatePositionCard(result) {
            self.todoIds.splice(result.source.index, 1)
            self.todoIds.splice(result.destination.index, 0, result.draggableId)
        }

        function deleteCard(result) {
            self.todoIds.splice(result.source.index, 1)
        }

        function addCard(result) {
            self.todoIds.splice(result.destination.index, 0, result.draggableId)
        }

        function closedInput() {
            self.input = false
        }

        function addTodoIds(id) {
            self.todoIds.push(id)
        }

        return {
            clickTitle,
            updateNewTitle,
            updateTitle,
            closedTitleInput,
            getSizesColumn,
            updatePosition,
            getInput,
            updatePositionCard,
            deleteCard,
            addCard,
            closedInput,
            addTodoIds
        }
    })

// const start = this.columns[result.source.droppableId];
// const finish = this.columns[result.destination.droppableId];
//
// // Moving from one list to another
// const startTaskIds = Array.from(start.taskIds);
// startTaskIds.splice(result.source.index, 1);
// const newStart = {
//     ...start,
//     taskIds: startTaskIds,
// }
//
// const finishTaskIds = Array.from(finish.taskIds);
// finishTaskIds.splice(result.destination.index, 0, result.draggableId);
// const newFinish = {
//     ...finish,
//     taskIds: finishTaskIds,
// }
//
// return {
//     columns: {
//         ...this.columns,
//         [newStart.id]: newStart,
//         [newFinish.id]: newFinish,
//     },
// }

export default Column