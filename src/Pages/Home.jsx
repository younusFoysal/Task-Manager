import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import toast, {Toaster} from "react-hot-toast";

const Home = () => {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortCriteria, setSortCriteria] = useState('title');

    // Load tasks from local storage on component mount
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks && savedTasks.length > 0) {
            setTasks(savedTasks);
        }
    }, []);

    // Save tasks to local storage whenever they change
    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    const handleAddTask = () => {
        if (newTask.trim()) {
            setTasks([
                ...tasks,
                { title: newTask, id: Date.now(), completed: false, priority: 'Low' }
            ]);
            toast.success('Task added successfully!');
            setNewTask('');
        }
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
        toast.success('Task deleted successfully!');
    };

    const handleToggleComplete = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleSetPriority = (id, priority) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, priority } : task
        ));
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sortCriteria === 'title') {
            return a.title.localeCompare(b.title);
        } else if (sortCriteria === 'priority') {
            const priorityOrder = { High: 3, Medium: 2, Low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        } else if (sortCriteria === 'completed') {
            return a.completed - b.completed;
        }
        return 0;
    });


    return (
        <div>
            <div>
                <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-36">
                    <div className="px-4 py-2 text-center">
                        <h1 className="text-xl leading-[52px] font-semibold md:text-4xl lg:text-3xl">
                            <span className="">Easily Manage Your</span>

                            <span className="bg-indigo-600 text-white p-0.5 rounded-lg ml-2">Tasks</span>
                        </h1>
                    </div>
                    <Toaster />


                    {/* Task Input */}
                    <div className="w-full max-w-2xl mx-auto px-4 py-2 mb-4">
                        <div className="flex items-center border-b-2 border-indigo-500 py-2">
                            <input
                                type="text"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                placeholder="Add a task"
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            />
                            <button
                                onClick={handleAddTask}
                                className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 shadow-lg text-sm border-4 text-white py-1 px-2 rounded"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Sorting Options */}

                    <div className="flex gap-3 items-center justify-center mb-4">

                        <form className="flex flex-col md:flex-row gap-3">
                            <div className="flex">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search Tasks"

                                    className="w-full md:w-80 px-3 h-10 rounded-l border-2 border-indigo-600 focus:outline-none focus:border-indigo-600"
                                />
                                <button type="submit"
                                        className="bg-indigo-600 text-white rounded-r px-2 md:px-3 py-0 md:py-1">Search
                                </button>
                            </div>
                            <select
                                id="pricingType"
                                name="pricingType"
                                onChange={(e) => setSortCriteria(e.target.value)}
                                value={sortCriteria}
                                className="w-full h-10 border-2 border-indigo-600 focus:outline-none focus:border-indigo-500 text-indigo-600 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">

                                <option value="title">Title</option>
                                <option value="priority">Priority</option>
                                <option value="completed">Incomplete</option>
                            </select>
                        </form>

                    </div>


                    {/* Task List */}
                    <ul className="divide-y divide-gray-200 px-4">
                        {sortedTasks.map(task => (
                            <motion.li
                                key={task.id}
                                initial={{opacity: 0, y: -10}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: 10}}
                                className="py-4 px-4 flex items-center justify-between gap-6"
                            >
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => handleToggleComplete(task.id)}
                                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                                    />
                                    <span
                                        className={`block text-lg font-medium ${task.completed ? 'line-through' : ''}`}
                                    >
                                    {task.title}
                                </span>
                                </div>

                                <div className="flex items-center space-x-2 mr-4">
                                    <select
                                        onChange={(e) => handleSetPriority(task.id, e.target.value)}
                                        value={task.priority}
                                        className="bg-gray-100 border mr-6 border-gray-200 text-gray-700 py-1 px-2 rounded focus:outline-none"
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>

                                    <button
                                        onClick={() => handleDeleteTask(task.id)}
                                        className="text-red-500 border border-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white shadow-lg ml-2"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default Home;