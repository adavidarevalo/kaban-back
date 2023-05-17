export interface SubTask {
    title: string;
    isCompleted: boolean;
    _id?: string | null;
}

export interface Task {
    boardId?: string;
    columnId?: string;
    title: string;
    description: string;
    subTask: SubTask[]
    _id?: string | null;
    previousColumnId?: string;
}
