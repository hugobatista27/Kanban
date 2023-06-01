import Logo from '../../assets/images/Vectorlogo.svg';
import { useEffect, useState, useContext } from 'react';
import { Routes } from '../../configs/userRoutes.js'
import { Register, checkInfoUser } from './formRegister';
import UserLogged from '../../contexts/userLogged';

function BoxLogin() {
    const [isRegistered, setIsRegistered] = useState(false);

    return (isRegistered ? <Login setIsRegistered={setIsRegistered}/> : <Register setIsRegistered={setIsRegistered}/>)
}

function Login({setIsRegistered}) {
    const {idUser, setIdUser, isLogged, setIsLogged} = useContext(UserLogged)
    const [userInfoToLogin, setUserInfoToLogin] = useState({
        email: '',
        password: ''
    })

   /*  useEffect(() => {
        console.log(userInfoToLogin)
    }, [userInfoToLogin]) */

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
                    <input
                        type="text"
                        placeholder='Email'
                        onInput={(event) => {setUserInfoToLogin({...userInfoToLogin, email: event.currentTarget.value})}}
                    />
                    <input
                        type="password"
                        placeholder='Senha'
                        onInput={(event) => {setUserInfoToLogin({...userInfoToLogin, password: event.currentTarget.value})}}
                    />
                    <button
                        onClick={async () => {
                            let data = await validateUser(userInfoToLogin)
                            let isValidate = data.message === 'find' ? true : false
                            if(isValidate){
                                setIdUser({userCollectionName: data._doc.login.email})
                                setIsLogged(true);
                            } else {
                                console.log('Usuário não encontrado')
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