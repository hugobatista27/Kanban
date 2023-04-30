import './header.css';
import ThreeLine from '../../assets/images/three-line.svg';
import { useState } from 'react';

function Header({project, setProjectTitle}) {

    return (
        <div className='header'>
            <EditableTitle project={project} setProjectTitle={setProjectTitle}></EditableTitle>
            <div className='options'>
                <button className='newTask'>+Add new task</button>
                <button>
                    <img src={ThreeLine} alt="três pontos" />
                </button>
            </div>
        </div>
    )
}

function EditableTitle({project, setProjectTitle}) {
    const [isEditing, setIsEdting] = useState(false);

    const handleDoubleClick = () => {
        setIsEdting(true);
    };

    const handleBlur = () => {
        setIsEdting(false);
    }

    const handleInputChange = (event) => {
        let teste = {...project}
        teste.title = event.target.value
        setProjectTitle(teste)
    };
    
    if(isEditing) {
        return (
            <input
                type='text'
                value={project === null ? 'Novo projeto' : project.title}
                onBlur={handleBlur}
                onChange={handleInputChange}
                autoFocus
            />
        )
    }

    return (
        <h1 onDoubleClick={handleDoubleClick}> 
            {project === null ? 'Novo projeto' : project.title}
        </h1>
    ) 

}

export default Header