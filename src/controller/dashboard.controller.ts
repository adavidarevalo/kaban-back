import { logger } from '../index'
import { Board as BoardInterface } from '../types/board'
import { Board } from '../models/board';
import { v4 as uuidv4 } from 'uuid';
import { addIdToNewColumns } from '../utils/board';
import { MercuriusContext } from 'mercurius';
import { authentication } from '../utils/authentication';
import { CTX } from '../types/context';

export const getBoards = async (_: MercuriusContext, y: {}, ctx: CTX) => {
    try {
        authentication(ctx)

        const boards = await Board.find({})

        return boards
    } catch (error) {
        logger.error(error)
        throw error;
    }
}

export const getDashboard = async (_: MercuriusContext, { _id }: { _id: String }, ctx: CTX) => {
    try {
        authentication(ctx)

        const board = await Board.find({ _id })

        return board[0]
    } catch (error) {
        logger.error(error)
        throw error;
    }
}

export const createDashboard = async (
    _: MercuriusContext, { dashboard }: { dashboard: BoardInterface }, ctx: CTX
) => {
    try {
        authentication(ctx)

        dashboard.columns = dashboard.columns.map((column) => ({
            ...column,
            _id: uuidv4()
        }))
        const board = await Board.create(dashboard)

        return board
    } catch (error) {
        logger.error(error)
        throw error;
    }
}

export const deleteDashboard = async (_: MercuriusContext, { _id }: { _id: String }, ctx: CTX) => {
    try {
        authentication(ctx)

        const board = await Board.findByIdAndDelete({ _id })

        return board
    } catch (error) {
        logger.error(error)
        throw error;
    }
}

export const editBoard = async (
    _: MercuriusContext,
    {
        _id,
        board,
    }: {
        _id: string
        board: BoardInterface
    }, ctx: CTX
) => {
    try {
        authentication(ctx)

        let boardToUpdate = addIdToNewColumns(board)

        const actualDashboard = await Board.updateOne({ _id }, boardToUpdate, {
            new: true,
        })

        return actualDashboard[0]
    } catch (error) {
        logger.error(error)
        throw error;
    }
}
