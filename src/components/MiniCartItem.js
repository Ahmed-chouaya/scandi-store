import React, { Component } from 'react'
import { Context } from '../Context'

export class MiniCartItem extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           current: 0,
           attr: {}
        }
      }

      handleAtt(name, value){
        this.setState(prev => ({
            ...prev,
            attr:{...this.state.attr, [name]: value}
        }))
        setTimeout(() => this.context.handleAtt(this.state.attr, this.props.item), 10)
    }
    
    render() {
      const {item, i} = this.props
    return (
      <>
        {item.cartQty > 0 && <div className='mini-cart-item' key={i}>
        <div >
            <h1 className='minicart-name'>{item.brand}</h1>
            <h1 className='minicart-name'>{item.name}</h1>
            <h1 className='mini-item-price'>{item.prices[this.context.num].currency.symbol} {item.prices[this.context.num].amount}</h1>
            {item.attributes.map((att, i) =>(
              <div className='mini-item-attributes' key={i}>
                            <h3 className='mini-att-name'>{att.name + ":"}</h3>
                            {att.type === "text" && <div className='input-mini'>
                                {att.items.map((value , id) => <div key={id + value} className='input-mini'><span onClick={() => this.handleAtt(att.name, value.displayValue)} className={`mini-att-value ${item.attr[att.name] === value.displayValue ? "active" : ""}`} >{value.displayValue}</span></div>)}
                            </div>}
                            {att.type === "swatch" && <div className='input-mini' id={"group2"}>
                                {att.items.map((value , id) => <div key={id + value} className='input-mini'><span onClick={() => this.handleAtt(att.name, value.displayValue)} className={`mini-att-value-swatch ${item.attr[att.name] === value.displayValue ? "active-swatch" : ""}`} style={{backgroundColor: `${value.displayValue}`}}></span></div>)}
                            </div>}
                        </div>
            ))}
            </div>
            <div className='mini-cart-product-image'>
            <div className='mini-cart-product-button'>
                        <button onClick={() => {this.context.plusItem(item)}} className='mini-cart-button'>+</button>
                        <h1 className='mini-counter'>{item.cartQty}</h1>
                        <button onClick={() => {this.context.minusItem(item)}} className='mini-cart-button'>-</button>
            </div>
            <img className='mini-cart-img' src={item.gallery[this.state.current]} alt="" />
            {item.gallery.length > 1 && <button onClick={() => {
              this.setState(prev => ({
            ...prev,
            current: prev.current === 0 ? item.gallery.length - 1 : prev.current - 1
        }))
            }} className='mini-left-arrow'><img src="/arrow.svg" alt="" className='mini--arrow--left'/></button>}
            {item.gallery.length > 1 && <button onClick={() => {
              this.setState(prev => ({
            ...prev,
            current: prev.current === item.gallery.length - 1 ? 0 : prev.current + 1
        }))
            }} className='mini-right-arrow'><img src="/arrow2.svg" alt="" className='mini--arrow--right' /></button>}
            </div>
        </div>}
        </>
    )
  }
}

MiniCartItem.contextType = Context

export default MiniCartItem