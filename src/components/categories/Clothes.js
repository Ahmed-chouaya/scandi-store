import React, { Component } from 'react'
import Product from '../Product'

export default class Clothes extends Component {

  componentDidMount() {
    this.props.handleCategory("clothes")
  }

  render() {
    return (
      <div>
          <Product cat={"clothes"}/>
      </div>
    )
  }
}
