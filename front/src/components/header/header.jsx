import ThreeLine from '../../assets/images/three-line.svg';
import Logo from '../../assets/images/Vectorlogo.svg'
import React, { useState, useContext, useRef, useEffect } from 'react';
import Server from '../../configs/server.js'
import ProjectContext from '../../contexts/selectedProjectState';
import UserLogged from '../../contexts/userLogged';
import MenuOptions from './menuOptions';
import { useClickOutside } from '../generic/useClickOutside';

function Header() {
	const {selectedProject, setSelectedProject, setAtualizarFetchTasks, isMobile, showSideBar} = useContext(ProjectContext);
	const {idUser} = useContext(UserLogged)

	const [showMenuOptions, setShowMenuOptions] = useState(false) 
	const refMenuOptions = useRef(null)

	const newProject = () => {
		const modelNewTask = {
			//userCollectionName: 

			id: selectedProject._id,
			newTask: {
				taskName: "Título",
				description: "Descrição",
				idStatus: 1,
				subtasks: []
			}
		}
	
		fetch(Server.newTask, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({...modelNewTask, ...idUser})
		}).then(() => {
			setAtualizarFetchTasks(Math.random() * Math.random())
		})
	}

	useClickOutside(refMenuOptions, () => {
        setShowMenuOptions(false);
    })

	return (
		<div className="header">
			<div className='boxLogoMobile'>
				{!showSideBar && (
					<img src={Logo}></img>
				)}
				<EditableTitle project={selectedProject} setProjectTitle={setSelectedProject} />	
			</div>
			<div className="options">
				<button 
					className="newTask"
					onClick={newProject}>
					{isMobile ? '+' : '+Add new task'}
				</button>
				<div className='containerMenuOptions'>
					<button 
						onClick={() => {
							showMenuOptions ? setShowMenuOptions(false) : setShowMenuOptions(true)
							
						}}>
						<img src={ThreeLine} alt="options" />
					</button>
					<div ref={refMenuOptions} className={showMenuOptions ? 'menuOptions' : 'd-none'}>
						<MenuOptions/>
					</div>
				</div>
			</div>
		</div>
	)}

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
		/>);
	}

	return (
		<h1 onDoubleClick={handleDoubleClick}>
		{selectedProject ? selectedProject.projectName : "Novo Projeto"}
		</h1>
	);
}

export default Header