import './style/main.css'
import { useContext } from 'react';

import Header from "./components/header";
import BoxLogin from "./components/boxLogin";
import Slogan from './components/slogan';

import UserLogged from '../contexts/userLogged';

export default function Welcome() {
    const {isMobile} = useContext(UserLogged)
    return (
        <>
            <Header/>
            {!isMobile && (
                <main className='wellcome'>
                    <BoxLogin/>
                    <Slogan/>
                </main>
            )}
        </>
    )
}