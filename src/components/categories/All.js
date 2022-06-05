import React, { Component } from 'react'
import Product from '../Product'

export default class All extends Component {

  componentDidMount() {
    this.props.handleCategory("all")
  }

  render() {
    return (
      <div>
          <Product cat={"all"}/>
      </div>
    )
  }
}
