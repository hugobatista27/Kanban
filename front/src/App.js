import Header from './components/header/header.jsx';
import SideBar from './components/sideBar/sideBar.jsx';
import TaskArea from './components/taskArea/taskArea.jsx'

import '././components/styles/main.css';

import React, { useState } from 'react';
import ProjectContext from './contexts/selectedProjectState.js';

function App() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [atualizarFetchTasks, setAtualizarFetchTasks] = useState(null);
    const [projects, setProjects] = useState([{_id: '1', projectName: 'carregando'}]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showSideBar, setShowSideBar] = useState(true);

    const contextValues = {
        selectedProject, setSelectedProject,
        atualizarFetchTasks, setAtualizarFetchTasks, 
        projects, setProjects, 
        selectedTask,setSelectedTask,
        showSideBar, setShowSideBar
    }

    return (
        <ProjectContext.Provider value={contextValues}>
            <div className="index">
                <SideBar/>
                <div id='contentArea'>
                    <Header/>
                    <TaskArea selectedProject={selectedProject}></TaskArea>
                </div>
            </div>
        </ProjectContext.Provider>
    );
}

export default App;