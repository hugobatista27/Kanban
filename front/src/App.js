import Header from './components/header/header.jsx';
import SideBar from './components/sideBar/sideBar.jsx';
import TaskArea from './components/taskArea/taskArea.jsx'

import './App.css'
import React, { useState } from 'react';
import ProjectContext from './contexts/selectedProjectState.js';

function App() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [atualizarFetchTasks, setAtualizarFetchTasks] = useState(null)

    return (
        <ProjectContext.Provider value={{selectedProject, setSelectedProject, atualizarFetchTasks, setAtualizarFetchTasks}}>
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