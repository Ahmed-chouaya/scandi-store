import React, { Component } from 'react'
import { Context } from '../Context'

export default class CartItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 0,
            photo: this.props.item.gallery,
            attr: {}
        }
    }
    
    leng = this.props.item.gallery.length

    handleAtt(name, value){
        this.setState(prev => ({
            ...prev,
            attr:{...this.state.attr, [name]: value}
        }))
        setTimeout(() => this.context.handleAtt(this.state.attr, this.props.item), 10)
    }

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
    return (
        <>
        {this.props.item.cartQty > 0 && <div>
        <hr />
            <div className='cart-product-page'>
                <div className='cart-product'>
                    <h1 className='brand-name'>{this.props.item.brand}</h1>
                    <h1 className='item-name'>{this.props.item.name}</h1>
                    <h1 className='item-price'>{this.props.item.prices[this.context.num].currency.symbol} {this.props.item.prices[this.context.num].amount}</h1>
                    {this.props.item.attributes.map((att, i) => (
                        <div className='item-attributes' key={i}>
                            <h3 className='att-name'>{att.name + ":"}</h3>
                            {att.type === "text" && <div className='input'>
                                {att.items.map((value , id) => 
                                    <span onClick={() => this.handleAtt(att.name, value.displayValue)} className={`att-value ${this.props.item.attr[att.name] === value.displayValue ? "active" : ""}`} key={id}>{value.displayValue}</span> 
                                )}
                            </div>}
                            {att.type === "swatch" && <div className='input'>
                                {att.items.map((value , id) => 
                                    <span onClick={() => this.handleAtt(att.name, value.displayValue)} className={`att-value ${this.props.item.attr[att.name] === value.displayValue ? "active-swatch" : ""}`} key={id} style={{backgroundColor: `${value.displayValue}`}}></span> 
                                )}
                            </div>}
                        </div>
                    ))}
                </div>
                <div className='cart-product-image'>
                    <div className='cart-product-button'>
                        <button onClick={() => this.context.plusItem(this.props.item)} className='cart-button'>+</button>
                        <h1 className='counter'>{this.props.item.cartQty}</h1>
                        <button onClick={() => this.context.minusItem(this.props.item)} className='cart-button'>-</button>
                    </div>
                        <img className='cart-page-image' src={this.state.photo[this.state.current]} alt="" />
                    {this.leng > 1 && <button onClick={() => this.prevSlide()} className='left-arrow'><img src="/arrow.svg" alt="" className='arrow--left'/></button>}
                    {this.leng > 1 &&<button onClick={() => this.nextSlide()} className='right-arrow'><img src="/arrow2.svg" alt="" className='arrow--right' /></button>}
                </div>
            </div>
      </div>}
      </>
    )
  }
}

CartItem.contextType = Context
