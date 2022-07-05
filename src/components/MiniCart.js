import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../Context'
import MiniCartItem from './MiniCartItem'

export default class MiniCart extends Component {

  render() {
    const total = (this.context.cartTotalAmount + this.context.cartTotalAmount * 21/100).toFixed(2)
    return (
      <div className='mini'>
      {this.context.cartTotalQty !== 0 ?  <div className='mini-cart'>
        <h1 className='bag'><b>My Bag</b> {this.context.cartTotalQty} items</h1>
        
        {this.context.cartItem.map((item, i)=>  <MiniCartItem i={i} key={i} item={item} />)}
        <div className='checkout'>
          <div className='mini-total'>
            <h1 className='mini-total-name'>Total</h1>
            <h1 className='mini-total-value'>{this.context.currencies[this.context.num].symbol}{total}</h1>
          </div>
          <div className='mini-buttons'>
              <button className='mini-view'><Link className='mini-view-link' onClick={() => this.context.handleMiniCart()} to={"cart"}>view bag</Link></button>
            <button onClick={() => this.context.handleOrder()} className='mini-check'>check out</button>
          </div>
        </div>
      </div> : <div className='mini-cart'>
      <h1 className='mini-total-name'>Cart is Empty</h1>
      </div>}
      </div>
    )
  }
}

MiniCart.contextType = Context
