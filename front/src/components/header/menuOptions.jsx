import { useContext, useEffect, useState } from "react";
import ProjectContext from "../../contexts/selectedProjectState";
import Server from '../../configs/server.js';

function MenuOptions() {
    const {selectedProject, setSelectedProject, setAtualizarFetchTasks, projects} = useContext(ProjectContext)

    const deleteProject = () => {
        fetch(Server.deleteProject + selectedProject._id, {
            method: "DELETE",
            headers: {
				'Content-Type': 'application/json'
			}
        }).then(() => {
            window.alert("Projeto Excluído")
            let newArrayProjects = [...projects]
            setSelectedProject(newArrayProjects[0])
            setAtualizarFetchTasks(Math.random())
        })
    }
    //dar um jeito de criar uma cópia do ultimo projeto selecionado
    
    return (
        <>
            <button
                onClick={deleteProject}>
                Delete Project
            </button>
            <button>
                Options
            </button>
        </>
    )
}

export default MenuOptions