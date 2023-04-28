import { useState } from 'react';
import './subtasks.css';

export default function Subtasks(props) {
    const [tasks, setTasks] = useState(props.task.subtasks);

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
                <h2>{props.task.nome}</h2>
                <p>{props.task.description}</p>
                <h3>Subtasks ({tasksDone()} of {props.task.subtasks.length})</h3>
                <div className='boxSubtasks'>
                    {tasks.map((subtask, index) => {
                        return (
                            <label 
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
                        {props.colluns.map((collun) => {
                            if(collun.id === props.task.colunaId){
                                return <option selected value={collun.id}>{collun.nome}</option>
                            } else {
                                return <option value={collun.id}>{collun.nome}</option>
                            }
                        })}
                    </select>
                </div>
            </div>)
}