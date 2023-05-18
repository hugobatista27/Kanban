import React, { useEffect, useState, useContext } from 'react';
import ProjectContext from '../../contexts/selectedProjectState.js';
import OptionsSideBar from './optionsSideBar.jsx'
import Svg from '../../assets/images/Vectorlogo.svg' // no react precisamos sempre importar as imagens
import '../styles/sideBar.css'

function SideBar() {
    const {selectedProject, setSelectedProject} = useContext(ProjectContext)
    const {projects, setProjects} = useContext(ProjectContext)

    const getProjects = async() => {
        fetch('http://192.168.3.11:3001/projectsName')
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error(error))
    }
    
    useEffect(() => {
        getProjects();
    }, [selectedProject])

    return (
        <div className='sideBar'>
            <div className="divLogo">
                <img src={Svg} alt="Logo" />
                <h1>kanban</h1>
            </div>
            <div className='boards'>
                <p>ALL BOARDS ({projects.length})</p>
                <OptionsSideBar buttons={projects} setSelectedProject={setSelectedProject}></OptionsSideBar>
            </div>
        </div>
    );
}

export default SideBar;