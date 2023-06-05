import { useState } from "react";
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

    return (
        <UserLogged.Provider value={contextValues}>
            {isLogged ? <App/> : <Welcome/>}
        </UserLogged.Provider>
    )
}