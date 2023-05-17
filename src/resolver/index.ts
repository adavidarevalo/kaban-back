import {
    confirmSignUpCode,
    refreshToken,
    registerNewUser,
    resendConfirmationCode,
    signIn
} from '../controller/authentication.controller';

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

export const dashboardResolver = {
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
        //Authentication
        registerNewUser,
        confirmSignUpCode,
        resendConfirmationCode,
        signIn,
        refreshToken
    },
}
