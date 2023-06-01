import React, { useState, useEffect, useRef, useContext } from 'react';
import Subtasks from './subtasks.jsx';
import ProjectContext from '../../contexts/selectedProjectState.js';
import { useClickOutside } from '../generic/useClickOutside.js';
import UserLogged from '../../contexts/userLogged';

export default function TaskArea({ selectedProject }) {
    const {idUser} = useContext(UserLogged);
    const [allTasks, setAllTasks] = useState(null);
    const [indexOfSelectedTask, setIndexOfSelectedTask] = useState(null)
    const refSubtasks = useRef(null);

    const {atualizarFetchTasks, selectedTask, setSelectedTask} = useContext(ProjectContext)

    const getProject = async () => {
        fetch('http://192.168.3.11:3001/project/' + selectedProject._id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(idUser)
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            setAllTasks(data)
        })
        .catch(error => console.error(error))
    }

    useEffect(() => {
        if(selectedProject !== null){
            getProject()
        }
    }, [selectedProject, atualizarFetchTasks])

    const showTasks = (taskId) => {
        const task = allTasks.tasks.find((tarefa) => tarefa._id === taskId);
        allTasks.tasks.forEach((task, indexTask) => {
            if(task._id === taskId) {
                setIndexOfSelectedTask(indexTask)
            }
        })
        setSelectedTask(task);
    };

    useClickOutside(refSubtasks, () => {
        setSelectedTask(null);
    })

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
                            <Subtasks task={selectedTask} status={allTasks.status} index={indexOfSelectedTask} id={selectedProject._id}/>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
