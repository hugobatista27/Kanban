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
            </ul>
            <button className='buttonNewBoard'>+ Create New Board</button>
        </div>
    )
}

function handleClick(event) {
    const buttons = document.getElementById('areaProjectsButton').childNodes
    buttons.forEach((button) => {
        button.className = ''
    });
    const button = event.target;
    const id = button.id;
    button.className = "selected";
}