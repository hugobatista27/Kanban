import OptionsSideBar from './optionsSideBar.jsx'
import Svg from '../../assets/images/Vectorlogo.svg' // no react precisamos sempre importar as imagens
import './sideBar.css'

let allBoards = [
    {title: "Platform Launch", id: 1, select: null}, {title: "Store", id: 2, select: null}
];

function SideBar() {
    let totalBoards = allBoards.length
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