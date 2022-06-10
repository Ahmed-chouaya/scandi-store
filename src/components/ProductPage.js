import React, { Component } from 'react'
import { Context } from '../Context'

export default class ProductPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: this.props.product.gallery[0]
        }
        this.handleImage = this.handleImage.bind(this)
    }

    handleImage(img) {
        this.setState({image: img})
    }


  render() {
    return (
      <div className='pdp'>
        <div className='pdp-images'>
            <img style={{cursor: "pointer"}} onClick={() => this.handleImage(this.props.product.gallery[0])} className='pdp-image' src={this.props.product.gallery[0]} alt="" />
            <img style={{cursor: "pointer"}} onClick={() => this.handleImage(this.props.product.gallery[1])} className='pdp-image' src={this.props.product.gallery[1]} alt="" />
            <img style={{cursor: "pointer"}} onClick={() => this.handleImage(this.props.product.gallery[2])} className='pdp-image' src={this.props.product.gallery[2]} alt="" />
        </div>
        <img className='main-pdp-image' src={this.state.image} alt="" />
        <div className='pdp-main'>
        <h1 className='brand-name'>{this.props.product.brand}</h1>
                    <h1 className='item-name'>{this.props.product.name}</h1>
                    {this.props.product.attributes.map((att, i) => (
                        <div className='item-attributes' key={i}>
                            <h3 className='att-name'>{att.name + ":"}</h3>
                            {att.name === "Size" && <div className='input' id={this.props.product.name + att.name}>
                                {att.items.map((value , id) => 
                                    <span onClick={() => this.context.handleAttPDP(att.name, value.displayValue, this.props.product)} className={`att-value ${this.props.product.size === value.displayValue ? "active" : ""}`} key={id}>{value.displayValue}</span> 
                                )}
                            </div>}
                            {att.name === "Color" && <div id={this.props.product.name + att.name}>
                                {att.items.map((value , id) => 
                                    <span onClick={() => this.context.handleAttPDP(att.name, value.displayValue, this.props.product)} className={`att-value ${this.props.product.color === value.displayValue ? "active" : ""}`} key={id} style={{backgroundColor: `${value.displayValue}`}}></span> 
                                )}
                            </div>}
                            {att.name === "Capacity" && <div id={this.props.product.name + att.name}>
                                {att.items.map((value , id) => 
                                    <span onClick={() => this.context.handleAttPDP(att.name, value.displayValue, this.props.product)} className={`att-value ${this.props.product.capacity === value.displayValue ? "active" : ""}`} key={id}>{value.displayValue}</span> 
                                )}
                            </div>}
                            {att.name === "With USB 3 ports" && <div id={this.props.product.name + att.name}>
                                {att.items.map((value , id) => 
                                    <span onClick={() => this.context.handleAttPDP(att.name, value.displayValue, this.props.product)} className={`att-value ${this.props.product.usb === value.displayValue ? "active" : ""}`} key={id}>{value.displayValue}</span> 
                                )}
                            </div>}
                            {att.name === "Touch ID in keyboard" && <div id={this.props.product.name + att.name}>
                                {att.items.map((value , id) => 
                                    <span onClick={() => this.context.handleAttPDP(att.name, value.displayValue, this.props.product)} className={`att-value ${this.props.product.touch === value.displayValue ? "active" : ""}`} key={id}>{value.displayValue}</span> 
                                )}
                            </div>}
                        </div>
                    ))}

                    <h1 className='pdp-price'>Price:</h1>
                    <h1 className='item-price'>{this.props.product.prices[this.context.num].currency.symbol} {this.props.product.prices[this.context.num].amount}</h1>
                    <button onClick={() => this.context.handleCartItem(this.props.product)} className='pdp-button'>ADD TO CART</button>
                    <p className='pdp-add-to-cart' dangerouslySetInnerHTML={{__html: this.props.product.description}}></p>
        </div>
      </div>
    )
  }
}

ProductPage.contextType = Context
