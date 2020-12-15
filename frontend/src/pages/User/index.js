/*import React, {useState, useEffect} from 'react'
import api from '../../services/api'
import {Link} from "react-router-dom"
import Button from 'react-bootstrap/Button'

export default function User(){
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        api.get('users').then(response =>{
            setUsers(response.data);
        })
    }, [])
    
    async function handleDelete(id){
        try{
            await api.delete(`/users/${id}`)
            setUsers(users.filter(user=>user.id != id))
        } catch{
            alert('erro')
        }
    }

    return(
        <div id="user-container">
            <Button color="danger">teste</Button>
            <h1>Lista de usuários</h1>
            <Link className="button" id="create-link" to={"/create"}>Criar</Link>
            <ul className="user-list">
                {users.map(user => (
                    <li key={user.id}>
                        <strong>Nome</strong>
                        <p>{user.name}</p>
                        <strong>Email</strong>
                        <p>{user.email}</p>
                        <strong>Idade</strong>
                        <p>{user.idade}</p>
                        <strong>Empresa</strong>
                        <p>{user.empresa}</p>

                        <div className="actions">
                            <button type="button" onClick={()=>handleDelete(user.id)} className="button">Deletar</button>
                            <Link className="button" to={`/update/${user.id}`}>Acessar</Link>
                        </div>
                    </li>
                ))}

            </ul>
        </div>
    );
}*/