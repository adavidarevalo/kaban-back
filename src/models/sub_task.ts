export { }
const mongoose = require('mongoose')
const subTaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        isCompleted: {
            type: Boolean,
            required: true,
        },
        _id: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export const SubTasks = mongoose.model('SubTask', subTaskSchema)
