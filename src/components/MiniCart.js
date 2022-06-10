import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../Context'
import MiniCartItem from './MiniCartItem'

export default class MiniCart extends Component {

  render() {
    const total = (this.context.cartTotalAmount + this.context.cartTotalAmount * 21/100).toFixed(2)
    return (
      <>
      {this.context.cartTotalQty !== 0 ?  <div className='mini-cart'>
        <h1 className='bag'><b>My Bag</b> {this.context.cartTotalQty} items</h1>
        
        {this.context.cartItem.map(item =>  <MiniCartItem item={item} />)}
        <div className='checkout'>
          <div className='mini-total'>
            <h1 className='mini-total-name'>Total</h1>
            <h1 className='mini-total-value'>{this.context.currencies[this.context.num].symbol}{total}</h1>
          </div>
          <div className='mini-buttons'>
              <button className='mini-view'><Link onClick={() => this.context.handleMiniCart()} style={{textDecoration: "none" , color:"#1D1F22", width: "140px", height: "43px"}} to={"cart"}>view cart</Link></button>
            <button onClick={() => this.context.handleOrder()} className='mini-check'>check out</button>
          </div>
        </div>
      </div> : <div className='mini-cart'>
      <h1 className='mini-total-name'>Cart is Empty</h1>
      </div>}
      </>
    )
  }
}

MiniCart.contextType = Context
