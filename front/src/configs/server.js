const adress = "https://kanban-api-74tx.vercel.app";

const Server = {
    allProjects: `${adress}/allProjects`,
    projectNames: `${adress}/projectsName`,
    selectProjectById: `${adress}/project/`,
    projectChangeTitle: `${adress}/project/change-title`,
    updateTask: `${adress}/project/change-task`,
    newProject: `${adress}/new-project`,
    newTask: `${adress}/project/new-task`,
    deleteProject: `${adress}/delete/`,
    deleteTask: `${adress}/delete/task/`
}

export default Server
