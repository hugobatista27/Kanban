import { useState, useEffect } from "react";
import App from "./App";
import Welcome from "./loginScreen/Welcome";
import UserLogged from "./contexts/userLogged";

export default function IndexLoginScreen() {
    const [isLogged, setIsLogged] = useState(false); // alterar manualmente quando quer visualiza o app ou a tela de boas-vindas
    const [idUser, setIdUser] = useState(null);

    const [isMobile, setIsMobile] = useState(null);

    const contextValues = {
        isLogged, setIsLogged,
        idUser, setIdUser,
        isMobile, setIsMobile
    }

    useEffect(() => {
        var windowWidth = document.body.clientWidth;
        if (windowWidth > 600) {
            setIsMobile(false)
        } else {
            setIsMobile(true)
        }
    }, [])

    window.addEventListener("resize", () => {
        var windowWidth = document.body.clientWidth;
        
        if (windowWidth < 600) {
            setIsMobile(true)
        } 
        if (windowWidth >= 600) {
            setIsMobile(false)
        }
    })


    return (
        <UserLogged.Provider value={contextValues}>
            {isLogged ? <App/> : <Welcome/>}
        </UserLogged.Provider>
    )
}