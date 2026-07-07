import { taskDetails } from './data';

let tasks = [...taskDetails];
const resolvers = {
    Query: {
        // Return all tasks + total count
        getTasks: () => {
            return {
                result: tasks,
                count: tasks.length
            };
        },
        task: (_, { id }) => {
            return tasks.find(t => String(t.TaskID) === String(id)) || null;
        }
    },
    Mutation: {
        addTask: (_, { value }) => {
            const exists = tasks.find(t => String(t.TaskID) === String(value.TaskID));
            if (exists) throw new Error('TaskID already exists');
            const newTask = { ...value };
            tasks.push(newTask);
            return newTask;
        },
        updateTask: (_, { value }) => {
            const taskIndex = tasks.findIndex(t => String(t.TaskID) === String(value.TaskID));
            if (taskIndex === -1) throw new Error('Task not found');
            tasks[taskIndex] = { ...tasks[taskIndex], ...value };
            return tasks[taskIndex];
        },
        deleteTask: (_, { key }) => {
            const taskIndex = tasks.findIndex(t => String(t.TaskID) === String(key));
            if (taskIndex === -1) return false;
            tasks.splice(taskIndex, 1); // simple delete
            return true;
        },

    }
};
export default resolvers;
