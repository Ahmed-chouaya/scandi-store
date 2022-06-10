import React, { Component } from 'react'
import { Context } from '../Context'
import CartItem from './CartItem'

export default class Cart extends Component {
  render() {
      const tax = (this.context.cartTotalAmount * 21 / 100).toFixed(2)
      const total = (this.context.cartTotalAmount + this.context.cartTotalAmount * 21/100).toFixed(2)
    return (
      this.context.cartTotalQty !== 0 ? <div>
          <h1 className='cart-name'>Cart</h1>
          <div className="cart-page">
              {this.context.cartItem.map(item => item.cartQty !== 0 && <CartItem item={item} key={item.id}/>)}
              <hr />
              <div className='order'>
                <h1 className='tax'>Tax 21%: <b>{this.context.currencies[this.context.num].symbol}{tax}</b></h1>
                <h1 className='quantity'>Quantity: <b>{this.context.cartTotalQty}</b></h1>
                <h1 className='total'>Total: <b>{this.context.currencies[this.context.num].symbol}{total}</b></h1>
                <button onClick={() => this.context.handleOrder()} className='order-button'>ORDER</button>
              </div>
          </div>
      </div>
      : <div>
          <h1 className="cart-name">Cart is Empty</h1>
        </div>
    )
  }
}

Cart.contextType = Context