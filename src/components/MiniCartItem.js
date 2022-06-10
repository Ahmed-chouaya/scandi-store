import React, { Component } from 'react'
import { Context } from '../Context'

export class MiniCartItem extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           current: 0
        }
      }
    
    render() {
      const {item} = this.props
    return (
        <div className='mini-cart-item' key={item.id}>
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
            <img className='mini-cart-img' src={item.gallery[this.state.current]} alt="" />
            <button onClick={() => {
              this.setState(prev => ({
            ...prev,
            current: prev.current === 0 ? item.gallery.length - 1 : prev.current - 1
        }))
            }} className='mini-left-arrow'>{"<"}</button>
            <button onClick={() => {
              this.setState(prev => ({
            ...prev,
            current: prev.current === item.gallery.length - 1 ? 0 : prev.current + 1
        }))
            }} className='mini-right-arrow'>{">"}</button>
            </div>
        </div>
    )
  }
}

MiniCartItem.contextType = Context

export default MiniCartItem