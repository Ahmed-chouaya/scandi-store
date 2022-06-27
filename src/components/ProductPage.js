import React, { Component } from 'react'
import { Context } from '../Context'
import { Markup } from 'interweave';

export default class ProductPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: this.props.product.gallery[0],
            attr:{}
        }
        this.handleImage = this.handleImage.bind(this)
    }

    handleImage(img) {
        this.setState({image: img})
    }

    handleAtt(name, value){
        this.setState(prev => ({
            ...prev,
            attr:{...this.state.attr, [name]: value}
        }))
        setTimeout(() => this.context.handleAttPDP(this.state.attr, this.props.product), 10)
    }


  render() {
    return (
        <>
      {this.props.product.inStock ? <div className='pdp'>
        <div className='pdp-images'>
            {this.props.product.gallery.map((image, i) =>  <img key={i} style={{cursor: "pointer"}} onClick={() => this.handleImage(image)} className='pdp-image' src={image} alt="" />)}
        </div>
        <div className='pdp--image'>
            <img className='main-pdp-image' src={this.state.image} alt="" />
        </div>
        <div className='pdp-main'>
        <h1 className='brand-name'>{this.props.product.brand}</h1>
                    <h1 className='item-name'>{this.props.product.name}</h1>
                    {this.props.product.attributes.map((att, i) => (
                        <div className='item-attributes' key={i}>
                            <h3 className='att-name'>{att.name + ":"}</h3>
                            {att.type === "text" && <div className='input'>
                                {att.items.map((value , id) => 
                                    <span onClick={() => {
                                        this.handleAtt(att.name, value.displayValue)
                                    }} className={`att-value ${this.props.product.attr[att.name] === value.displayValue ? "active" : ""}`} key={id}>{value.displayValue}</span> 
                                )}
                            </div>}
                            {att.type === "swatch" && <div id={this.props.product.name + att.name}>
                                {att.items.map((value , id) => 
                                    <span onClick={() => {
                                        this.handleAtt(att.name, value.displayValue)
                                    }} className={`att-value ${this.props.product.attr[att.name] === value.displayValue ? "active-swatch" : ""}`} key={id} style={{backgroundColor: `${value.displayValue}`}}></span> 
                                )}
                            </div>}
                        </div>
                    ))}

                    <h1 className='pdp-price'>Price:</h1>
                    <h1 className='item-price'>{this.props.product.prices[this.context.num].currency.symbol} {this.props.product.prices[this.context.num].amount}</h1>
                    <button onClick={() => this.context.handleCartItem(this.props.product)} className='pdp-button'>ADD TO CART</button>
                    <div className='pdp-add-to-cart'>
                        <Markup content={this.props.product.description} />
                    </div>
        </div>
      </div> :
      
       <div className='pdp'>
        <div className='pdp-images'>
            {this.props.product.gallery.map((image, i) =>  <img key={i} style={{cursor: "pointer"}} onClick={() => this.handleImage(image)} className='pdp-image' src={image} alt="" />)}
        </div>
        <div className='pdp--image'>
            <img className='main-pdp-image' src={this.state.image} alt="" />
        </div>
        <div className='pdp-main'>
        <h1 className='brand-name'>{this.props.product.brand}</h1>
                    <h1 className='item-name'>{this.props.product.name}</h1>
                    {this.props.product.attributes.map((att, i) => (
                        <div className='item-attributes' key={i}>
                            <h3 className='att-name'>{att.name + ":"}</h3>
                            {att.type === "text" && <div className='input'>
                                {att.items.map((value , id) => 
                                    <span style={{cursor: "not-allowed"}} className={`att-value ${this.props.product.attr[att.name] === value.displayValue ? "active" : ""}`} key={id}>{value.displayValue}</span> 
                                )}
                            </div>}
                            {att.type === "swatch" && <div id={this.props.product.name + att.name}>
                                {att.items.map((value , id) => 
                                    <span className={`att-value ${this.props.product.attr[att.name] === value.displayValue ? "active" : ""}`} key={id} style={{backgroundColor: `${value.displayValue}`, cursor: "not-allowed"}}></span> 
                                )}
                            </div>}
                        </div>
                    ))}

                    <h1 className='pdp-price'>Price:</h1>
                    <h1 className='item-price'>{this.props.product.prices[this.context.num].currency.symbol} {this.props.product.prices[this.context.num].amount}</h1>
                    <button style={{cursor: "not-allowed"}} className='pdp-button'>OUT OF STOCK</button>
                    <div className='pdp-add-to-cart'>
                        <Markup content={this.props.product.description} />
                    </div>
        </div>
      </div>}
      </>
    )
  }
}

ProductPage.contextType = Context
