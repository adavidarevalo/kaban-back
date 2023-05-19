import {
    createTask,
    deleteTask,
    updateTask
} from '../controller/task.controller'

import {
    createDashboard,
    editBoard,
    getBoards,
    getDashboard,
    deleteDashboard,
} from '../controller/dashboard.controller'
import { IResolvers, MercuriusContext } from 'mercurius'

export const dashboardResolver: IResolvers<MercuriusContext, any>  = {
    Query: {
        //Boards
        getBoards,
        getDashboard,
    },
    Mutation: {
        //Board
        createDashboard,
        deleteDashboard,
        editBoard,
        //Task
        createTask,
        deleteTask,
        updateTask,
    },
}
