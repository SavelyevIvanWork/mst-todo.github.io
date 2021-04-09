const {types} = require("mobx-state-tree");

const ShadowColumn = types.model({
    id: types.optional(types.identifier, 'shadow-column'),
    show: true,
    positionLeft: types.optional(types.number, 0),
    width: types.optional(types.number, 0),
    height: types.optional(types.number, 0),
})
    .actions(self => {
        function getShow(boolean) {
            self.show = boolean
        }

        function updatePositionShow(positionLeft) {
            self.positionLeft = positionLeft
        }

        return {getShow, updatePositionShow}
    })

export default ShadowColumn
