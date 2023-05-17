import { SubTasks } from './sub_task';
const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        subTask: [SubTasks.schema],
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export const Tasks = mongoose.model('Task', taskSchema)
