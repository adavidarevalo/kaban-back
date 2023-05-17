import { Task } from '../types/task';
import { formatNewTask } from './task';

describe('formatNewTask', () => {
    it('should format a new task correctly', () => {
        const task: Task = {
            title: 'Task 1',
            description: 'Description 1',
            subTask: [
                {
                    title: 'SubTask 1',
                    _id: null,
                    isCompleted: false
                },
                {
                    title: 'SubTask 2',
                    _id: null,
                    isCompleted: true
                }
            ]
        };

        const result = formatNewTask(task);

        expect(result).not.toBe(task);
        expect(result.title).toBe(task.title);
        expect(result.description).toBe(task.description);
        expect(result._id).toBeDefined();

        expect(result.subTask.length).toBe(task.subTask.length);

        result.subTask.forEach((subTask, index) => {
            expect(subTask.title).toBe(task.subTask[index].title);
            expect(subTask.isCompleted).toBe(task.subTask[index].isCompleted);
            expect(subTask._id).toBeDefined();
        });
    });

});