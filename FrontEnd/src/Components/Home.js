import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'


let initialValue = []
let reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case 'addItem':
            let existingItem = state.find(i => i.id === action.item.id);
            if (existingItem) {
                return state.map(i =>
                    i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                return [...state, { id: action.item.id, title: action.item.title, price: action.item.price, quantity: 1 }]
            }
        case 'addItem1':
            let existingItem1 = state.find(i => i.id === action.product.id);
            if (existingItem1) {
                return state.map(i =>
                    i.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                return [...state, { id: action.product.id, title: action.product.title, price: action.product.price, quantity: 1 }]
            }
        case 'remove':
            return state.filter(i => i.id !== action.item.id)

        case 'increaseQuantity':
            return state.map(i =>
                i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i
            );
        case 'decreaseQuantity':
            return state.map(i =>
                i.id === action.item.id && i.quantity > 1
                    ? { ...i, quantity: i.quantity - 1 }
                    : i
            );
        default:
            return null
    }
}

function Home() {
    let [data, setData] = useState([])
    const [show, setShow] = useState(false);
    let [product, setProduct] = useState([])
    let [cartShow, setCartShow] = useState(false)
    let [item, setItem] = useReducer(reducer, initialValue)
    let [error, setError] = useState('')
    let [loading, setLoading] = useState(true)

    const handleClose = () => setShow(false);
    let getData = async (id) => {
        console.log(id);
        
        let res = await axios.get(`http://127.0.0.1:8000/product/list/${id}/`)
        setProduct(res.data)
        console.log(res.data);
    }
    const handleShow = (id) => {
        getData(id)
        setShow(true);
    }
    useEffect(() => {
        let fetchData = async () => {
            try {
                setLoading(true)
                let response = await axios.get('http://127.0.0.1:8000/product/list/');
                setData(response.data)
            } catch (err) {
                setError(err.message || 'something went wrong')
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [])
    let handlecartcompo = () => {
        console.log("handleCart")
        setCartShow(true)
        console.log(cartShow)
    }
    let handleAlert = () => {
        Swal.fire({
            icon: "success",
            title: "Added to cart",
            showConfirmButton: false,
            timer: 1500
        });
    }
    let hnadleDeleteAlert = ({ type, item }) => {
        // console.log(type,item);
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "Want to remove this form cart!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Remove",
            cancelButtonText: "cancel",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: "success",
                    title: "Deleted",
                    text: "Item has been deleted.",
                    showConfirmButton: false,
                    timer: 1500
                });
                setItem({ type, item })
            }
        });


    }

    let totalPrice = item.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    console.log(product);
    

    if (loading) return <h4 style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>Loading.....</h4>
    if (error) return <div style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}><h3>Oops!</h3><p>{error}</p></div>
    return (
        <div>
            <div className='cart'>
                <h1>E-Commerce</h1>
                <button className='cartBtn' onClick={handlecartcompo}>View Cart</button>
            </div>
            <div className='main'>
                {data.map((item) => (
                    <div className='conn'>
                        <img src={item.image_url} />
                        <p>{item.title}</p>
                        <h5>${item.price}</h5>
                        <button className='button' onClick={() => handleShow(item.id)}>View Product</button>
                        <button className='button1' onClick={() => { setItem({ type: 'addItem', item }); handleAlert() }} >Add to Cart</button>
                    </div>
                ))}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{product.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={product.image_url} style={{ height: '200px', width: '200px', marginLeft: '130px' }} /><br />
                        {product.description}
                        <h5>${product.price}</h5>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='button1' onClick={() => { setItem({ type: 'addItem1', product }); handleAlert() }} >Add to Cart</button>
                    </Modal.Footer>
                </Modal>
                <Modal show={cartShow} onHide={() => setCartShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cart</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {item.length === 0 ? <p style={{ textAlign: 'center', color: 'gray' }}>Your Cart is empty</p> :
                            <ol>
                                {item.map(item => (
                                    <li>
                                        <div className='addedCart'>
                                            <h5 className='grid-item'>{item.title}</h5>
                                            <h5 className='grid-item'> ${item.price}</h5>
                                            <div className='grid-item' style={{ display: 'flex' }}>
                                                <button onClick={() => { setItem({ type: 'decreaseQuantity', item }) }} style={{ height: "30px", border: 'none', borderRadius: "5px" }}>-</button>
                                                <h6 style={{ border: "1px solid gray", margin: "1px", padding: '2px 5px', borderRadius: "5px", height: "30px" }}>{item.quantity}</h6>
                                                <button onClick={() => { setItem({ type: 'increaseQuantity', item }) }} style={{ height: "30px", border: 'none', borderRadius: "5px" }}>+</button>
                                            </div>
                                            <button className='grid-item' onClick={() => hnadleDeleteAlert({ type: 'remove', item })} style={{ backgroundColor: 'red', border: 'none', color: 'white', borderRadius: '5px', height: '30px' }}><i class="bi bi-trash-fill"></i></button>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <div >
                            <h5>Total Price: ${totalPrice.toFixed(2)}</h5>
                            <button className='button1' >Buy</button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default Home
