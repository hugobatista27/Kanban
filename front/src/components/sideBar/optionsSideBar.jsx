import React from 'react';
import iconBoard from '../../assets/images/icon-board.svg'

export default function OptionsSideBar({buttons, setSelectedProject}) {

    function changeState(selectedProject) {
        console.log(selectedProject);
        setSelectedProject(selectedProject)
    }

    return (
        <div>
            <ul id='areaProjectsButton'>
                {buttons.map((object, index) => 
                    <button key={index} 
                        id={object.id}
                        onClick={() => changeState(object)}
                        className={object.select ? 'selected' : ''}>
                        <img src={iconBoard} alt="icon" /> 
                        {object.title}
                    </button>
                )}
            </ul>
            <button className='buttonNewBoard'>+ Create New Board</button>
        </div>
    )
}
