import { useContext } from "react";
import Server from "../../configs/server.js";
import ProjectContext from "../../contexts/selectedProjectState.js";

export default function MenuOptionsTask({task}) {
    const {selectedProject, setAtualizarFetchTasks, setSelectedTask} = useContext(ProjectContext)

    const deleteTask = () => {
        const req = {
            taskId: task._id
        }
        fetch(Server.deleteTask + selectedProject._id, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
            .then(() => {
                console.log('setaaaaaa')
                setAtualizarFetchTasks(Math.random())
                setSelectedTask(null)
            })
            .catch((error) => console.log(error))
    }

    return (
        <>
            <button style={{fontSize: 16 + 'px'}}
                onClick={deleteTask}>
                Delete Task
            </button>
        </>
    )
}