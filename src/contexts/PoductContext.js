import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';



export const ProductContext = createContext();

const ProductContextProvider = (props) => {
    const [product, setProduct] = useState([]);
    const [category, setcategory] = useState([]);

    const [quantity, setQuantity] = useState(JSON.parse(localStorage.getItem('setQty')) || [])
    const [price, setPrice] = useState(0)
    const [totalProduct, setTotalProduct] = useState(0)

    useEffect(() => {
        axios.get('http://localhost:5000/category')
            .then(res => {
                setcategory(res.data)
            })
    },[])

    useEffect(() => {
        axios.get('http://localhost:5000/product')
            .then(res => {
                let data = res.data
                if (data.length > 0) {
                    if (quantity.length) {
                        let prdCopy = [...data];
                        let prdPrice = 0;
                        for (let i = 0; i < quantity.length; i++) {
                            const index = data.findIndex(x => x._id === quantity[i].prdId);
                            let item = { ...prdCopy[index] };
                            item.quantity = quantity[i].prdQty;
                            prdCopy[index] = item;

                            prdPrice = prdPrice + (prdCopy[index].price * quantity[i].prdQty);
                        }
                        setProduct(prdCopy)
                        setPrice(prdPrice)
                    }
                    else {
                        setProduct(data)
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
        // eslint-disable-next-line
    }, [])


    useEffect(() => {
        return () => {
            localStorage.setItem('setQty', JSON.stringify(quantity));
            setTotalProduct(quantity.length)
            // totalPrice()

        }
    })






    function increase(id, e) {
        e = e || window.event;
        e.preventDefault();
        const index = product.findIndex(x => x._id === id);
        let prdCopy = [...product];
        let item = { ...prdCopy[index] };
        item.quantity = item.quantity + 1;
        prdCopy[index] = item;
        setProduct(prdCopy)

        const qtyIndex = quantity.findIndex(x => x.prdId === id);
        const newQuantity = quantity
        newQuantity[qtyIndex].prdQty = newQuantity[qtyIndex].prdQty + 1
        setQuantity(newQuantity)

        let prdPrice = price;
        prdPrice = prdPrice + prdCopy[index].price;
        setPrice(prdPrice)
        

    }



    function decrease(id, e) {
        e = e || window.event;
        e.preventDefault();
        const targetElement = e.target;
        const index = product.findIndex(x => x._id === id);
        const prdCopy = [...product];



        if (product[index].quantity > 1) {

            let item = { ...prdCopy[index] };
            item.quantity = item.quantity - 1;
            prdCopy[index] = item;
            setProduct(prdCopy)



            const qtyIndex = quantity.findIndex(x => x.prdId === id);
            const newQuantity = quantity
            newQuantity[qtyIndex].prdQty = newQuantity[qtyIndex].prdQty - 1
            setQuantity(newQuantity)
        }
        else if (product[index].quantity === 1) {
            const parentElement = targetElement.parentElement;
            const previousElement = parentElement.previousElementSibling;
            previousElement.style.display = "block"
            targetElement.parentElement.style.display = 'none';

            let item = { ...prdCopy[index] };
            item.quantity = item.quantity - 1;
            prdCopy[index] = item;
            setProduct(prdCopy)

            const qtyIndex = quantity.findIndex(x => x.prdId === id);
            const newQuantity = quantity
            newQuantity.splice(qtyIndex, 1)
            setQuantity(newQuantity)
        }

        let prdPrice = price;
        prdPrice = prdPrice - prdCopy[index].price;
        setPrice(prdPrice)



    }


    function add2cart(id, e) {
        e = e || window.event;
        e.preventDefault();
        const targetElement = e.target
        targetElement.style.display = 'none';
        const nextbutton = targetElement.nextElementSibling;
        nextbutton.style.display = 'block';

        const index = product.findIndex(x => x._id === id);
        let prdCopy = [...product];
        let item = { ...prdCopy[index] };
        item.quantity = item.quantity + 1;
        prdCopy[index] = item;
        setProduct(prdCopy)


        const newQuantity = quantity
        newQuantity.push(
            { prdId: id, prdQty: prdCopy[index].quantity }
        )
        setQuantity(newQuantity)

        let prdPrice = price;
        prdPrice = prdPrice + prdCopy[index].price;
        setPrice(prdPrice)


    }




    function decreaseCart(id, e) {
        e = e || window.event;
        e.preventDefault();
        const index = product.findIndex(x => x._id === id);
        const qtyIndex = quantity.findIndex(x => x.prdId === id);
        const prdCopy = [...product];

        if (product[index].quantity > 1) {
            let item = { ...prdCopy[index] };
            item.quantity = item.quantity - 1;
            prdCopy[index] = item;
            setProduct(prdCopy)

            const newQuantity = quantity
            newQuantity[qtyIndex].prdQty = newQuantity[qtyIndex].prdQty - 1
            setQuantity(newQuantity)

        }
        else {

            let item = { ...prdCopy[index] };
            item.quantity = item.quantity - 1;
            prdCopy[index] = item;
            setProduct(prdCopy)

            const newQuantity = quantity
            newQuantity.splice(qtyIndex, 1)
            setQuantity(newQuantity)

        }

        let prdPrice = price;
        prdPrice = prdPrice - prdCopy[index].price;
        setPrice(prdPrice)

    }


    return (
        <ProductContext.Provider value={{ product, increase, decrease, add2cart, decreaseCart, quantity, setQuantity, price, totalProduct, category }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider;