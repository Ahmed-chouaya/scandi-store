import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Context } from '../Context'

export default class PopUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            attr: {},
            product: this.props.product
        }

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
      }
    
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        this.props.handleToggleAttri()
        }
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

  render() {
    return (
      <>
      <div className={this.props.toggleAttri ? "oppacity-popUp" : ""} />
        <div ref={this.wrapperRef} className='popUp'>
            <img onClick={() => this.props.handleToggleAttri()} className='close-popUp' src="/icons8-close.svg" alt='' />
            <div>
                <img className='popUpImage' src={this.props.product.gallery[0]} alt="" />
                <h1 className='product-name-popUp'>{this.props.product.brand} {this.props.product.name}</h1>
                <h1 className='popUp-price'>{this.props.product.prices[this.context.num].currency.symbol}{this.props.product.prices[this.context.num].amount}</h1>
            </div>
            <div>
            {this.props.product.attributes.map((att, i) =>(
                <div key={i} className='popUp-attributes'>
                    <h1 className='popUp-att-name' >{att.name}:</h1>
                    {att.type === "text" && <div >
                        {att.items.map((value , id) => 
                            <div className='input'><span onClick={() => this.handleAtt(att.name, value.displayValue)} className={`att-value ${this.state.product.attr[att.name] === value.displayValue ? "active" : ""}`} key={id}>{value.displayValue}</span></div>
                        )}
                    </div>}
                    {att.type === "swatch" && <div>
                        {att.items.map((value , id) => 
                            <div className='input'><span onClick={() => this.handleAtt(att.name, value.displayValue)} className={`att-value ${this.state.product.attr[att.name] === value.displayValue ? "active-swatch" : ""}`} key={id} style={{backgroundColor: `${value.displayValue}`}}></span></div>
                        )}
                    </div>}
                </div>))}
                <div className='popUp-buttons'>
                    <button className='popUp-view-item'><Link className='popUp-view-link' to={`/pdp/${this.props.product.id}`}>view product</Link></button>
                    <button onClick={() => this.context.handleCartItem(this.state.product)} className='popUp-add-to-cart'>add to cart</button>
                </div>
            </div>
        </div>
      </>
    )
  }
}

PopUp.contextType = Context