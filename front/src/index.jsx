import { useState } from "react";
import App from "./App";
import Welcome from "./loginScreen/Welcome";

export default function IndexLoginScreen() {
    const [isLogged, setIsLogged] = useState(false); // alterar manualmente quando quer visualiza o app ou a tela de boas-vindas

    if (isLogged) {
        return (
            <App/>
        )
    } else {
        return (
            <Welcome/>
        )
    }
}