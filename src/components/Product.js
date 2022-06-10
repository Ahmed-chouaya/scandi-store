import React, { Component } from 'react'
import { Context } from '../Context';
import ProductCard from './ProductCard'
import { Fetch_CATEGORIES } from './queries';

export default class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: [],
      category: "",
      counter: 0
    }
  }

  handleUpdate =() => {
    this.context.getTotal()
    this.forceUpdate()
  }
  forceUpdate = () => {
    this.setState(prev => ({
      ...prev,
      counter: prev.counter + 1 
    }))
  }
  
  componentDidMount() {
    const cat = this.props.cat
    Fetch_CATEGORIES(cat)
    .then(res => this.setState(prev => ({
      ...prev,
      product: res.data.category.products,
      category: res.data.category.name
    })))
    this.context.getTotal()
  }

  removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}

  handleProduct() {
    let arr = []
    this.state.product.map(pro => arr =[...this.state.product, {
      ...pro,
      size: "",
      color: "",
      capacity: "",
      usb: "",
      touch: ""
    }])
    let arr2 = arr.slice(0, -1)
    this.state.product = this.removeDuplicates(arr2)
  }


  render() {
    this.handleProduct()
    return (
      <div key={this.state.counter} className='product'>
        <h1 className='cat-name'>{this.state.category}</h1>
        <div className='product-page'>
            {this.state.product.map(prod => <ProductCard handleUpdate={this.handleUpdate}  product={prod} category={this.state.category} inStock={prod.inStock} key={prod.id} price={prod.prices[this.context.num]} image={prod.gallery[0]} name={prod.name}/>)}
        </div>
      </div> 
    )
  }
}

Product.contextType = Context