import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../Context'

export default class MiniCart extends Component {
  render() {
    const total = (this.context.cartTotalAmount + this.context.cartTotalAmount * 21/100).toFixed(2)
    return (
      <>
      {this.context.cartTotalQty !== 0 ?  <div className='mini-cart'>
        <h1 className='bag'><b>My Bag</b> {this.context.cartTotalQty} items</h1>
        
        {this.context.cartItem.map(item =>  <div className='mini-cart-item' key={item.id}>
        <div >
            <h1 className='minicart-name'>{item.brand}</h1>
            <h1 className='minicart-name'>{item.name}</h1>
            <h1 className='mini-item-price'>{item.prices[this.context.num].currency.symbol} {item.prices[this.context.num].amount}</h1>
            {item.attributes.map((att, i) =>(
              <div className='mini-item-attributes' key={i}>
                            <h3 className='mini-att-name'>{att.name + ":"}</h3>
                            {att.name === "Size" && <div className='input-mini' id={"group"+i}>
                                {att.items.map((value , id) => <div className='input-mini'><span onClick={() => this.context.handleAtt(att.name, value.displayValue, item)} className={`mini-att-value ${item.size === value.displayValue ? "active" : ""}`} key={id}>{value.displayValue}</span></div>)}
                            </div>}
                            {att.name === "Color" && <div className='input-mini' id={"group2"}>
                                {att.items.map((value , id) => <div className='input-mini'><span onClick={() => this.context.handleAtt(att.name, value.displayValue, item)} className={`mini-att-value ${item.color === value.displayValue ? "active" : ""}`} key={id} style={{backgroundColor: `${value.displayValue}`}}></span></div>)}
                            </div>}
                            {att.name === "Capacity" && <div className='input-mini' id={"group3"}>
                                {att.items.map((value , id) => <div className='input-mini'><span onClick={() => this.context.handleAtt(att.name, value.displayValue, item)} className={`mini-att-value ${item.capacity === value.displayValue ? "active" : ""}`} key={id}>{value.displayValue}</span></div> )}
                            </div>}
                            {att.name === "With USB 3 ports" && <div className='input-mini' id={"group4"}>
                                {att.items.map((value , id) => <div className='input-mini'><span onClick={() => this.context.handleAtt(att.name, value.displayValue, item)} className={`mini-att-value ${item.usb === value.displayValue ? "active" : ""}`} key={id}>{value.displayValue}</span></div>)}
                            </div>}
                            {att.name === "Touch ID in keyboard" && <div className='input-mini' id={"group5"}>
                                {att.items.map((value , id) => <div className='input-mini'><span onClick={() => this.context.handleAtt(att.name, value.displayValue, item)} className={`mini-att-value ${item.touch === value.displayValue ? "active" : ""}`} key={id}>{value.displayValue}</span></div>)}
                            </div>}
                        </div>
            ))}
            </div>
            <div className='mini-cart-product-image'>
            <div className='mini-cart-product-button'>
                        <button onClick={() => {this.context.handleCartItem(item)}} className='mini-cart-button'>+</button>
                        <h1 className='mini-counter'>{item.cartQty}</h1>
                        <button onClick={() => {this.context.minusItem(item)}} className='mini-cart-button'>-</button>
            </div>
            <img className='mini-cart-img' src={item.gallery[0]} alt="" />
            </div>
        </div>)}
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
