import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Context } from '../Context';


class Navbar extends Component {
  constructor(props){
    super(props)
    this.state = {
      qty: 0
    }
  }

  static contextType = Context
  

  render() {
    return (
      <div className='nav-containner'>
          <ul className='nav-categories'>
              {this.context.cat.map(cat => (<li key={cat.name} ><Link className='nav-link' key={cat.name} to={cat.name}>{cat.name.toUpperCase()}</Link></li>))}
          </ul>
          <Link to={"/"}>
            <img className='logo' src="./Group.svg" alt="" />  
          </Link>
          <div className='nav-cart'>
            <select value={this.context.currency} onChange={this.context.handleCurrency}>
                {this.context.currencies.map(currency => <option key={currency.label} value={currency.label}>{`${currency.symbol} ${currency.label}`}</option>)}
            </select>
            <img onClick={() => this.context.handleMiniCart()} className='cart' src="./Vector.svg" alt="" />
            <h1 className='navbar-qty'>{this.context.cartTotalQty}</h1>
          </div>
      </div>
    )
  }
}


export default Navbar