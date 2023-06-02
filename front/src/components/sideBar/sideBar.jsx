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

    const [functionGetProjectsInProgress, setFunctionGetProjectsInProgress] = useState(false);

    let n = 0
    useEffect(() => {
        console.log(n++)
    }, [functionGetProjectsInProgress])
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
                return data
            })
            .catch(error => console.error(error))
    }
    
    useEffect(() => {
        if(!functionGetProjectsInProgress) {
            getProjects().then((data) => data ? setProjects(data) : '');
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

export default memo(SideBar); 