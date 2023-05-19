import React, { useEffect, useState, useContext } from 'react';
import ProjectContext from '../../contexts/selectedProjectState.js';
import OptionsSideBar from './optionsSideBar.jsx'
import Svg from '../../assets/images/Vectorlogo.svg' // no react precisamos sempre importar as imagens

function SideBar() {
    const {selectedProject, setSelectedProject} = useContext(ProjectContext)
    const {projects, setProjects} = useContext(ProjectContext)
    const [showSideBar, setShowSideBar] = useState(true)

    const getProjects = async() => {
        fetch('http://192.168.3.11:3001/projectsName')
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error(error))
    }
    
    useEffect(() => {
        getProjects();
    }, [selectedProject])

    const closeSideBar = () => {
        setShowSideBar(false)
    }

    return (
        <div className={showSideBar ? 'sideBar' : 'd-none'}>
            <div className="divLogo">
                <img src={Svg} alt="Logo" />
                <h1>kanban</h1>
            </div>
            <div className='boards'>
                <div className='boxCloseSideBar'>
                    <p>ALL BOARDS ({projects.length})</p>
                    <button
                        onClick={closeSideBar}>
                        &lt;
                    </button>
                </div>
                <OptionsSideBar buttons={projects} setSelectedProject={setSelectedProject}></OptionsSideBar>
            </div>
        </div>
    );
}

export default SideBar;