import { useEffect, useState } from 'react';
import '../styles/subtasks.css';
import InputArea from '../generic/testeInput.jsx';
import Server from '../../configs/server.js';

export default function Subtasks({task, status, id, index}) {
    const [subtasks, setSubtasks] = useState(task.subtasks);

    const [taskName, setNewTaskName] = useState(task.taskName)
    const [description, setNewDescription] = useState(task.description)
    const [newIdStatus, setNewIdSatus] = useState(task.idStatus)
    const [newSubtaskDescription, setNewSubtaskDescription] = useState(null)
    const [indexSubtask, setIndexSubtask] = useState(null)

    useEffect(() => {
        let newTask = {
            ...task, 
            description: description,
            idStatus: newIdStatus,
            subtasks:subtasks,
            taskName:taskName
        }

        if(JSON.stringify(newTask) !== JSON.stringify(task) || JSON.stringify(newTask.subtasks) !== JSON.stringify(task.subtasks)) {
            fetch(Server.updateTask, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({_id: id, index: index, tasks: newTask})
            })
            .then((res) => res.json())
            .then((data) => console.log(data))

            console.log('mudouuu')
        } else {
            console.log("está igual")
        }
    }, [description, newIdStatus, subtasks, taskName])
    

    useEffect(() => {
        if(newSubtaskDescription) {
            let newTasks = [...subtasks]
            newTasks[indexSubtask].description = newSubtaskDescription
            setSubtasks(newTasks)
        }
    }, [newSubtaskDescription])

    const handleChange = (index) => {
        const newTasks = [...subtasks];
        newTasks[index].done = !newTasks[index].done;
        setSubtasks(newTasks);
    }

    const tasksDone = () => {
        return subtasks.reduce((count, task) => {
            return count + (task.done ? 1 : 0)
        }, 0)
    }

    return (
        <div className="boxInfoTask">
            <InputArea tag="h2" content={taskName} setNewContent={setNewTaskName}/>
            <InputArea tag="p" content={description} setNewContent={setNewDescription}/>
            <div>
                <h3>Subtasks ({tasksDone()} of {task.subtasks.length})</h3>
                <button>+</button>
            </div>
            <div className='boxSubtasks'>
                {subtasks.map((subtask, index) => {
                    return (
                        <label 
                            key={'subtask' + index}
                            htmlFor={'subtask' + index}
                            className={subtask.done ? 'checked subtask' : 'subtask'}
                            onDoubleClick={() => setIndexSubtask(index)}    
                        >
                            <input 
                                type="checkbox" 
                                key={'subtaskKey' + index}
                                id={'subtask' + index}
                                checked={subtask.done}
                                onChange={() => handleChange(index)}
                            />
                            <InputArea tag="p" content={subtasks[index].description} setNewContent={setNewSubtaskDescription}/>
                        </label>
                    )
                })}
            </div>
            <div>
                <h3>Status</h3>
                <select name="" id="" onChange={(event) => setNewIdSatus(event.target.value)}>
                    {status.map((collun, index) => {
                        if(collun.idCollun === newIdStatus){
                            return <option selected value={collun.idCollun} key={'status' + index}>{collun.statusName}</option>
                        } else {
                            return <option value={collun.idCollun} key={'status' + index}>{collun.statusName}</option>
                        }
                    })}
                </select>
            </div>
        </div>
    )
}