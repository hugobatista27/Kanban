import Header from './components/header/header.jsx';
import SideBar from './components/sideBar/sideBar.jsx';
import TaskArea from './components/taskArea/taskArea.jsx'

import '././components/styles/main.css';

import React, { useEffect, useState } from 'react';
import ProjectContext from './contexts/selectedProjectState.js';

function App() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [atualizarFetchTasks, setAtualizarFetchTasks] = useState(null);
    const [projects, setProjects] = useState([{_id: '1', projectName: 'carregando'}]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showSideBar, setShowSideBar] = useState(true);
    const [isMobile, setIsMobile] = useState(true)

    const contextValues = {
        selectedProject, setSelectedProject,
        atualizarFetchTasks, setAtualizarFetchTasks, 
        projects, setProjects, 
        selectedTask,setSelectedTask,
        showSideBar, setShowSideBar,
        isMobile, setIsMobile
    }


    useEffect(() => {
        var windowWidth = document.body.clientWidth;
        if (windowWidth > 600) {
            setIsMobile(false)
        } else {
            setShowSideBar(false)
        }
    }, [])

    window.addEventListener("resize", () => {
        var windowWidth = document.body.clientWidth;
        
        if (windowWidth < 600) {
            setIsMobile(true)
            setShowSideBar(false)
        } 
        if (windowWidth > 600) {
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
                <div id='contentArea'
                    
                    style={isMobile ? {width: 100 + '%'}: showSideBar ? {width: `calc(${100}% - ${250}px)`} : {width: 100+'%'}}>
                    <Header/>
                    {isMobile && (
                        <SideBar/>
                    )}
                    <TaskArea selectedProject={selectedProject}></TaskArea>
                </div>
            </div>
        </ProjectContext.Provider>
    );}

export default App;