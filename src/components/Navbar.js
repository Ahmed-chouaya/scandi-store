import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Context } from '../Context';


class Navbar extends Component {

  render() {
    return (
      <div className='nav-containner'>
          <ul className='nav-categories'>
              {this.context.cat.map(cat => (<li key={cat.name} ><Link key={cat.name} style={{ textDecoration: 'none', color: "#5ECE7B", padding: "10px",paddingBottom: "30px"}} to={cat.name}>{cat.name.toUpperCase()}</Link></li>))}
          </ul>
          <img className='logo' src="./Group.svg" alt="" />
          <div className='nav-cart'>
            <select value={this.context.currency} onChange={this.context.handleCurrency}>
                {this.context.currencies.map(currency => <option key={currency.label} value={currency.label}>{`${currency.symbol} ${currency.label}`}</option>)}
            </select>
            <Link to={"cart"}><img className='cart' src="./Vector.svg" alt="" /></Link>
          </div>
      </div>
    )
  }
}

Navbar.contextType = Context

export default Navbar