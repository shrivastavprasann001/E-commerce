import React, { useContext } from "react";
import "./CartItem.css";
import remove_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom";
 import {loadStripe} from '@stripe/stripe-js';
// import carts from '../Assets/all_product';
import axios from 'axios';
const CartItem = () => {
  const { getTotalCartAmount, all_product, cartItem, removeaddToCart } = useContext(ShopContext);

  // const carts = [
  //   {
  //     name: "Product 1",
  //     price: 29.99,
  //     quantity: 3
  //   },
  //   {
  //     name: "Product 2",
  //     price: 49.99,
  //     quantity: 5
  //   },
  //   {
  //     name: "Product 3",
  //     price: 19.99,
  //     quantity: 2
  //   }
  // ];
  
  // // Example usage:
  // console.log(carts);
  
  // payment intergection

  // const makePayment = async () => {
  //   const stripe = await loadStripe("pk_test_51PAVq2SAtSBHIsrzk80oszvp7IUtIWNCruS1o9hfzrc9bG9goUiOt5xkN0mqTB7tHob8rzFqxkmH8HjK3GCxmVcu00E9qE2Z0D");

  //   const body = {
  //     products: carts
  //   }
  //   const headers = {
  //     "Content-Type": "application/json"
  //   }
  //   const response = await fetch("http://localhost:4000/api/create-checkout-session", {
  //     method: "POST",
  //     headers: headers,
  //     body: JSON.stringify(body)
  //   });

  //   const session = await response.json();

  //   const result = stripe.redirectToCheckout({
  //     sessionId: session.id
  //   });

  //   if (result.error) {
  //     console.log(result.error);
  //   }
  // }

  const buyfunction = async () =>{

    let response = await axios.post('http://localhost:4000/payment')

    if(response && response.status === 200 ){

      window.location.href = response.data.url
      
      console.log(response.data)}
  }


  return (
    <div >
      <div className="cartitem">
        <div className="cart-format-main">
          <p>Product</p>
          <p>Title</p>
          <p className="prices-para">Prices</p>
          <p>Quantify</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e,i) => {
          if (cartItem[e.id] > 0) {
            return (
              <div>
                <div className="cartitem-format cart-format-main">
                  <img src={e.image} key={i.e} alt="" className="carticon-product-icon " />
                  <p>{e.name}</p>
                  <p>₹{e.new_price}</p>
                  <button className="cartim-button">{cartItem[e.id]}</button>
                  <p className="total-prices-para">{e.new_price * cartItem[e.id]}</p>
                  <img className='cart-remove-icon' src={remove_icon} onClick={() => removeaddToCart(e.id)} alt="" />
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
        <div className="cartitem-down">
          <div className="cartitem-total">
            <h1>cart Totals</h1>
            <div>
              <div className="cartitem-total-item">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cartitem-total-item">
                <p>Shipping Fee </p>
                <p>Free</p>
              </div>
              <hr />
              <div className="cartitem-total-item">
                <h3>Total</h3>
                <h3>₹{getTotalCartAmount()}</h3>
              </div>
            </div>
            <button onClick={buyfunction} > CHECKOUT</button>
          </div>
          <div className="cartitem-promocode">
            <p>I You have a promo code,Enter it here</p>
            <div className="cartitem-promobox">
              <input type="text" placeholder="promo code" />
              <button className="input-button">Submit</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1>hello</h1>
      </div>
    </div>
  );
};

export default CartItem;
