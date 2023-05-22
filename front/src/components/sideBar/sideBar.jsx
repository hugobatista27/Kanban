import React, { useEffect, useState, useContext, useRef } from 'react';
import ProjectContext from '../../contexts/selectedProjectState.js';
import OptionsSideBar from './optionsSideBar.jsx'
import Svg from '../../assets/images/Vectorlogo.svg' // no react precisamos sempre importar as imagens

function SideBar() {
    const {selectedProject, setSelectedProject} = useContext(ProjectContext)
    const {projects, setProjects} = useContext(ProjectContext)
    const {showSideBar, setShowSideBar} = useContext(ProjectContext);
    const refSideBar = useRef();

    const getProjects = async() => {
        fetch('http://192.168.3.11:3001/projectsName')
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error(error))
    }
    
    useEffect(() => {
        getProjects();
    }, [selectedProject])

    useEffect(() => {
        if (!showSideBar) {
            setTimeout(() => {
                refSideBar.current.classList.toggle('d-none')
            }, 100)    
        }
    }, [showSideBar])

    const closeSideBar = () => {
        setShowSideBar(false)
    }

    return (
        <>
            <div ref={refSideBar} className={`sideBar ${showSideBar ? 'open' : 'closed'}`}>
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
            <div 
                style={{width: 30 + 'px', backgroundColor: 'transparent', height: 100 + '%', position: 'absolute', left: 0, top: 0, zIndex: 1}}
                onMouseOver={() => setShowSideBar(true)}>
            </div>
        </>
    );
}

export default SideBar;