import React, {useState, useEffect}  from 'react'
import api from '../../services/api'
import {useHistory} from "react-router-dom"
import { Container, Row, Col, Button, Form, InputGroup, FormControl } from 'react-bootstrap'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

export default function Header(props){
    const [sacola, setSacola] = useState([])
    const [itens, setItem] = useState([])
    const history = useHistory()

    useEffect(()=>{
        api.get("sacolas/57333a64").then(response =>{
            var sacola_itens = [];
            setSacola(response.data);
            //console.log(response.data)
            response.data.forEach(function(item){
                sacola_itens.push({
                    "id_pedido": "",
                    "id_produto": item.id_produto,
                    "name": item.name,
                    "valor": item.valor,
                    "quantidade": 1
                })
            })
            setItem(sacola_itens)
            //console.log(sacola_itens)
        })
        
    }, [])
    //id_user = 57333a64
    
    var id_pedido = ''

    const initPedido = {
        id: '',
        id_user: '57333a64',
        endereco_entrega: '',
        status: 'criado'
    }

    const [pedido, setPedido] = useState(initPedido)

    useEffect(()=>{
        api.get("/pedidos", pedido).then(response =>{
            var jaTem = "false"
            response.data.forEach(function(item){
                if (item.status == "criado"){
                    jaTem = "true"
                }
            })
            if(jaTem == "true"){
                
                setPedido(response.data)
            } else {
                api.post("/pedidos", pedido).then(response =>{
                    console.log(response)
                })
                console.log('novo')
            }
            
        })
        
    }, [])

    function onChangeEndereco(ev){
        const {name, value} = ev.target;
        setPedido({...pedido, [name]:value})
    }

    /*function add(ev){
        const name = ev.target.name
        
        itens.forEach(function(item){
            if (item.id_produto == name){
                item.quantidade = item.quantidade + 1
                console.log(item.quantidade)
            }
        })

        setItem(itens)
    }

    function remove(ev){
        const name = ev.target.name
        
        itens.forEach(function(item){
            if (item.id_produto == name && item.quantidade > 1){
                item.quantidade = item.quantidade - 1
                console.log(item.quantidade)
            }
        })
    }*/

    function onSubmit(ev){
        ev.preventDefault()
        
        if (pedido.endereco_entrega != ''){

            api.get("/pedidos", pedido).then(response =>{
                setPedido(response.data)
                const realizar = "true"
                api.put(`/pedidos/${pedido[0].id}`, {realizar})
                itens.forEach(function(item){
                    item.id_pedido = pedido[0].id
                    api.post(`/pedidos/${item.id_pedido}`, item)
                })
                api.delete(`/sacolas/57333a64`)
                history.push('/')
            })
            
        } else{
            alert('Preencha o campo de entrega')
        }
    }


    return (
        <Container fluid>
            <h2> Finalizar Compra </h2>
            <br/>
            <br/>
            <Form onSubmit={onSubmit}>
                <Row>
                    <Col className="formGroup">
                        <h4>Detalhes do Pedido</h4>
                        <br/>
                        {itens.map(item => (
                            <Form.Group>
                                <Row key={item.id_produto}>
                                    <Col xs={6} className="form-label">
                                        <Form.Label>{item.name} - R$ {item.valor} </Form.Label>
                                    </Col>
                                    
                                </Row>
                            </Form.Group>
                        ))}
                        <br/>
                        <h4>Local de Entrega</h4>
                        <Form.Group controlId="formGroupLocalEntrega">
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control onChange={onChangeEndereco} value={pedido.endereco_entrega} type="text" name="endereco_entrega" placeholder="Bairro, Rua, nº..." />
                        </Form.Group>
                        <br/>
                        <h4>Pagamento</h4>
                        <br/>
                        <p>(Detalhes do pagamento)</p>
                    </Col>
                    <Col>
                        
                    </Col>
                </Row>
                <Row>
                    <Col xs={4}></Col>
                    <Col xs={2}>
                            <Button type="submit" block>Finalizar Compra</Button>
                    </Col>
                </Row>
                
            </Form>
        </Container>
    )
}

/**
 * <Col xs={2}><Form.Control size="sm" type="number" value={item.quantidade}></Form.Control></Col>
    <Col xs={2}>
        <Button variant="outline-secondary" name={item.id_produto} onClick={remove}  size="sm" block> - </Button>
    </Col>
    <Col xs={2}>
        <Button variant="outline-secondary" name={item.id_produto} onClick={add} size="sm" block> + </Button>
    </Col>
*/