import { Board } from '../types/board';
import { addIdToNewColumns } from './board';

describe('addIdToNewColumns', () => {
    it('should add ids to columns with null _id', () => {
        const board: Board = {
            name: 'Board 1',
            columns: [
                {
                    name: 'Column 1',
                    order: 1,
                    tasks: [],
                    _id: null
                },
                {
                    name: 'Column 2',
                    order: 2,
                    tasks: [],
                    _id: '12345'
                },
                {
                    name: 'Column 3',
                    order: 3,
                    tasks: [],
                    _id: null
                }
            ]
        };

        const result = addIdToNewColumns(board);

        expect(result).not.toBe(board);
        expect(result.columns.length).toBe(board.columns.length);

        result.columns.forEach((column, index) => {
            if (board.columns[index]._id === null) {
                expect(column._id).toBeDefined();
            } else {
                expect(column._id).toBe(board.columns[index]._id);
            }
        });
    });
});