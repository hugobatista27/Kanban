import { useState } from "react";

export default function InputArea({tag, content, setNewContent}) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(content)
    const Tag = tag

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const verificarTexto = (text) => {
        if (text && text !== content) {
            setNewContent(text)
        }
    }

    const handleBlur = () => {
        verificarTexto(text)
        
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
