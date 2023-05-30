import React, { useEffect, useState, useContext, useRef } from 'react';
import ProjectContext from '../../contexts/selectedProjectState.js';
import OptionsSideBar from './optionsSideBar.jsx'
import Logo from '../../assets/images/Vectorlogo.svg'
import Seta from '../../assets/images/seta.svg'
import { useClickOutside } from '../generic/useClickOutside.js';

function SideBar() {
    const {selectedProject, setSelectedProject} = useContext(ProjectContext)
    const {projects, setProjects} = useContext(ProjectContext)
    const {showSideBar, setShowSideBar, isMobile} = useContext(ProjectContext);
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

    useClickOutside(refSideBar, () => {
        if (isMobile) {
            setShowSideBar(false);            
        }
    })

    if (!isMobile) {
        return (
            <>
                <div ref={refSideBar} className={`sideBar ${showSideBar ? 'open' : 'closed'}`}>
                    <div className="divLogo">
                        <img src={Logo} alt="Logo" />
                        <h1>kanban</h1>
                    </div>
                    <div className='boards'>
                        <div className='boxCloseSideBar'>
                            <p>ALL BOARDS ({projects.length})</p>
                            <button
                                onClick={closeSideBar}>
                                <img src={Seta} alt="ocultar menu lateral" />
                            </button>
                        </div>
                        <OptionsSideBar buttons={projects} setSelectedProject={setSelectedProject}></OptionsSideBar>
                    </div>
                </div>
                <button 
                    className='showSideBar'
                    onMouseOver={() => setShowSideBar(true)}>
                </button>
            </>
        );
    }
    if (isMobile) {
        return (
            <>
                <div ref={refSideBar} className={`sideBar ${showSideBar ? 'open' : 'closed'}`}>
                    <div className='boards'>
                        <div className='boxCloseSideBar'>
                            <p>ALL BOARDS ({projects.length})</p>
                            <button
                                onClick={closeSideBar}>
                                <img src={Seta} alt="ocultar menu lateral" />
                            </button>
                        </div>
                        <OptionsSideBar buttons={projects} setSelectedProject={setSelectedProject}></OptionsSideBar>
                    </div>
                </div>
                <button className='showSideBar'
                    onClick={() => showSideBar ? setShowSideBar(false) : setShowSideBar(true)}>
                </button>
            </>
        );    
    }
}

export default SideBar;