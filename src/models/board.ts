import { ColumnSchema } from './column';
const mongoose = require('mongoose')
const boardSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        columns: {
            type: [ColumnSchema.schema],
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const Board = mongoose.model('Board', boardSchema)
