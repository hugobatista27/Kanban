import { useState } from "react";

const paragrafo = "Descrição Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel explicabo voluptatum ipsa velit cupiditate nobis inventore, odit voluptatibus tempora temporibus, vitae ducimus quam eveniet! Et iure quidem ipsa possimus recusandae."

export default function InputArea({tag, paramText, setNewContent}) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(paramText)
    const Tag = tag

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const verificarTexto = (texto) => {
        if (texto) {
            setText()
        }
    }

    const handleBlur = () => {
        setNewContent(text)
        setIsEditing(false)
    }

    if(isEditing) {
        document.addEventListener('keydown', (event) => {
            if (event.key === "Enter") {
                setIsEditing(false)
            }
        })

        return(
            <input
                type="text"
                onBlur={handleBlur}
                onChange={(event) => setText(event.target.value)}
                autoFocus
            ></input>
        )
        
    } 

    return (
        <div>
            
            <Tag onDoubleClick={handleDoubleClick}>{text}</Tag>
        </div>
    )
}
