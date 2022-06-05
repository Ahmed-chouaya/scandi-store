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
      console.log(this.state.photo)
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
                            {att.name === "Size" && <div className='input' id={"group"+i}>
                                {att.items.map((value , id) => <div className='input' >
                                    <input className={att.name} value={value} name={"group"+i} id={value+id} type="radio" />
                                    <label className={att.name + "Label"} htmlFor={value+id} >{value.displayValue}</label>
                                </div>)}
                            </div>}
                            {att.name === "Color" && <div id={"group2"}>
                                {att.items.map((value , id) => <div className='input' >
                                    <input className={att.name} value={value} name={"group2"} id={value+id} type="radio" />
                                    <label className={att.name + "Label"} htmlFor={value+id} style={{backgroundColor: `${value.displayValue}`}} ></label>
                                </div>)}
                            </div>}
                            {att.name === "Capacity" && <div id={"group3"}>
                                {att.items.map((value , id) => <div className='input' >
                                    <input className={att.name} value={value} name={"group3"} id={value+id} type="radio" />
                                    <label className={att.name + "Label"} htmlFor={value+id} >{value.displayValue}</label>
                                </div>)}
                            </div>}
                            {att.name === "With USB 3 ports" && <div id={"group4"}>
                                {att.items.map((value , id) => <div className='input' >
                                    <input className={att.name} value={value} name={"group4"} id={value+id} type="radio" />
                                    <label className={att.name + "Label"} htmlFor={value+id} >{value.displayValue}</label>
                                </div>)}
                            </div>}
                            {att.name === "Touch ID in keyboard" && <div id={"group5"}>
                                {att.items.map((value , id) => <div className='input' >
                                    <input className={att.name} value={value} name={"group5"} id={value+id} type="radio" />
                                    <label className={att.name + "Label"} htmlFor={value+id} >{value.displayValue}</label>
                                </div>)}
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
