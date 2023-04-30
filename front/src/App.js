import Header from './components/header/header.jsx';
import SideBar from './components/sideBar/sideBar.jsx';
import TaskArea from './components/taskArea/taskArea.jsx'

import './App.css'
import { useState } from 'react';

function App() {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <div className="index">
            <SideBar project={setSelectedProject}></SideBar>
            <div id='contentArea'>
                <Header project={selectedProject} setProjectTitle={setSelectedProject}></Header>
                <TaskArea project={selectedProject}></TaskArea>
            </div>
        </div>
    );
}

export default App;
