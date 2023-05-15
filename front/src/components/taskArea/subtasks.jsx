import { useContext, useEffect, useState } from 'react';
import '../styles/subtasks.css';
import InputArea from '../generic/testeInput.jsx';
import Server from '../../configs/server.js';
import ProjectContext from '../../contexts/selectedProjectState';

export default function Subtasks({task, status, id, index}) {
    const [subtasks, setSubtasks] = useState(task.subtasks);

    const [newSubtasks, setNewSubtasks] = useState(task.subtasks)
    const [taskName, setNewTaskName] = useState(task.taskName)
    const [description, setNewDescription] = useState(task.description)
    const [newIdStatus, setNewIdSatus] = useState(task.idStatus)
    const [newSubtaskDescription, setNewSubtaskDescription] = useState(null)
    const [indexSubtask, setIndexSubtask] = useState(null)
    const [mudou, setMudou] = useState(false)

    const {setAtualizarFetchTasks} = useContext(ProjectContext)

    const [displayNewSubtask, setDisplayNewSubtask] = useState(false)
    const [newSubtask, setNewSubtask] = useState(null)

    useEffect(() => {
        let newTask = {
            ...task, 
            description: description,
            idStatus: newIdStatus,
            subtasks: newSubtasks,
            taskName: taskName
        }

        if(JSON.stringify(newTask) !== JSON.stringify(task) || mudou) {
            fetch(Server.updateTask, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({_id: id, index: index, tasks: newTask})
            })
            .then((res) => res.json())
            .then((data) => {
                setAtualizarFetchTasks(data)
                setMudou(false)
            })
            .catch((erro) => console.log(erro))
        } 
    }, [description, newIdStatus, newSubtasks, taskName])
    

    useEffect(() => {
        if(newSubtaskDescription) {
            let newTasks = [...subtasks]
            newTasks[indexSubtask].description = newSubtaskDescription
            setNewSubtasks(newTasks)
            setMudou(true)
        }
    }, [newSubtaskDescription])

    useEffect(() => {
        if(newSubtask){
            let obj = {
                description: newSubtask,
                done: false
            }
            let array = [...newSubtasks]
            array.push(obj)
            setNewSubtasks(array)
        }
    }, [newSubtask])

    const handleChange = (index) => {
        const newTasks = [...subtasks];
        newTasks[index].done = !newTasks[index].done;
        setNewSubtasks(newTasks);
        setMudou(true)
    }

    const tasksDone = () => {
        return subtasks.reduce((count, task) => {
            return count + (task.done ? 1 : 0)
        }, 0)
    }

    const createSubtask = () => {
        setDisplayNewSubtask(true)
    }

    return (
        <div className="boxInfoTask">
            <InputArea tag="h2" content={taskName} setNewContent={setNewTaskName}/>
            <InputArea tag="p" content={description} setNewContent={setNewDescription}/>
            <div className='addSubtask'>
                <h3>Subtasks ({tasksDone()} of {task.subtasks.length})</h3>
                <button onClick={createSubtask}>+</button>
            </div>
            <div className='boxSubtasks'>
                <label 
                    htmlFor=""
                    className={ displayNewSubtask ? 'subtask' : 'd-none' }>
                    <input type="checkbox" name="" id="" />
                    <InputArea tag="p" content={newSubtask ? '' : 'Nova tarefa'} setNewContent={setNewSubtask}/>
                </label>
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
                <select name="" id="" value={newIdStatus} onChange={(event) => setNewIdSatus(event.target.value)}>
                    {status.map((collun, index) => {
                        return <option value={collun.idCollun} key={'status' + index}>{collun.statusName}</option>                     
                    })}
                </select>
            </div>
        </div>
    )
}