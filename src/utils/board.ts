import _ from "lodash"
import { v4 as uuidv4 } from 'uuid';
import { Board } from '../types/board';

export const addIdToNewColumns = (board: Board) => {
    let boardCloned = _.cloneDeep(board)

    boardCloned.columns = boardCloned.columns.map((column) => {
        if (column._id === null) {
            return {
                ...column,
                _id: uuidv4()
            }
        }
        return column
    })
    return boardCloned
}