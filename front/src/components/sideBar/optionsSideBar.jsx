import React, { useState, useContext, useEffect, useRef } from 'react';
import iconBoard from '../../assets/images/icon-board.svg'
import Server from '../../configs/server'
import ProjectContext from '../../contexts/selectedProjectState.js';
import UserLogged from '../../contexts/userLogged';

export async function createNewProject(name, idUser){
    return fetch(`${Server.newProject}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name, ...idUser})
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        return {
            projectName: data.projectName,
            _id: data._id
        }
    })
}

export function OptionsSideBar({buttons, setSelectedProject, setRepeateGetProjects}) {
    const [isSelected, setIsSelected] = useState('')
    const {selectedProject} = useContext(ProjectContext)
    const {idUser} = useContext(UserLogged);
    const [showLabelNewProject, setShowLabelNewProject] = useState(false);
    const inputRef = useRef(null)


    const changeSelectedProject = (project) => {
        setSelectedProject(project)
    }

    const addNewProject = async(target) => {
        if(target.value !== '') {
            setSelectedProject(createNewProject(target.value, idUser))
        }
    }

    return (
        <div>
            <ul id='areaProjectsButton'>
                {buttons.map((object, index) => {
                    if(object.projectName === 'Carregando...'){
                        return (
                            <p>
                                Carregando...
                            </p>
                        )
                    } 
                    if(object.projectName === 'Vazio'){
                        return (
                            <p>
                                Você não tem nenhum projeto
                            </p>
                        )
                    }
                    return (
                        <button key={index} 
                            id={object._id}
                            onClick={() => {
                                changeSelectedProject(object)
                                setIsSelected(object._id)
                            }}
                            className={isSelected === object._id ? 'selected' : ''}
                        >
                            <img src={iconBoard} alt="icon" /> 
                            {object.projectName}
                        </button>
                    )
                })}
            </ul>
            <label 
                id='labelNewElement' 
                htmlFor="newElement"
                className={!showLabelNewProject ? 'd-none' : ''}
                >
                <img src={iconBoard} alt="icon" />
                <input 
                    type="text" 
                    id='newElement' 
                    autoComplete='off' 
                    placeholder="New Project"
                    ref={inputRef}
                    onBlur={(event) => {
                        addNewProject(event.target)
                        setShowLabelNewProject(false)
                        setRepeateGetProjects(true)
                    }}
                />
            </label>
            <button 
                className='buttonNewBoard' 
                onClick={() => {
                    setShowLabelNewProject(true)
                    setTimeout(() => inputRef.current && inputRef.current.focus(), 100)
                }}
            >
                + Create New Board
            </button>
        </div>
    )
}