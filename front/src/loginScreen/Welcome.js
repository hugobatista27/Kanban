import './style/main.css'
import Header from "./components/header";
import BoxLogin from "./components/boxLogin";
import Slogan from './components/slogan';

export default function Welcome() {
    return (
        <>
            <Header/>
            <main className='wellcome'>
                <BoxLogin/>
                <Slogan/>
            </main>
        </>
    )
}