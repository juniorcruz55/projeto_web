import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'


export default function Footer(props){
    return (

        <footer className="footer mt-5">
            <Container>
                <Row>
                    <Col>
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fringilla aliquet est nec aliquet. 
                                Cras convallis ultrices sem, id cursus tellus varius. </p>
                            <div className="justify-content-center">
                                <FontAwesomeIcon className="icones-footer" icon={faFacebook} />
                                <FontAwesomeIcon className="icones-footer" icon={faInstagram}/>
                                <FontAwesomeIcon className="icones-footer" icon={faTwitter}/>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}