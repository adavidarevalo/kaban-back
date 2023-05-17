import { Tasks } from './task';

const mongoose = require('mongoose')
const columnSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        order: {
            type: Number,
            required: true,
        },
        tasks: [Tasks.schema],
        _id: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export const ColumnSchema = mongoose.model('ColumnSchema', columnSchema)
