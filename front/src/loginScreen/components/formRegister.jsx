import Logo from '../../assets/images/Vectorlogo.svg';
import UserLogged from '../../contexts/userLogged';
import { Routes } from '../../configs/userRoutes.js'
import { useState, useEffect, useContext} from 'react';
import { createNewProject } from '../../components/sideBar/optionsSideBar';

export async function checkInfoUser(infoType, infoValue) {
    let error = null
    const reqUserInfo = {
        userName: infoType === 'userName' ? infoValue : null,
        email: infoType === 'email' ? infoValue : null
    }

    if(!infoValue){
        error = 'empty'
        return error
    } else {
        return fetch(Routes.validateUser, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqUserInfo)
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Erro na requisição. Código de status: ' + res.status);
            }
            return res.json();
        })
        .then((data) => {
            if(data.find == false){
                return 'sucess'
            } else {
                return 'inUse'
            }
        })
    }
}

export function Register({setIsRegistered}) {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formErrors, setFormErrors] = useState('');
    const [instructions, setInstructions] = useState({})

    const {idUser, setIdUser, setIsLogged} = useContext(UserLogged);

    const instructionsMessage = (objErrors, key) => {
        switch (objErrors[key]) {
            case 'sucess':
                return '';
            case 'empty':
                return 'Campo obrigatório. Por favor, preencha-o.';
            case 'inUse':
                return `Existe um usuário utilizando este ${key == 'userName' ? 'Nome' : 'Email'}`;
            case 'different':
                return 'As senhas não coincidem. Por favor, tente novamente.'
            default:
                break;
        }
    }

    useEffect(() => {
        setInstructions({
            userName: instructionsMessage(formErrors, 'userName'),
            email: instructionsMessage(formErrors, 'email'),
            password: instructionsMessage(formErrors, 'password'),
            confirmPassword: instructionsMessage(formErrors, 'confirmPassword')
        })
    }, [formErrors])

    const classNameStatus = (value) => {
        return value ? value === 'sucess' ? 'borderColorSucess' : 'borderColorNotSucess' : ''
    }

    const makeRegister = async() => {
        let errors = {
            userName: await checkInfoUser('userName', userName), 
            email: await checkInfoUser('email', userEmail)
        };
        
        errors.confirmPassword = !confirmPassword ? 'empty' : userPassword !== confirmPassword ? 'different' : 'sucess'
        errors.password = !userPassword ? 'empty' : errors.confirmPassword === 'sucess' ? 'sucess' : '';

        if (Object.values(errors).filter(error => error === 'sucess').length != Object.values(errors).length) {
            return errors
        } else {
            const newUserInfo = {
                userName: userName,
                login: {
                    email: userEmail,
                    password: userPassword
                }
            }
    
            return fetch(Routes.registerUser, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUserInfo)
            }).then((res) => {
                return 'registered'
            })
        }
    }

    return (
        <div className='positionBoxLogin'>
            <div id='boxLogin'>
                <div className='logo'>
                    <img src={Logo} alt="logo" />
                    <h2>Novo no Kanban?</h2>
                </div>
                <div className='formRegister'>
                    <label htmlFor="registerName">
                        Nome de Usuário
                        <input
                            id='registerName'
                            type="text"
                            placeholder='Nome de Usuário'
                            className={classNameStatus(formErrors.userName)}
                            onInput={(event) => {
                                setUserName(event.currentTarget.value)
                            }}
                        />
                        {formErrors && (
                            <p>
                                {instructions.userName}
                            </p>
                        )}
                    </label>
                    <label htmlFor="registeEmail">
                        Email
                        <input
                            id='registeEmail'
                            type="text"
                            placeholder='Email'
                            className={classNameStatus(formErrors.email)}
                            onInput={(event) => {
                                setUserEmail(event.currentTarget.value)
                            }}
                        />
                        {formErrors && (
                            <p>
                                {instructions.email}
                            </p>
                        )}
                    </label>
                    <label htmlFor="registerPassword">
                        Senha
                        <input
                            id='registerPassword'
                            type="password"
                            placeholder='Senha'
                            className={classNameStatus(formErrors.password)}
                            onInput={(event) => {
                                setUserPassword(event.currentTarget.value)
                            }}
                        />
                        {formErrors && (
                            <p>
                                {instructions.password}
                            </p>
                        )}
                    </label>
                    <label htmlFor="registerConfirmPassword">
                        Confirme a senha
                        <input
                            id='registerConfirmPassword'
                            type="password"
                            placeholder='Repita a Senha'
                            className={classNameStatus(formErrors.confirmPassword)}
                            onInput={(event) => {
                                setConfirmPassword(event.currentTarget.value)
                            }}
                        />
                        {formErrors && (
                            <p>
                                {instructions.confirmPassword}
                            </p>
                        )}
                    </label>
                    <button
                        onClick={ async () => {
                            let resultRegister = await makeRegister();
                            if(resultRegister === 'registered') {
                                setIdUser(userEmail)
                                setIsLogged(true)
                                createNewProject('New Project', idUser)
                            } else {
                                setFormErrors(resultRegister)
                            }
                        }}>
                        Registrar
                    </button>
                </div>
                <div className='registerLink'>
                    <p>Já possui uma conta?</p>
                    <button
                        onClick={() => setIsRegistered(true)}>
                        Entrar
                    </button>
                </div>
            </div>
        </div>
    )
}
