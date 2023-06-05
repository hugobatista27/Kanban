import Logo from '../../assets/images/Vectorlogo.svg';
import { useEffect, useState, useContext } from 'react';
import { Routes } from '../../configs/userRoutes.js'
import { Register, checkInfoUser } from './formRegister';
import UserLogged from '../../contexts/userLogged';

function BoxLogin({doLogin = 'none'}) {
    const [isRegistered, setIsRegistered] = useState(!doLogin === 'none' ? true : doLogin ? true : false );

    return (
        isRegistered ? 
        <Login setIsRegistered={setIsRegistered}/> : 
        <Register setIsRegistered={setIsRegistered}/>
    )
}

function Login({setIsRegistered}) {
    const {idUser, setIdUser, isLogged, setIsLogged} = useContext(UserLogged)
    const [userInfoToLogin, setUserInfoToLogin] = useState({
        email: '',
        password: ''
    })
    const [emailInUse, setEmailInUse] = useState('default')

    const validateUser = async(userInfo) => {
        const response = await fetch(Routes.getProject, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        .then((res) => res.json())
        .then(async (data) => {
            if(data.message === 'find'){
                return data
            } else {
                const checkInUse = await checkInfoUser('email', userInfo.email);
                data.message = checkInUse === 'inUse' ? 'inUse' : 'notFind'
                return data
            }
        })

        return response
    }

    return (
        <div className='positionBoxLogin'>
            <div id='boxLogin'>
                <div className='logo'>
                    <img src={Logo} alt="logo" />
                    <h2>Entrar no Kanban</h2>
                </div>
                <div className='formLogin'>
                    <label htmlFor="emailLogin">
                        Email
                        <input
                            id='emailLogin'
                            type="text"
                            placeholder='exemplo@gmail.com'
                            className={emailInUse !== 'default' ? emailInUse ? 'borderColorSucess': 'borderColorNotSucess': ''}
                            onInput={(event) => {
                                setUserInfoToLogin({...userInfoToLogin, email: event.currentTarget.value});
                                if(emailInUse !== 'default'){setEmailInUse('default')}
                            }}
                        />
                        {emailInUse !== 'default' ? emailInUse ? '': 'Nenhum usuário cadastrado com esse Email': ''}
                    </label>
                    <label htmlFor="passwordLogin">
                        Senha
                        <input
                            id='passwordLogin'
                            type="password"
                            placeholder='Senha'
                            className={emailInUse !== 'default' ? emailInUse ? 'borderColorNotSucess': '': ''}
                            onInput={(event) => {
                                setUserInfoToLogin({...userInfoToLogin, password: event.currentTarget.value})
                                if(emailInUse !== 'default'){setEmailInUse('default')}
                            }}
                        />
                        {emailInUse !== 'default' ? emailInUse ? 'Senha incorreta': '': ''}
                    </label>
                    <button
                        onClick={async () => {
                            let data = await validateUser(userInfoToLogin)
                            let isValidate = data.message === 'find' ? true : false
                            if(isValidate){
                                setIdUser({userCollectionName: data._doc.login.email})
                                setIsLogged(true);
                            } else {
                                data.message === 'inUse' ? setEmailInUse(true) : setEmailInUse(false)
                            }
                        }}
                    >
                        Entrar
                    </button>
                </div>
                <div className='registerLink'>
                    <p>Não tem uma conta?</p>
                    <button
                        onClick={() => setIsRegistered(false)}>
                        Inscreva-se
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BoxLogin;