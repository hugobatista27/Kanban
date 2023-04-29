import './header.css';
import ThreeLine from '../../assets/images/three-line.svg';

function Header({project}) {
    return (
        <div className='header'>
            <h1>{project === null ? 'Novo projeto' : project.title}</h1>
            <div className='options'>
                <button className='newTask'>+Add new task</button>
                <button>
                    <img src={ThreeLine} alt="três pontos" />
                </button>
            </div>
        </div>
    )
}

export default Header