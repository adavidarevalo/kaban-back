export const dashboardSchema = `
  type Query {
    getBoards: [Dashboard]
    getDashboard(_id: ID): Dashboard
  }

  type Mutation {
    createDashboard(dashboard: DashboardInput!): Dashboard
    deleteDashboard(_id: ID!): Dashboard
    editBoard(_id: ID!, board: DashboardInput!): Dashboard
    createTask(task: TaskInput!): Task
    deleteTask(taskToDelete: TaskToDelete!): ID!
    updateTask(task: TaskInput!): Task
    registerNewUser(user: UserInput!): Ok!
    confirmSignUpCode(user: UserConfirmSingUp!): Ok!
    resendConfirmationCode(email: String!): Ok!
    signIn(user: UserSignIn!): Token!
    refreshToken(refreshToken: String!): String!
  }

  input UserSignIn {
    email: String!
    password: String!
  }

  input UserConfirmSingUp {
    email: String!
    confirmationCode: String!
  }
  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input TaskToDelete {
    boardId: ID!
    columnId: ID!
    taskId: ID!
  }

  input TaskInput {
    title: String!
    description: String!
    boardId: ID!
    columnId: ID!
    previousColumnId: ID
    _id: ID
    subTask: [SubTaskInput]
  }

  input SubTaskInput {
    title: String!
    isCompleted: Boolean!
    _id: ID
  }

  input DashboardInput {
    name: String!
    columns: [ColumnsInput]
  }

  input ColumnsInput {
    name: String!
    order: Int
    tasks: [TaskInput]
    _id: ID
  }


  type Token {
    token: String!
    refreshToken: String!
  }
  type Ok {
    status: String!
  }

  type Dashboard {
    _id: ID
    name: String!
    columns: [Columns]
  }

  type Columns {
    name: String!
    order: Int!
    _id: String!
    tasks: [Task]
  }

  type Task {
    title: String!
    description: String!
    _id: ID!
    subTask: [Subtask]
  }

  type Subtask {
    title: String!
    _id: ID!
    isCompleted: Boolean!
  }
`
