import { useContext } from 'react';
import UserLogged from '../../contexts/userLogged';
import imgWelcome from '../assets/imgWelcome.svg';
import { useState } from 'react';
import BoxLogin from './boxLogin';

export default function Slogan() {
    const {isMobile} = useContext(UserLogged)
    const [whatToDo, setWhatToDo] = useState(null) // 'register' || 'login'

    if (!whatToDo) {
        return (
            <>
                <div id="boxSlogan">
                    <div className="slogan">
                        <ul>
                            <li>Organize,</li>
                            <li>Visualize,</li>
                            <li>Conquiste</li>
                        </ul>
                        <p>Seu fluxo de trabalho simplificado!</p>
                    </div>
                    <img src={imgWelcome} alt="" />
                </div>
                {isMobile && (
                    <div className='buttonsMobileLogin'>
                        <button
                            className='buttonLogin'
                            onClick={() => setWhatToDo('login')}
                        >
                            Entrar
                        </button>
                        <button
                            className='buttonRegister'
                            onClick={() => setWhatToDo('register')}
                        >
                            Cadastrar
                        </button>
                    </div>
                )}
            </>
        )
    }

    if (whatToDo === 'login') {
        return (
            <BoxLogin doLogin={true}/>
        )
    }
    if (whatToDo === 'register') {
        return (
            <BoxLogin doLogin={false}/>
        )
    }
}