
import { useContext, useState } from 'react';
import { ProductContext } from '../contexts/PoductContext';

import { Form, Col } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
library.add(faTimes);




const Cart = () => {

    
    const { product, increase, decreaseCart, quantity, price } = useContext(ProductContext)
    var message = encodeURIComponent('*Hello,*')
    const [cname, setCname] = useState('')
    const [caddress, setCaddress] = useState('')

    function getLinkWhastapp() {
        var url = 'https://api.whatsapp.com/send?phone='
            + +917902569611
            + '&text='
            + message
            + "%0a" + encodeURIComponent("*Total : ") + encodeURIComponent(price + '*')
            + '%0D%0A%0D%0A' + encodeURIComponent(cname)
            + "%0a" + encodeURIComponent(caddress)

        return url
    }

    return (
        <div className="container">
            <div className="cart-wrapper-area py-3">
                <div className="cart-table card mb-3">
                    <div className="table-responsive card-body">
                        <table className="table mb-0">
                            <tbody>
                                {product.map(prd => {
                                    const index = quantity.findIndex(x => x.prdId === prd._id);
                                    if (prd.quantity > 0) {
                                        message = message + "%0a" + encodeURIComponent(prd.productName + ' x ' + prd.quantity + ' = ' + prd.price * prd.quantity)
                                        return (
                                            <tr key={prd._id}>
                                                <th scope="row"><span className="remove-product" ><FontAwesomeIcon icon="times" /></span></th>
                                                <td><img src={'http://localhost:5000/product-image/' + prd._id + '.jpg'} alt={prd._id} /></td>
                                                <td><a href="single-product.html">{prd.productName}<span>${prd.price}</span></a></td>
                                                <td>
                                                    <div className="quantity">
                                                        <div className="main">
                                                            <div className="F8dpS zj0R0 _3L1X9">
                                                                <div>
                                                                    <div className="_1ds9T _2WdfZ _4aKW6" onClick={() => increase(prd._id)}>+</div>
                                                                    <div className="_29Y5Z _20vNm _4aKW6" onClick={() => decreaseCart(prd._id)}></div>
                                                                    <div className="_2zAXs _2quy- _4aKW6">{quantity[index].prdQty}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    else {
                                        return null
                                    }
                                }
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card coupon-card mb-3">
                    <div className="card-body">
                        <Form>
                            <Form.Row>
                                <Col md={5} xs={12}>
                                    <Form.Control className="cname" onChange={event => setCname(event.target.value)} placeholder="Name" />
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col md={10} xs={12}>
                                    <Form.Control className="caddress" onChange={e => setCaddress(e.target.value)} placeholder="Address" />
                                </Col>
                            </Form.Row>
                        </Form>
                    </div>
                </div>
                <div className="card cart-amount-area">
                    <div className="card-body d-flex align-items-center justify-content-between">
                        <h5 className="total-price mb-0" >$<span className="counter">{price}</span></h5><button className="btn btn-warning"
                            onClick={(e) => {
                                if(cname==="" || caddress===""){
                                    alert('Please fill your Name and Address')
                                }
                                else {
                                    e.preventDefault();
                                    window.location.href = getLinkWhastapp()
                                }
                            }}>Checkout Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;