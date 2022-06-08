import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../Context'

export default class MiniCart extends Component {
  render() {
    const total = (this.context.cartTotalAmount + this.context.cartTotalAmount * 21/100).toFixed(2)
    return (
      <div className='mini-cart'>
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
                                {att.items.map((value , id) => <div key={id} className='input-mini' >
                                    <input className={att.name} value={value} name={"group"+i} id={value+id} type="radio" />
                                    <label style={{width: "20px", height: "20px"}} className={att.name + "Label"} htmlFor={value+id} >{value.displayValue}</label>
                                </div>)}
                            </div>}
                            {att.name === "Color" && <div id={"group2"}>
                                {att.items.map((value , id) => <div key={id} className='input-mini' >
                                    <input className={att.name} value={value} name={"group2"} id={value+id} type="radio" />
                                    <label className={att.name + "Label"} htmlFor={value+id} style={{backgroundColor: `${value.displayValue}`}} ></label>
                                </div>)}
                            </div>}
                            {att.name === "Capacity" && <div id={"group3"}>
                                {att.items.map((value , id) => <div key={id} className='input-mini' >
                                    <input className={att.name} value={value} name={"group3"} id={value+id} type="radio" />
                                    <label className={att.name + "Label"} htmlFor={value+id} >{value.displayValue}</label>
                                </div>)}
                            </div>}
                            {att.name === "With USB 3 ports" && <div id={"group4"}>
                                {att.items.map((value , id) => <div key={id} className='input-mini' >
                                    <input className={att.name} value={value} name={"group4"} id={value+id} type="radio" />
                                    <label className={att.name + "Label"} htmlFor={value+id} >{value.displayValue}</label>
                                </div>)}
                            </div>}
                            {att.name === "Touch ID in keyboard" && <div id={"group5"}>
                                {att.items.map((value , id) => <div key={id} className='input-mini' >
                                    <input className={att.name} value={value} name={"group5"} id={value+id} type="radio" />
                                    <label className={att.name + "Label"} htmlFor={value+id} >{value.displayValue}</label>
                                </div>)}
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
              <button className='mini-view'><Link style={{textDecoration: "none" , color:"#1D1F22"}} to={"cart"}>view cart</Link></button>
            <button onClick={() => this.context.handleOrder()} className='mini-check'>check out</button>
          </div>
        </div>
      </div>
    )
  }
}

MiniCart.contextType = Context
