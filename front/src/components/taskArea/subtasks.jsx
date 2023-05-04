import { useState } from 'react';
import '../styles/subtasks.css';

export default function Subtasks({task, status}) {
    const [tasks, setTasks] = useState(task.subtasks);

    const handleChange = (index) => {
        const newTasks = [...tasks];
        newTasks[index].done = !newTasks[index].done;
        setTasks(newTasks);
    }

    const tasksDone = () => {
        return tasks.reduce((count, task) => {
            return count + (task.done ? 1 : 0)
        }, 0)
    }

    return (
            <div className="boxInfoTask">
                <h2>{task.taskName}</h2>
                <p>{task.description}</p>
                <h3>Subtasks ({tasksDone()} of {task.subtasks.length})</h3>
                <div className='boxSubtasks'>
                    {tasks.map((subtask, index) => {
                        return (
                            <label 
                                key={'subtask' + index}
                                htmlFor={'subtask' + index}
                                className={subtask.done ? 'checked subtask' : 'subtask'}>
                                <input 
                                    type="checkbox" 
                                    key={'subtaskKey' + index}
                                    id={'subtask' + index}
                                    checked={subtask.done}
                                    onChange={() => handleChange(index)}
                                    />
                                    {subtask.description}
                            </label>
                        )
                    })}
                </div>
                <div>
                    <h3>Status</h3>
                    <select name="" id="">
                        {status.map((collun, index) => {
                            if(collun.idCollun === task.idstatus){
                                return <option selected value={collun.id} key={'status' + index}>{collun.statusName}</option>
                            } else {
                                return <option value={collun.idCollun} key={'status' + index}>{collun.statusName}</option>
                            }
                        })}
                    </select>
                </div>
            </div>)
}