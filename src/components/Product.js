import React, { Component } from 'react'
import { useParams } from 'react-router';
import { Context } from '../Context';
import ProductCard from './ProductCard'
import { Fetch_CATEGORIES } from './queries';

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class Product extends Component {

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
    this.context.PDPCat(this.props.params.cat)
    this.catchData()
  }

  componentDidUpdate(prevProps,prevState) {
    if(prevProps.params.cat !== this.props.params.cat) {
      this.catchData()
    }
  }

  catchData() {
    const cat = this.props.params.cat
    Fetch_CATEGORIES(cat)
    .then(res => {
      this.handleProduct(res.data.category.products)
      this.setState(prev => ({
      ...prev,
      category: res.data.category.name
    }))
  })
    this.context.getTotal()
  }

  handleProduct(prod) {
    let arr = []
    prod.map(pro => {
      arr.push({...pro, attr:{}})
      this.context.handleProductPDP({...pro, attr:{}})
      return arr
    })
    this.setState(prev => ({
      ...prev,
      product: arr
    }))
  }

  render() {
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

export default withParams(Product)

Product.contextType = Context