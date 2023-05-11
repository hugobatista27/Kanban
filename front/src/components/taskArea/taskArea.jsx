//import React, { useState, useEffect, useRef } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import Subtasks from './subtasks.jsx';
import '../styles/taskArea.css'

export default function TaskArea({ selectedProject }) {
    const [allTasks, setAllTasks] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const refSubtasks = useRef(null);

    const getProject = async () => {
        fetch('http://192.168.3.11:3001/project/' + selectedProject._id)
        .then(res => res.json())
        .then(data => {
            setAllTasks(data)
        })
        .catch(error => console.error(error))
    }

    useEffect(() => {
        if(selectedProject !== null){
            getProject()
        }
    }, [selectedProject])

    const showTasks = (taskId) => {
        const task = allTasks.tasks.find((tarefa) => tarefa._id === taskId);
        setSelectedTask(task);
    };

    const closeTasks = () => {
        setSelectedTask(null);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (refSubtasks.current && !refSubtasks.current.contains(event.target)) {
                closeTasks();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [refSubtasks]);

    if (allTasks == null) {
        return (
            <div className='centerObjects'>
                <div className='taskArea'></div>
            </div>
        )
    } else {
        return (
            <div className='centerObjects'>
                <div className='taskArea'>
                    {allTasks.status.map((coluna) => {
                        const tasks = allTasks.tasks.filter((task) => task.idStatus === coluna.idCollun);

                        return (
                            <div className='colluns' key={coluna.idCollun} id={coluna.idCollun}>
                                <p>
                                    {coluna.statusName.toUpperCase()} ({tasks.length})
                                </p>
                                {tasks.map((task) => (
                                    <div className='cardWrapper' key={task._id} onClick={() => showTasks(task._id)}>
                                        <button className='card' id={task._id}>
                                            <p className='taskName'>{task.taskName}</p>
                                            <p className='totalTasks'>
                                                {task.subtasks.reduce((count, task) => {
                                                return count + (task.done ? 1 : 0)
                                                }, 0)} of {task.subtasks.length} substasks
                                            </p>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
                {selectedTask && (
                    <div className='showInfoTask'>
                        <div ref={refSubtasks}>
                            <button className='closeButton' onClick={closeTasks}>
                                X
                            </button>
                            <Subtasks task={selectedTask} status={allTasks.status} />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
