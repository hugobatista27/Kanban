import OptionsSideBar from './optionsSideBar.jsx'
import Svg from '../../assets/images/Vectorlogo.svg' // no react precisamos sempre importar as imagens
import './sideBar.css'

let allBoards = [
    {title: "Platform Launch", route: '#', select: true}, {title: "Store", route: '#', select: null},
    {title: "Market plan", route: '#', select: null}, {title: "Roadmap", route: '#', select: null}
];

function SideBar() {
    let totalBoards = 0
    return (
        <div className='sideBar'>
            <div className="divLogo">
                <img src={Svg} alt="Logo" />
                <h1>kanban</h1>
            </div>
            <div className='boards'>
                <p>ALL BOARDS ({totalBoards})</p>
                <OptionsSideBar buttons={allBoards}></OptionsSideBar>
            </div>
        </div>
    );
}

export default SideBar;