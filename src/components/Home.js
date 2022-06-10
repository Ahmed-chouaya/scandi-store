import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export class Home extends Component {
  render() {
    return (
      <div className='home'>
          <h1 className='home-title'>Scandi Store</h1>
          <span className='start-shopping'><Link className='home-link' to={"all"} >Start Shopping</Link></span>
      </div>
    )
  }
}

export default Home