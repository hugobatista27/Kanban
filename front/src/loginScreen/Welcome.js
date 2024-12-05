import './style/main.css'
import { useContext } from 'react';

import Header from "./components/header";
import BoxLogin from "./components/boxLogin";
import Slogan from './components/slogan';

import UserLogged from '../contexts/userLogged';

export default function Welcome() {
    const {isMobile} = useContext(UserLogged)

    if (!isMobile) {
        return (
            <>
                <main className='wellcome'>
                    <BoxLogin/>
                    <Slogan/>
                </main>
            </>
        )
    }

    return(
        <>
            <main className='wellcome'>
                <Slogan/>
            </main>
        </>
    )
}