import Header from './components/header/header.jsx';
import SideBar from './components/sideBar/sideBar.jsx';
import TaskArea from './components/taskArea/taskArea.jsx'

import InputArea from './testeInput.jsx'

import './App.css'
import { useState } from 'react';

function App() {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <InputArea/>
        
        {/* <div className="index">
            <SideBar selectedProject={selectedProject} setSelectedProject={setSelectedProject}></SideBar>
            <div id='contentArea'>
                <Header project={selectedProject} setProjectTitle={setSelectedProject}></Header>
                <TaskArea selectedProject={selectedProject}></TaskArea>
            </div>
        </div> */}
    );
}

export default App;
