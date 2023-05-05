import Header from './components/header/header.jsx';
import SideBar from './components/sideBar/sideBar.jsx';
import TaskArea from './components/taskArea/taskArea.jsx'

import InputArea from './components/generic/testeInput.jsx'

import './App.css'
import { useEffect, useState } from 'react';

function App() {
    const [selectedProject, setSelectedProject] = useState(null);
    /* const [newTitle, setNewTitle] = useState('Título')
    const [newParagraph, setNewParagraph] = useState('Double click')
    let objTeste = {paragrafo: newParagraph, title: newTitle}

    useEffect(() => {
        objTeste = {paragrafo: newParagraph, title: newTitle}
        console.log(objTeste);
    }, [newTitle, newParagraph]) */

    return (
        <div className="index">
            <SideBar selectedProject={selectedProject} setSelectedProject={setSelectedProject}></SideBar>
            <div id='contentArea'>
                <Header project={selectedProject} setProjectTitle={setSelectedProject}></Header>
                <TaskArea selectedProject={selectedProject}></TaskArea>
            </div>
        </div>
    );
}

/* <div>
    <InputArea tag="h2" paramText={newTitle} setNewContent={setNewTitle}/>
    <InputArea tag="button" paramText={newParagraph} setNewContent={setNewParagraph}/>
</div> */



export default App;
