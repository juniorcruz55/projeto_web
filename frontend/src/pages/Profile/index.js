/*import React, {useState, useEffect} from 'react'
import api from '../../services/api'
import {Link, useHistory, useParams} from "react-router-dom"
import './style.css'


export default function Profile(){
    const {id} = useParams()
    const history = useHistory()

    useEffect(()=>{
        if(id){
            api.get(`users/${id}`).then(response=>{
                setUser(...response.data)
            })
        }
    }, [])

    const initUser = {
        name: '',
        email: '',
        idade: '',
        empresa: ''
    }

    const [user, setUser] = useState(initUser)

    function onSubmit(ev){
        ev.preventDefault()
        const method = id ? 'put' : 'post'
        const url = id ? `/users/${id}` : '/users'
        api[method](url, user).then((response)=>{
            history.push('/')
        })
    }

    function onChange(ev){
        const {name, value} = ev.target;
        setUser({...user, [name]:value})
    }

    return(
        <div id="profile-container">
            <h1>Cadastro</h1>
            <form onSubmit={onSubmit}>
                <strong>Nome:</strong>
                <input name="name"  onChange={onChange} value={user.name} />
                <strong>Email:</strong>
                <input name="email" onChange={onChange} value={user.email} />
                <strong>Idade:</strong>
                <input name="idade" onChange={onChange} value={user.idade} />
                <strong>Empresa:</strong>
                <input name="empresa" onChange={onChange} value={user.empresa} />
                <div className="actions">
                    <Link className="button" onClick={() => history.push('/')}>Voltar</Link>
                    <button type="submit" className="button">Salvar</button>
                </div>
            </form>
        </div>
    )
}*/