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
            <img style={{cursor: "pointer"}}  onClick={() => this.handleImage(this.props.product.gallery[1])} className='pdp-image' src={this.props.product.gallery[1]} alt="" />
            <img style={{cursor: "pointer"}}  onClick={() => this.handleImage(this.props.product.gallery[2])} className='pdp-image' src={this.props.product.gallery[2]} alt="" />
        </div>
        <img className='main-pdp-image' src={this.state.image} alt="" />
        <div className='pdp-main'>
        <h1 className='brand-name'>{this.props.product.brand}</h1>
                    <h1 className='item-name'>{this.props.product.name}</h1>
                    {this.props.product.attributes.map((att, i) => (
                        <div className='item-attributes' key={i}>
                            <h3 className='att-name'>{att.name + ":"}</h3>
                            {att.name === "Size" && <div className='input' id={"group"+i}>
                                {att.items.map((value , id) => <div key={id} className='input' >
                                    <input className={att.name} value={value} name={"group"+i} id={value+id} type="radio" />
                                    <label className={att.name + "Label"} htmlFor={value+id} >{value.displayValue}</label>
                                </div>)}
                            </div>}
                            {att.name === "Color" && <div id={"group2"}>
                                {att.items.map((value , id) => <div key={id} className='input' >
                                    <input className={att.name} value={value} name={"group2"} id={value+id} type="radio" />
                                    <label className={att.name + "Label"} htmlFor={value+id} style={{backgroundColor: `${value.displayValue}`}} ></label>
                                </div>)}
                            </div>}
                            {att.name === "Capacity" && <div id={"group3"}>
                                {att.items.map((value , id) => <div key={id} className='input' >
                                    <input className={att.name} value={value} name={"group3"} id={value+id} type="radio" />
                                    <label className={att.name + "Label"} htmlFor={value+id} >{value.displayValue}</label>
                                </div>)}
                            </div>}
                            {att.name === "With USB 3 ports" && <div id={"group4"}>
                                {att.items.map((value , id) => <div key={id} className='input' >
                                    <input className={att.name} value={value} name={"group4"} id={value+id} type="radio" />
                                    <label className={att.name + "Label"} htmlFor={value+id} >{value.displayValue}</label>
                                </div>)}
                            </div>}
                            {att.name === "Touch ID in keyboard" && <div id={"group5"}>
                                {att.items.map((value , id) => <div key={id} className='input' >
                                    <input className={att.name} value={value} name={"group5"} id={value+id} type="radio" />
                                    <label className={att.name + "Label"} htmlFor={value+id} >{value.displayValue}</label>
                                </div>)}
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
