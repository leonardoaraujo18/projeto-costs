import { useNavigate } from 'react-router-dom';

import ProjectForm from '../project/ProjectForm';
import styles from './NewProjects.module.css'

function NewProjects(){

    const navigate = useNavigate()

    function createPost(project){
        // initialize cost and service
        project.cost = 0
        project.services = []

        fetch("http://localhost:5000/project", {
            method: "POST",
            headers: {
                'Content-type': "application/json",
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            // redirect
            navigate('/projects', {state: {message: 'Projeto criado com sucesso!'}})
        })
        .catch((err) => console.log(err))
    }

    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )
}

export default NewProjects;