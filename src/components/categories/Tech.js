import React, { Component } from 'react'
import Product from '../Product'

export default class Tech extends Component {

  componentDidMount() {
    this.props.handleCategory("tech")
  }

  render() {
    return (
      <div>
          <Product  cat={"tech"}/>
      </div>
    )
  }
}