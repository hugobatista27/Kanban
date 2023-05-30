import Logo from '../../assets/images/Vectorlogo.svg';

function Header() {
    return (
        <header id='welcome'>
            <div className='logo'>
                <img src={Logo} alt="Logo" />
                <h1>kanban</h1>
            </div>
        </header>
    )
}

export default Header;