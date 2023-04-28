//import React, { useState, useEffect, useRef } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import Subtasks from './subtasks.jsx';
import './taskArea.css'

/* import React, { useState } from 'react';
 */
const teste2 = {
    colunas: [
        {
            id: 1,
            nome: 'TODO'
        },
        {
            id: 2,
            nome: 'DOING'
        },
        {
            id: 3,
            nome: 'DONE'
        }
    ],
    tarefas: [
        {
            idTarefa: 1,
            nome: 'Reserach pricing points',
            description: 'Welknow what Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero, illum?',
            colunaId: 1,
            subtasks: [
                {
                    id:1,
                    description: 'Estudar React',
                    tarefaId: 1,
                    done: true
                },
                {
                    id:2,
                    description: 'Criar o banco de dados com MongoDB',
                    tarefaId: 1,
                    done: false
                },
                {
                    id:3,
                    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta ullam culpa sequi magni earum consequuntur ducimus! Porro, repellat ipsa.",
                    tarefaId: 1,
                    done: false
                },
                {
                    id:3,
                    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta ullam culpa sequi magni earum consequuntur ducimus! Porro, repellat ipsa.",
                    tarefaId: 1,
                    done: false
                }
            ]
        },
        {
            idTarefa: 2,
            nome: 'tarefa1',
            description: 'testando 123',
            colunaId: 3,
            subtasks: [
                {
                    id:1,
                    description: 'descrção 12321',
                    tarefaId: 1,
                },
                {
                    id:2,
                    description: 'descrção 222222',
                    tarefaId: 1,
                }
            ]
        },
        {
            idTarefa: 3,
            nome: 'tarefa1',
            description: 'testando 123',
            colunaId: 1,
            subtasks: [
                {
                    id:1,
                    description: 'descrção 12321',
                    tarefaId: 1,
                },
                {
                    id:2,
                    description: 'descrção 222222',
                    tarefaId: 1,
                }
            ]
        },
        {
            idTarefa: 4,
            nome: 'tarefa1',
            description: 'testando 123',
            colunaId: 2,
            subtasks: [
                {
                    id:1,
                    description: 'descrção 12321',
                    tarefaId: 1,
                },
                {
                    id:2,
                    description: 'descrção 222222',
                    tarefaId: 1,
                }
            ]
        },
    ]
}

/* export default function TaskArea() {
    const allTasks = teste2


    return (
        <div className='centerObjects'>
            <div className='taskArea'>
                {allTasks.colunas.map((coluna) => {
                    const tasks = allTasks.tarefas.filter((task) => task.colunaId === coluna.id);
                    return (
                        <div className='colluns' key={coluna.id} id={coluna.id}>
                            <p>{coluna.nome.toUpperCase()} ({tasks.length})</p>
                            {tasks.map((task) => (
                                <button className='card' key={task.idTarefa} id={task.idTarefa} onClick={showTasks}>
                                    <p className='taskName'>{task.nome}</p>
                                    <p className='totalTasks'>
                                        0 of {task.subtasks.length} substasks
                                    </p>
                                </button>
                            ))}
                        </div>
                    );
                })}
            </div>
            <div className='showInfoTask'>
               <Subtasks task={allTasks.tarefas[0]} colluns={allTasks.colunas}></Subtasks>
            </div>
        </div>
    )
} */


export default function TaskArea() {
    const allTasks = teste2;
    const [selectedTask, setSelectedTask] = useState(null);
    const refSubtasks = useRef(null);

  const showTasks = (taskId) => {
    const task = allTasks.tarefas.find((tarefa) => tarefa.idTarefa === taskId);
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

  return (
    <div className='centerObjects'>
      <div className='taskArea'>
        {allTasks.colunas.map((coluna) => {
          const tasks = allTasks.tarefas.filter((task) => task.colunaId === coluna.id);
          return (
            <div className='colluns' key={coluna.id} id={coluna.id}>
              <p>{coluna.nome.toUpperCase()} ({tasks.length})</p>
              {tasks.map((task) => (
                <div className='cardWrapper' key={task.idTarefa} onClick={() => showTasks(task.idTarefa)}>
                  <button className='card' id={task.idTarefa}>
                    <p className='taskName'>{task.nome}</p>
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
            <Subtasks task={selectedTask} colluns={allTasks.colunas} />
          </div>
        </div>
      )}
    </div>
  );
}
