import '../styles/header.css';
import ThreeLine from '../../assets/images/three-line.svg';
import { useState } from 'react';
import Server from '../../configs/server.js'

function Header({ project, setProjectTitle }) {
  return (
    <div className="header">
      <EditableTitle project={project} setProjectTitle={setProjectTitle} />
      <div className="options">
        <button className="newTask">+Add new task</button>
        <button>
          <img src={ThreeLine} alt="três pontos" />
        </button>
      </div>
    </div>
  );
}

function EditableTitle({ project, setProjectTitle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [titleValue, setTitleValue] = useState(project ? project.projectName : "");

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if(project && titleValue !== project.projectName && titleValue != '') {
        let newProjectTitle = {...project, projectName: titleValue}
        setProjectTitle(newProjectTitle);

        fetch(Server.projectChangeTitle, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newProjectTitle)
        })
    }
  };

  
  const handleInputChange = (event) => {
    let title = event.target.value
    setTitleValue(event.target.value);

  };

  if (isEditing) {
    return (
      <input
        type="text"
        value={titleValue}
        onBlur={handleBlur}
        onChange={handleInputChange}
        autoFocus
      />
    );
  }

  return (
    <h1 onDoubleClick={handleDoubleClick}>
      {project ? project.projectName : "Novo Projeto"}
    </h1>
  );
}

export default Header