import _ from 'lodash';
import { getDashboard } from './dashboard.controller';
import { formatNewTask, addNewTaskToBoard, removeTaskFromBoard, updateTaskFromBoard } from '../utils/task';
import { Board } from '../models/board';
import { Task } from './../types/task'
import { logger } from '../index'
import { CTX } from '../types/context';
import { MercuriusContext } from 'mercurius';
import { authentication } from '../utils/authentication';

export const createTask = async (_: MercuriusContext, { task }: { task: Task }, ctx: CTX) => {
    try {
        authentication(ctx)

        let newTask = formatNewTask(task)

        const board = await getDashboard(_, { _id: task.boardId as string }, ctx)

        const newBoard = addNewTaskToBoard(board, newTask, task.columnId as string)

        await Board.findOneAndUpdate(
            { _id: task.boardId },
            newBoard)

        return newTask
    } catch (error) {
        logger.error(error)
        throw error;
    }
}

export const deleteTask = async (_: MercuriusContext, { taskToDelete }: {
    taskToDelete: {
        boardId: string;
        columnId: string;
        taskId: string
    }
}, ctx: CTX) => {
    try {
        authentication(ctx)

        const { boardId, columnId, taskId } = taskToDelete

        const board = await getDashboard(_, { _id: boardId as string }, ctx)

        const boardToUpdate = removeTaskFromBoard(board._doc, columnId, taskId)

        await Board.findOneAndUpdate(
            { _id: boardId },
            boardToUpdate)

        return taskId
    } catch (error) {
        logger.error(error)
        throw error;
    }
}

export const updateTask = async (x: MercuriusContext, { task }: { task: Task }, ctx: CTX) => {
    try {
        authentication(ctx)

        const { boardId, columnId, _id } = task

        const board = await getDashboard(x, { _id: boardId as string }, ctx)

        const taskToUpdate = _.omit(task, ['previousColumnId', 'boardId', 'columnId'])

        let boardToUpdate = updateTaskFromBoard(
            board._doc,
            columnId as string,
            _id as string,
            taskToUpdate
        )

        if (!!task?.previousColumnId) {
            boardToUpdate = removeTaskFromBoard(boardToUpdate, task.previousColumnId, _id as string)
        }

        await Board.findOneAndUpdate(
            { _id: boardId },
            boardToUpdate)

        return taskToUpdate
    } catch (error) {
        logger.error(error)
        throw error;
    }
}