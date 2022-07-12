import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../Context'
import PopUp from './PopUp'


export default class ProductCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hovered: false,
            toggleAttri: false
        }
        this.toggleAttri = this.toggleAttri.bind(this)
    }
    
    toggleAttri() {
      this.setState(prev => ({
        ...prev,
        toggleAttri: !prev.toggleAttri
      }))
    }

  render() {
    const stockOut = this.props.inStock ? "inStock" : "outStock"
    const stockout = !this.props.inStock && "stockOut"
    return (
      <div
        className="product-card"
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
      >
        
          <Link
            to={`/${this.props.product.category}/${this.props.product.id}`}
          >
            <div className="card-ele">
              <div className="cardImage">
                <img className={stockOut} src={this.props.image} alt="" />
              </div>
              {!this.props.inStock && (
                <h1 className="outOfStock">Out Of Stock</h1>
              )}
              <h1 className={`product-name ${stockout}`}>
                {this.props.product.brand} {this.props.name}
              </h1>
              <h2 className={`product-price ${stockout}`}>
                {this.props.price.currency.symbol} {this.props.price.amount}
              </h2>
            </div>
          </Link>
         {this.props.inStock &&
          this.state.hovered && 
          this.props.product.attributes.length === Object.keys(this.props.product.attr).length ?
            <img
              key={this.props.product.id}
              onClick={() => {
                this.context.fastAddToCart(this.props.product);
              }}
              className="add-to-cart"
              src="CircleIcon.svg"
              alt=""
            /> :
            this.props.inStock &&
            this.state.hovered && 
            <img
              key={this.props.product.id}
              onClick={() => {
                this.toggleAttri();
              }}
              className="add-to-cart"
              src="CircleIcon.svg"
              alt=""
            />
          }
          {this.state.toggleAttri && <PopUp handleToggleAttri={this.toggleAttri} toggleAttri={this.state.toggleAttri} product={this.props.product}/>}
      </div>
    );
  }
}

ProductCard.contextType = Context
