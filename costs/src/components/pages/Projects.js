import styles from './Projects.module.css'

import {useLocation} from 'react-router-dom'
import Message from "../layout/Message";
import Container from '../layout/Container';
import Loading from '../layout/Loading';
import LinkButton from '../layout/LinkButton';
import ProjectCard from '../project/ProjectCard';
import { useState, useEffect } from 'react';

function Projects(){

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(
            () => {
                fetch('http://localhost:5000/project', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setProjects(data)
            setRemoveLoading(true)
        })
        .catch((err) => console.log(err))
            }, 300)
    }, [])

    function removeProject(id){
        fetch(`http://localhost:5000/project/${id}`,{
            method: "DELETE",
            headers:{
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json())
        .then(data => {
            setProjects(projects.filter((project) => project.id !== id))
            // message
        })
          .catch(err => console.log(err))
    }

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newprojects" text="Criar Projeto" />
            </div>
            {message &&  <Message type="success" msg={message}  />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard name={project.name} 
                        id={project.id} 
                        budget={project.budget} 
                        category={project.category?.name || 'Categoria Desconhecida'} 
                        key={project.id} 
                         />
                    ))}
                    {!removeLoading && <Loading />}
                    {removeLoading && projects.length === 0 &&(
                        <p>Não há projetos cadastrados!</p>
                    )}
            </Container>
        </div>
    )
}

export default Projects;