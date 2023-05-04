import { useEffect, useState } from 'react';
import OptionsSideBar from './optionsSideBar.jsx'
import Svg from '../../assets/images/Vectorlogo.svg' // no react precisamos sempre importar as imagens
import '../styles/sideBar.css'

let allBoards = [
    {title: "Platform Launch", id: 1, select: null}, {title: "Store", id: 2, select: null}
];

function SideBar({selectedProject, setSelectedProject}) {
    const [projects, setProjects] = useState([{_id: '1', projectName: 'carregando'}])

    const getProjects = async() => {
        fetch('http://192.168.3.11:3001/projectsName')
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error(error))
    }
    
    useEffect(() => {
        getProjects();
    },[selectedProject])

    return (
        <div className='sideBar'>
            <div className="divLogo">
                <img src={Svg} alt="Logo" />
                <h1>kanban</h1>
            </div>
            <div className='boards'>
                <p>ALL BOARDS ({projects.length})</p>
                <OptionsSideBar buttons={projects} setSelectedProject={setSelectedProject}></OptionsSideBar>
            </div>
        </div>
    );
}

export default SideBar;