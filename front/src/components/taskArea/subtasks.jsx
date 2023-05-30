import { useContext, useEffect, useRef, useState } from 'react';
import InputArea from '../generic/testeInput.jsx';
import Server from '../../configs/server.js';
import ProjectContext from '../../contexts/selectedProjectState';
import TrashIcon from '../../assets/images/trash-icon.svg'
import ThreeLine from '../../assets/images/three-line.svg';
import MenuOptionsTask from './menuOptionsTasks.jsx';
import { useClickOutside } from '../generic/useClickOutside.js';


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

    const [showOptions, setShowOptions] = useState(false);
    const refMenuOptionsTask = useRef(null)

    const inputNewSubtask = useRef(null);

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
        const newTasks = [...newSubtasks];
        newTasks[index].done = !newTasks[index].done;
        setNewSubtasks(newTasks);
        setMudou(true)
    }

    const tasksDone = () => {
        return newSubtasks.reduce((count, task) => {
            return count + (task.done ? 1 : 0)
        }, 0)
    }

    const createSubtask = () => {
        setDisplayNewSubtask(true)
    }

    const deleteSubtask = (index) => {
        let array = [...newSubtasks]
        array.splice(index, 1);
        setNewSubtasks(array);
    }

    useEffect(() => {
        if (displayNewSubtask) {
            inputNewSubtask.current.value = ''
            inputNewSubtask.current.focus()
        }
    }, [displayNewSubtask])

    useClickOutside(refMenuOptionsTask, () => {
        setShowOptions(false);
    })

    return (
        <div className="boxInfoTask">
            <div className="titleArea">
                <InputArea tag="h2" content={taskName} setNewContent={setNewTaskName}/>
                <div className='containerMenuOptions'>
                    <button 
                        className='optionsTask'
                        onClick={() => setShowOptions(true)}
                        >
                        <img src={ThreeLine} alt="options" />
                    </button>
                    <div 
                        ref={refMenuOptionsTask} 
                        className={showOptions ? 'menuOptionsTask' : 'd-none'}>
                        <MenuOptionsTask task={task}/>
                    </div>
                </div>
            </div>
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
                    <input type="text" ref={inputNewSubtask} onBlur={(event) => {
                        setNewSubtask(event.target.value)
                        setDisplayNewSubtask(false)
                    }}/>
                </label>
                {newSubtasks.map((subtask, index) => {
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
                            <div className='subtaskDescription'>
                                <InputArea tag="p" content={newSubtasks[index].description} setNewContent={setNewSubtaskDescription}/>
                                <button 
                                    onClick={() => deleteSubtask(index)}>
                                    <img src={TrashIcon} alt="Apagar"/>
                                </button>
                            </div>
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