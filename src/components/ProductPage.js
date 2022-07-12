import React, { Component } from 'react'
import { Context } from '../Context'
import { Markup } from 'interweave';
import { useParams } from 'react-router';
import Loading from './Loading';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

class ProductPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: "",
            attr: {},
            product: {},
            loading: false
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
        setTimeout(() => {
            this.context.handleAttPDP(this.state.attr, this.state.product)
            this.setState(prev => ({
                ...prev,
                product: {...this.state.product, attr: this.state.attr}
            }))
        }, 10)
    }

    componentDidMount() {
        this.context.PDPCat(this.props.params.cat)
        setTimeout( () => {
            const index =  this.context.product.findIndex(item => item.id === this.props.params.id)
            if(this.context.product.length > 0) {
                this.setState(prev => ({
                    ...prev,
                    loading: true,
                    product: {...this.context.product[index], attr: {}},
                    image: this.context.product[index].gallery[0]
                }))
            }
        }, 800)
    }

  render() {
    return (
        <>
        {!this.state.loading ? <div className='pdp-loading'><Loading/></div> : <div>
      {this.state.product !== {} && this.state.product.inStock ? <div className='pdp'>
        <div className='pdp-images'>
            {this.state.product.gallery !== undefined && this.state.product.gallery.map((image, i) =>  <img key={i} onClick={() => this.handleImage(image)} className='pdp-image' src={image} alt="" />)}
        </div>
        <div className='pdp--image'>
            <img className='main-pdp-image' src={this.state.image} alt="" />
        </div>
        <div className='pdp-main'>
        <h1 className='brand-name'>{this.state.product !== {} && this.state.product.brand}</h1>
                    <h1 className='item-name'>{this.state.product !== {} && this.state.product.name}</h1>
                    {this.state.product !== {} && this.state.product.attributes.map((att, i) => (
                        <div className='item-attributes' key={i}>
                            <h3 className='att-name'>{att.name + ":"}</h3>
                            {att.type === "text" && <div className='input'>
                                {att.items.map((value , id) => 
                                    <span onClick={() => {
                                        this.handleAtt(att.name, value.displayValue)
                                    }} className={`att-value ${this.state.product.attr[att.name] === value.displayValue ? "active" : ""}`} key={id}>{value.displayValue}</span> 
                                )}
                            </div>}
                            {att.type === "swatch" && <div id={this.state.product.name + att.name}>
                                {att.items.map((value , id) => 
                                    <span onClick={() => {
                                        this.handleAtt(att.name, value.displayValue)
                                    }} className={`att-value ${this.state.product.attr[att.name] === value.displayValue ? "active-swatch" : ""}`} key={id} style={{backgroundColor: `${value.displayValue}`}}></span> 
                                )}
                            </div>}
                        </div>
                    ))}

                    <h1 className='pdp-price'>Price:</h1>
                    <h1 className='item-price'>{this.state.product.prices[this.context.num].currency.symbol} {this.state.product.prices[this.context.num].amount}</h1>
                    <button onClick={() => this.context.handleCartItem(this.state.product)} className='pdp-button'>ADD TO CART</button>
                    <div className='pdp-add-to-cart'>
                        <Markup content={this.state.product !== {} && this.state.product.description} />
                    </div>
        </div>
      </div> :
      this.state.product !=={} &&
       <div className='pdp'>
        <div className='pdp-images'>
            {this.state.product.gallery !== undefined && this.state.product.gallery.map((image, i) =>  <img key={i} onClick={() => this.handleImage(image)} className='pdp-image' src={image} alt="" />)}
        </div>
        <div className='pdp--image'>
            <img className='main-pdp-image' src={this.state.image} alt="" />
        </div>
        <div className='pdp-main'>
        <h1 className='brand-name'>{this.state.product.brand}</h1>
                    <h1 className='item-name'>{this.state.product !== {} && this.state.product.name}</h1>
                    { this.state.product.attributes?.map((att, i) => (
                        <div className='item-attributes' key={i}>
                            <h3 className='att-name'>{att.name + ":"}</h3>
                            {att.type === "text" && <div className='input'>
                                {att.items.map((value , id) => 
                                    <span className={`att-value-out-of-stock ${this.state.product.attr[att.name] === value.displayValue ? "active" : ""}`} key={id}>{value.displayValue}</span> 
                                )}
                            </div>}
                            {att.type === "swatch" && <div id={this.state.product.name + att.name}>
                                {att.items.map((value , id) => 
                                    <span className={`att-value-out-of-stock ${this.state.product.attr[att.name] === value.displayValue ? "active" : ""}`} key={id} style={{backgroundColor: `${value.displayValue}`}}></span> 
                                )}
                            </div>}
                        </div>
                    ))}

                    <h1 className='pdp-price'>Price:</h1>
                    <h1 className='item-price'>{this.state.product.prices !== undefined && this.state.product.prices[this.context.num].currency.symbol} {this.state.product.prices !== undefined && this.state.product.prices[this.context.num].amount}</h1>
                    <button className='pdp-button-out-of-stock'>OUT OF STOCK</button>
                    <div className='pdp-add-to-cart'>
                        <Markup content={this.state.product !== {} && this.state.product.description} />
                    </div>
        </div>
      </div>}
      </div>}
      </>
    )
  }
}

export default withParams(ProductPage)


ProductPage.contextType = Context