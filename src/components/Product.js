import React, { Component } from 'react'
import { Context } from '../Context';
import ProductCard from './ProductCard'
import { Fetch_CATEGORIES } from './queries';

export default class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: [],
      category: ""
    }
  }

  
  componentDidMount() {
    const cat = this.props.cat
    Fetch_CATEGORIES(cat)
    .then(res => this.setState(prev => ({
      ...prev,
      product: res.data.category.products,
      category: res.data.category.name
    })))
  }


  render() {
    return (
      <div className='product'>
        <h1 className='cat-name'>{this.state.category}</h1>
        <div className='product-page'>
            {this.state.product.map(prod => <ProductCard product={prod} category={this.state.category} inStock={prod.inStock} key={prod.id} price={prod.prices[this.context.num]} image={prod.gallery[0]} name={prod.name}/>)}
        </div>
      </div> 
    )
  }
}

Product.contextType = Context