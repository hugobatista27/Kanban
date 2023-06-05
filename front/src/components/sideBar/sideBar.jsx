import React, { useEffect, useState, useContext, useRef, memo } from 'react';
import ProjectContext from '../../contexts/selectedProjectState.js';
import UserLogged from '../../contexts/userLogged.js';
import {createNewProject, OptionsSideBar} from './optionsSideBar.jsx'
import Logo from '../../assets/images/Vectorlogo.svg'
import Seta from '../../assets/images/seta.svg'
import { useClickOutside } from '../generic/useClickOutside.js';
import Server from '../../configs/server.js';

function SideBar() {
    const {selectedProject, setSelectedProject} = useContext(ProjectContext)
    const {projects, setProjects} = useContext(ProjectContext)
    const {showSideBar, setShowSideBar, isMobile} = useContext(ProjectContext);
    const {idUser} = useContext(UserLogged);
    const refSideBar = useRef();
    const [repeatGetProjects, setRepeateGetProjects] = useState(null)

    const [functionGetProjectsInProgress, setFunctionGetProjectsInProgress] = useState(false);
    
    const getProjects = async() => {
        if (functionGetProjectsInProgress) {
            return;
        }

        setFunctionGetProjectsInProgress(true)
        return fetch(Server.projectNames, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(idUser)
        })
            .then(response => response.json())
            .then((data) => {
                setFunctionGetProjectsInProgress(false)
                console.log(data)
                return data
            })
            .catch(error => console.error(error))
    }
    
    useEffect(() => {
        if(!functionGetProjectsInProgress) {
            getProjects().then((data) => data.message !== 'empty' ? setProjects(data.data) : setProjects([{_id: '1', projectName: 'Vazio'}]));
        }
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

    useEffect(() => {
        if (repeatGetProjects) {
            getProjects().then((data) => data.message !== 'empty' ? setProjects(data.data) : setProjects([{_id: '1', projectName: 'Vazio'}]));
        }
        setRepeateGetProjects(null)
    }, [repeatGetProjects])
    
    if (!isMobile && projects) {
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
                        <OptionsSideBar buttons={projects} setSelectedProject={setSelectedProject} setRepeateGetProjects={setRepeateGetProjects}></OptionsSideBar>
                    </div>
                </div>
                <button 
                    className='showSideBar'
                    onMouseOver={() => setShowSideBar(true)}>
                </button>
            </>
        );
    }
    if (isMobile && projects) {
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
                        <OptionsSideBar buttons={projects} setSelectedProject={setSelectedProject} setRepeateGetProjects={setRepeateGetProjects}></OptionsSideBar>
                    </div>
                </div>
                <button className='showSideBar'
                    onClick={() => showSideBar ? setShowSideBar(false) : setShowSideBar(true)}>
                </button>
            </>
        );    
    }
}

export default memo(SideBar); 