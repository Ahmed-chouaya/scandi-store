import React, { Component } from 'react'
import { Context } from '../Context'

export default class CartItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 0,
            photo: this.props.item.gallery
        }
    }
    
    leng = this.props.item.gallery.length

    nextSlide() {
        this.setState(prev => ({
            ...prev,
            current: prev.current === this.leng - 1 ? 0 : prev.current + 1
        }))
    }

    prevSlide() {
        this.setState(prev => ({
            ...prev,
            current: prev.current === 0 ? this.leng - 1 : prev.current - 1
        }))
    }

  render() {
      console.log(this.props.item.size)
    return (
        <div>
        <hr />
            <div className='cart-product-page'>
                <div className='cart-product'>
                    <h1 className='brand-name'>{this.props.item.brand}</h1>
                    <h1 className='item-name'>{this.props.item.name}</h1>
                    <h1 className='item-price'>{this.props.item.prices[this.context.num].currency.symbol} {this.props.item.prices[this.context.num].amount}</h1>
                    {this.props.item.attributes.map((att, i) => (
                        <div className='item-attributes' key={i}>
                            <h3 className='att-name'>{att.name + ":"}</h3>
                            {att.name === "Size" && <div className='input' id={this.props.item.name + att.name}>
                                {att.items.map((value , id) => 
                                    <span onClick={() => this.context.handleAtt(att.name, value.displayValue, this.props.item)} className={`att-value ${this.props.item.size === value.displayValue ? "active" : ""}`} key={id}>{value.displayValue}</span> 
                                )}
                            </div>}
                            {att.name === "Color" && <div id={this.props.item.name + att.name}>
                                {att.items.map((value , id) => 
                                    <span onClick={() => this.context.handleAtt(att.name, value.displayValue, this.props.item)} className={`att-value ${this.props.item.color === value.displayValue ? "active" : ""}`} key={id} style={{backgroundColor: `${value.displayValue}`}}></span> 
                                )}
                            </div>}
                            {att.name === "Capacity" && <div id={this.props.item.name + att.name}>
                                {att.items.map((value , id) => 
                                    <span onClick={() => this.context.handleAtt(att.name, value.displayValue, this.props.item)} className={`att-value ${this.props.item.capacity === value.displayValue ? "active" : ""}`} key={id}>{value.displayValue}</span> 
                                )}
                            </div>}
                            {att.name === "With USB 3 ports" && <div id={this.props.item.name + att.name}>
                                {att.items.map((value , id) => 
                                    <span onClick={() => this.context.handleAtt(att.name, value.displayValue, this.props.item)} className={`att-value ${this.props.item.usb === value.displayValue ? "active" : ""}`} key={id}>{value.displayValue}</span> 
                                )}
                            </div>}
                            {att.name === "Touch ID in keyboard" && <div id={this.props.item.name + att.name}>
                                {att.items.map((value , id) => 
                                    <span onClick={() => this.context.handleAtt(att.name, value.displayValue, this.props.item)} className={`att-value ${this.props.item.touch === value.displayValue ? "active" : ""}`} key={id}>{value.displayValue}</span> 
                                )}
                            </div>}
                        </div>
                    ))}
                </div>
                <div className='cart-product-image'>
                    <div className='cart-product-button'>
                        <button onClick={() => {this.context.handleCartItem(this.props.item)
                        this.props.rerender()}} className='cart-button'>+</button>
                        <h1 className='counter'>{this.props.item.cartQty}</h1>
                        <button onClick={() => {this.context.minusItem(this.props.item)
                        this.props.rerender()}} className='cart-button'>-</button>
                    </div>
                        <img className='cart-page-image' style={{width: "350px"}} src={this.state.photo[this.state.current]} alt="" />
                    {this.leng > 1 && <button onClick={() => this.prevSlide()} className='left-arrow'>{"<"}</button>}
                    {this.leng > 1 &&<button onClick={() => this.nextSlide()} className='right-arrow'>{">"}</button>}
                </div>
            </div>
      </div>
    )
  }
}

CartItem.contextType = Context
