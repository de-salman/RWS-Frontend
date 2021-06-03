import { Container, Row, Card, Col } from "react-bootstrap"

import { useContext } from 'react';
import { ProductContext } from '../contexts/PoductContext';


const ProductCard = () => {


    const { product, increase, decrease, add2cart } = useContext(ProductContext)

    return product.length ? (
        <Container className="product-cards container">
            <Row xs={2} md={3}>
                {product.map(prd => {
                    return (
                        <Col key={prd._id}>
                            <Card className="prd-card">
                                <Card.Img variant="top" className="prd-img" src={'http://localhost:5000/product-image/'+ prd._id +'.jpg'} />
                                <Card.Body>
                                    <div className="card-title">
                                        <Card.Title>{prd.productName}</Card.Title>
                                        <Card.Title>{prd.price}</Card.Title>
                                    </div>
                                    {prd.quantity > 0 ?
                                        <div className="main">
                                            <div className="F8dpS zj0R0 _3L1X9">
                                                <div style={{ display: "none" }} className="_1RPOp _1uN_a" onClick={add2cart} >ADD</div>
                                                <div >
                                                    <div className="_1ds9T _2WdfZ _4aKW6" onClick={() => increase(prd._id)}>+</div>
                                                    <div className="_29Y5Z _20vNm _4aKW6" onClick={() => decrease(prd._id)}></div>
                                                    <div className="_2zAXs _2quy- _4aKW6">{prd.quantity}</div>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className="main">
                                            <div className="F8dpS zj0R0 _3L1X9">
                                                <div className="_1RPOp _1uN_a" onClick={() => add2cart(prd._id)} >ADD</div>
                                                <div style={{ display: "none" }}>
                                                    <div className="_1ds9T _2WdfZ _4aKW6" onClick={() => increase(prd._id)}>+</div>
                                                    <div className="_29Y5Z _20vNm _4aKW6" onClick={() => decrease(prd._id)}></div>
                                                    <div className="_2zAXs _2quy- _4aKW6">{prd.quantity}</div>
                                                </div>
                                            </div>
                                        </div>
                                    }

                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    ) : (
        <div className="empty">There Is No Product Currently In Stock</div>
    )
}

export default ProductCard;