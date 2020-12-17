import React, {useState, useEffect} from 'react'
import api from '../../services/api'
import { Nav, Navbar, NavDropdown, OverlayTrigger, Popover, Button, Row, Col} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faCut } from '@fortawesome/free-solid-svg-icons'


export default function Header(props){
    const [sacola, setSacola] = useState([])

    useEffect(()=>{
        api.get("sacolas/57333a64").then(response =>{
            setSacola(response.data);
        })
    }, [])
    //id_user = 57333a64

    async function remove_one(id){
        try{
            await api.delete(`/sacolas/57333a64/${id}`)
            setSacola(sacola.filter(item=>item.id_produto != id))
        } catch{
            alert('erro')
        }
    }

    async function remove_all(){
        try{
            await api.delete(`/sacolas/57333a64`)
            setSacola([])
        } catch{
            alert('erro')
        }
    }

    async function show_cesta(){
        try{
            await api.get("sacolas/57333a64").then(response =>{
                setSacola(response.data);
            })
        } catch{
            alert('erro')
        }
    }


    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Cesta</Popover.Title>
            <Popover.Content>
                <p>Você tem {sacola.length} produto(s) na cesta:</p>
                {sacola.map(item => (
                    <Row>
                        <Col key={item.id_produto}>
                            {item.name} - R$ {item.valor} <Button variant="default" onClick={()=>remove_one(item.id_produto)} size="xs"><FontAwesomeIcon icon={faCut}/></Button> 
                        </Col>
                    </Row>
                ))}
                <p> <Button variant="secondary" onClick={remove_all} size="sm">Limpar Cesta</Button> <Button href="/finalizar-pedido" variant="secondary" size="sm"> Finalizar </Button> </p>
                    
               
          </Popover.Content>
        </Popover>
    );

    return (
        <header id="main-header">

            <Navbar bg="light" expand="sm" className="navbar">
                <Navbar.Brand href="/">Real Flores</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link className="nav-link" href="/">Home</Nav.Link>
                        <NavDropdown title="Tipos de Flores" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Rosas</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Orquídeas</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Item className="cesta-icon">
                            <OverlayTrigger trigger="click" onEntering={show_cesta} placement="bottom" overlay={popover}>
                                <Button variant="default"><FontAwesomeIcon icon={faShoppingBasket}/></Button>
                            </OverlayTrigger>
                        </Nav.Item>
                        
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <h1>{props.title}</h1>
        </header>
    );
}