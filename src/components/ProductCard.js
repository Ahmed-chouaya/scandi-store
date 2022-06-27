import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../Context'


export default class ProductCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hovered: false
        }
    }


    componentDidMount() {
      this.context.handleProductPDP(this.props.product)
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
            style={{ textDecoration: "none" }}
            to={`/pdp/${this.props.product.id}`}
            onClick={() => this.context.handlePDPproduct(this.props.product)}
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
          this.state.hovered && (
            <img
              key={this.props.product.id}
              onClick={() => {
                this.context.fastAddToCart(this.props.product);
              }}
              className="add-to-cart"
              src="CircleIcon.svg"
              alt=""
            />
          )}
      </div>
    );
  }
}

ProductCard.contextType = Context
