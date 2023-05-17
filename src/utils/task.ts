import _ from "lodash"
import { Task, SubTask } from "../types/task";
import { v4 as uuidv4 } from 'uuid';
import { Board } from '../types/board';

export const formatNewTask = (task: Task): Task => {
    let taskToUpdate = _.cloneDeep(task)
    taskToUpdate = _.omit(taskToUpdate, ["boardId", "columnId"])
    taskToUpdate._id = uuidv4()

    taskToUpdate.subTask = task.subTask.map((subTask: SubTask) => ({
        ...subTask,
        _id: uuidv4()
    }))

    return taskToUpdate
}

export const addNewTaskToBoard = (board: Board, task: Task, columnId: string) => {
    let boardCloned = _.cloneDeep(board)

    boardCloned.columns = boardCloned.columns.map((column: any) => {
        if (column._id === columnId) {
            return {
                ...column._doc,
                tasks: [...column._doc.tasks, task]
            }
        }
        return column
    })

    return boardCloned
}

export const removeTaskFromBoard = (board: Board, columnId: string, taskId: string) => {
    const updatedColumns = board.columns.map((column: any) => {
        if (column._id === columnId) {
            const updatedTasks = column.tasks.filter((task: any) => task._id?.toString() !== taskId);
            return { ...column._doc, tasks: updatedTasks };
        }
        return column;
    });

    return { ...board, columns: updatedColumns };
};

export const updateTaskFromBoard = (board: Board, columnId: string, taskId: string, newTask: Task) => {
    const updatedColumns = board.columns.map((column: any) => {
        if (column._id === columnId) {
            const updatedTasks = column.tasks.map((task: any) => {
                if (task._id === taskId) {
                    return { ...task, ...newTask }
                }
                return task;
            });
            return { ...column._doc, tasks: updatedTasks };
        }
        return column;
    });

    return { ...board, columns: updatedColumns };
};
