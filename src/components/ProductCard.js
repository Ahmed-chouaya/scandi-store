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

    

  render() {
    const stockOut = this.props.inStock ? {width:"354px",height:"354px"} : {width:"354px",height:"354px", opacity: 0.5}
    const stockout = !this.props.inStock && "stockOut"

    return (
      <div 
        className='product-card'
        onMouseEnter={() => this.setState({hovered:true})}
        onMouseLeave={() => this.setState({hovered:false})}
      >
        <div className='card-ele'>
            <img  style={stockOut} src={this.props.image} alt="" />
             {!this.props.inStock && <h1 className='outOfStock'>Out Of Stock</h1>}
            {this.props.inStock && this.state.hovered && <img key={this.props.product.id} onClick={()=>{this.context.handleCartItem(this.props.product)}} className='add-to-cart' src="CircleIcon.svg" alt="" />}
      {this.props.inStock ? <Link style={{ textDecoration: 'none'}} to={this.props.product.id}>
            <h1 className={`product-name ${stockout}`}>{this.props.name}_{this.props.product.brand}</h1>
      </Link> : <h1 className={`product-name ${stockout}`}>{this.props.name}_{this.props.product.brand}</h1>}
            <h2 className={`product-price ${stockout}`}>{this.props.price.currency.symbol} {this.props.price.amount}</h2>
        </div>
      </div>
    )
  }
}

ProductCard.contextType = Context
