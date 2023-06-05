import Header from './components/header/header.jsx';
import SideBar from './components/sideBar/sideBar.jsx';
import TaskArea from './components/taskArea/taskArea.jsx'

import '././components/styles/main.css';

import React, { useContext, useEffect, useState } from 'react';
import ProjectContext from './contexts/selectedProjectState.js';
import UserLogged from './contexts/userLogged.js';

function App() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [atualizarFetchTasks, setAtualizarFetchTasks] = useState(null);
    const [projects, setProjects] = useState([{_id: '1', projectName: 'Carregando...'}]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showSideBar, setShowSideBar] = useState(true);
    const {isMobile, setIsMobile} = useContext(UserLogged)

    const contextValues = {
        selectedProject, setSelectedProject,
        atualizarFetchTasks, setAtualizarFetchTasks, 
        projects, setProjects, 
        selectedTask,setSelectedTask,
        showSideBar, setShowSideBar,
    }


    useEffect(() => {
        var windowWidth = document.body.clientWidth;
        if (windowWidth > 600) {
            setIsMobile(false)
        } else {
            setShowSideBar(false)
            setIsMobile(true)
        }
    }, [])

    window.addEventListener("resize", () => {
        var windowWidth = document.body.clientWidth;
        
        if (windowWidth < 600) {
            setIsMobile(true)
            setShowSideBar(false)
        } 
        if (windowWidth >= 600) {
            setIsMobile(false)
            setShowSideBar(true)
        }
    })

    return (
        <ProjectContext.Provider value={contextValues}>
            <div className="index">
                {!isMobile && (
                    <SideBar/>
                )}
                <div 
                    id='contentArea'
                    style={isMobile ? {width: 100 + '%'}: showSideBar ? {width: `calc(${100}% - ${250}px)`} : {width: 100+'%'} }> {/* provisório */}
                    <Header/>
                    {isMobile && (
                        <SideBar/>
                    )}
                    <TaskArea selectedProject={selectedProject}></TaskArea>
                </div>
            </div>
        </ProjectContext.Provider>
    )
}

export default App;