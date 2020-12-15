import React, {useState, useEffect}  from 'react'
import api from '../../services/api'
import { Container, Row, Col, Carousel, Card, Button, Image } from 'react-bootstrap'
import {useParams} from "react-router-dom"
import './style.css'

export default function Produto(){
    const {id} = useParams()
    const [produto, setProduto] = useState([])
    useEffect(()=>{
        if(id){
            api.get(`produtos/${id}`).then(response=>{
                setProduto(response.data)
            })
        }
    }, [])
    console.log(produto)
    //id_user = 57333a64

    async function addProduto(id_produto){
        api.post('sacolas', {"id_user": "57333a64", "id_produto":id_produto})
    }

    
    return(
        
        <Container fluid>
            {produto.map(prod => (
                <Row>
                    <Col>
                        <h1 className="text-capitalize product-title" color="black">{prod.name}</h1>
                    </Col>
                </Row>
            ))}
                <Row>
                {produto.map(prod => (
                    <Col>
                        <Image src={prod.imgD} rounded></Image>
                    </Col>
                ))}
                {produto.map(prod => (
                    <Col>
                        <Row ><Col className="produto-valor">Preço: R$ {prod.valor}</Col></Row>
                        <Row ><Col className="produto-det"><Button variant="secondary" onClick={()=>addProduto(prod.id)}>Adicionar à Cesta</Button></Col></Row>
                    </Col>
                ))}
                </Row>
            
                <Row>
                    <Col>
                        <h2 className="text-capitalize product-title" color="black">Descrição</h2>
                    </Col>
                </Row>

                <Row>
                    {produto.map(prod => (
                    <Col><p>{prod.descricao}</p></Col>    
                    ))}
                </Row>
            
        </Container>
    );
}