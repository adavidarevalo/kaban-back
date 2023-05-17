import { Task } from './task';

export interface Board {
    name: string
    columns: Column[]
}

export interface Column {
    name: string
    order: number
    tasks?: Task[]
    _id: string | null
}
