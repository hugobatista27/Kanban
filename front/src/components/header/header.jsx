import '../styles/header.css';
import ThreeLine from '../../assets/images/three-line.svg';
import React, { useState, useContext } from 'react';
import Server from '../../configs/server.js'
import ProjectContext from '../../contexts/selectedProjectState';

function Header() {
	const {selectedProject, setSelectedProject} = useContext(ProjectContext)

	return (
		<div className="header">
		<EditableTitle project={selectedProject} setProjectTitle={setSelectedProject} />
		<div className="options">
			<button className="newTask">+Add new task</button>
			<button>
			<img src={ThreeLine} alt="três pontos" />
			</button>
		</div>
		</div>
	);
	}

function EditableTitle() {
	const {selectedProject, setSelectedProject} = useContext(ProjectContext);
	const [isEditing, setIsEditing] = useState(false);
	const [titleValue, setTitleValue] = useState(selectedProject ? selectedProject.projectName : "");

	const handleDoubleClick = () => {
		setIsEditing(true);
	};

	const handleBlur = () => {
		setIsEditing(false);
		if(selectedProject && titleValue !== selectedProject.projectName && titleValue !== '') {
			let newProjectTitle = {...selectedProject, projectName: titleValue}
			setSelectedProject(newProjectTitle);

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
/* 		let title = event.target.value
 */		setTitleValue(event.target.value);
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
		{selectedProject ? selectedProject.projectName : "Novo Projeto"}
		</h1>
	);
}

export default Header