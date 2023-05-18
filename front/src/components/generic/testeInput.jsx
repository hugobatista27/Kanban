import { useState } from "react";

export default function InputArea({tag, content, setNewContent}) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(content);
    const Tag = tag;

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
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        setText(event.target.value)
                        handleBlur()
                        setIsEditing(false)
                    }
                }}
                autoFocus
                className="changeText"
                value={text}
            ></input>
        )
    } 

    return (
        <>
            <Tag onDoubleClick={handleDoubleClick}>{text}</Tag>
        </>
    )
}
