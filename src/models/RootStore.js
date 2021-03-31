import Column from "./Column";
const {types} = require("mobx-state-tree");

const RootStore = types.model({
        columns: types.map(Column)
    })

export default RootStore
