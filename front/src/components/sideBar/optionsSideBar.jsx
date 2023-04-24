import { useState } from 'react'
import iconBoard from '../../assets/images/icon-board.svg'

export default function OptionsSideBar(props) {

    return (
        <div>
            <ul id='areaProjectsButton'>
                {props.buttons.map((object, index) => 
                    <button key={index} 
                        id={object.id}
                        onClick={handleClick}
                        className={object.select ? 'selected' : ''}>
                        <img src={iconBoard} alt="icon" /> 
                        {object.title}
                    </button>
                )}
                <button className='buttonNewBoard'>+ Create New Board</button>
            </ul>
        </div>
    )
}

function handleClick(event) {
    const buttons = document.getElementById('areaProjectsButton').childNodes
    console.log(buttons);
    buttons.forEach((button) => {
        button.className = ''
    });
    const button = event.target;
    const id = button.id;
    button.className = "selected";
    console.log(`Botão ${id} foi clicado!`);
}