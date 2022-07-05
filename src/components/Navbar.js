import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Context } from '../Context';
import MiniCart from './MiniCart';


class Navbar extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeCurr: false
    }
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  toggleActiveCurr() {
    this.setState({activeCurr: !this.state.activeCurr})
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({activeCurr: false});
      this.context.closeMiniCart()
    }
  }

  static contextType = Context
  

  render() {
    return (
      <div className='nav-containner'>
          <ul className='nav-categories'>
              {this.context.cat.map(cat => (<li key={cat.name} ><Link className='nav-link' key={cat.name} to={`/${cat.name}`}>{cat.name.toUpperCase()}</Link></li>))}
          </ul>
          <Link to={"/"}>
            <img className='logo' src="/Group.svg" alt="" />  
          </Link>
          <div ref={this.wrapperRef} className='nav-cart'>
            <div className='curr-changer'>
              <div className='select' onClick={() => this.toggleActiveCurr()}>{this.context.currency}
                <img className='arrow-curr' src={this.state.activeCurr ? "/Vector(1).svg" : "/Vector(2).svg"} alt="" />
              </div>
                {this.state.activeCurr && <div className='options'>
                  {this.context.currencies.map(currency => <div className='option' key={currency.label} onClick={() => {
                    this.context.handleCurrency(currency.symbol)
                    this.setState({activeCurr: false})
                    setTimeout(() => this.context.getTotal(), 10)
                  }}>{`${currency.symbol} ${currency.label}`}</div>)}
                </div>}
            </div>
              <img onClick={() => this.context.handleMiniCart()} className='cart' src="/Vector.svg" alt="" />
              <h1 className='navbar-qty'>{this.context.cartTotalQty}</h1>
              {this.context.toglleMiniCart && <MiniCart /> }
          </div>
      </div>
    )
  }
}


export default Navbar