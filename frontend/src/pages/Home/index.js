import React, {useState, useEffect}  from 'react'
import api from '../../services/api'
import {Link} from "react-router-dom"
import { Container, Row, Col, Carousel, Card, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './style.css'

export default function Home(){
    const [produtos, setPordutos] = useState([])
    useEffect(()=>{
        api.get('produtos').then(response =>{
            setPordutos(response.data);
        })
    }, [])
    //id_user = 57333a64

    async function addProduto(id_produto){
        api.post('sacolas', {"id_user": "57333a64", "id_produto":id_produto})
    }

    console.log(produtos)
    return(
        <Container fluid>
            <Row>
                <Col>
                    <Carousel className="carousel">
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="/img/buque_rosas_brancas.jpg"
                            alt="First slide"
                             />
                            <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="/img/buque_rosas_vermelhas.jpg"
                            alt="Third slide"
                             />

                            <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="img/arranjo_flores_diversas.jpeg"
                            alt="Third slide"
                             />

                            <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 className="text-capitalize product-title" color="black">Produtos</h1>
                </Col>
            </Row>
            
            <Row className="product-items">
                {produtos.map(produto => (
                    <Col xs={3} className="product-item" key={produto.id}>
                        <Card className="single-item" >
                            <Card.Img variant="top" src={produto.img} className="img-container card-img-top product-img"/>
                            <Card.Body>
                                <Card.Title><Link className="button-link" to={`/produtos/${produto.id}`}>{produto.name}</Link></Card.Title>
                                <Card.Text className="d-flex justify-content-between text-capitalize">
                                    R$ {produto.valor}
                                    <Button variant="default" onClick={()=>addProduto(produto.id)}><FontAwesomeIcon icon={faPlus}/></Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            
        </Container>
    );
}