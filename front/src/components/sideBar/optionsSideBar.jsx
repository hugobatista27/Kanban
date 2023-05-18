import React, { useState, useContext, useEffect } from 'react';
import iconBoard from '../../assets/images/icon-board.svg'
import Server from '../../configs/server'
import ProjectContext from '../../contexts/selectedProjectState.js';


export default function OptionsSideBar({buttons, setSelectedProject}) {
    const [isSelected, setIsSelected] = useState('')
    const {selectedProject} = useContext(ProjectContext)

    useEffect(() => {
        if (selectedProject) {
            changeState(selectedProject)   
        }
    }, [selectedProject])

    function changeState(project) {
    setSelectedProject(project)
        if(isSelected !== project._id){
            // setTimeOut provisório
            setTimeout(() => {
                document.getElementById(project._id).classList.toggle('selected');
            }, 100);
            if (isSelected) {
                document.getElementById(isSelected).classList.toggle('selected');                
            }
            setIsSelected(project._id);
        }
    }

    const newProject = () => {
        document.getElementById('labelNewElement').classList.toggle('d-none')
        document.getElementById('labelNewElement').focus()
    }

    const addNewProject = async(target) => {
        if(target.value !== '') {
            fetch(`${Server.newProject}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: target.value})
            })
                .then((res) => res.json())
                .then((data) => {
                    setSelectedProject({
                        projectName: data.projectName,
                        _id: data._id
                    })
                })
        }
        document.getElementById('labelNewElement').classList.toggle('d-none')
    }

    return (
        <div>
            <ul id='areaProjectsButton'>
                {buttons.map((object, index) => 
                    <button key={index} 
                        id={object._id}
                        onClick={() => changeState(object)}
                        className={object.select ? 'selected' : ''}>
                        <img src={iconBoard} alt="icon" /> 
                        {object.projectName}
                    </button>
                )}
            </ul>
            <label id='labelNewElement' htmlFor="newElement" className='d-none'>
                <img src={iconBoard} alt="icon" />
                <input 
                    type="text" 
                    id='newElement' 
                    autoComplete='off' 
                    placeholder="New Project" 
                    onBlur={(event) => addNewProject(event.target)}
                />
            </label>
            <button className='buttonNewBoard' onClick={newProject}>+ Create New Board</button>
        </div>
    )
}