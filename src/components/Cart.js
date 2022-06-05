import React, { Component } from 'react'
import { Context } from '../Context'
import CartItem from './CartItem'

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
          counter: 0
        };
      }
      rerender = () => {
        this.forceUpdate();
        this.context.getTotal()
      };
      forceUpdate = () => {
        this.setState((state) => ({
          counter: state.counter + 1
        }));
      };

      componentDidMount() {
        this.context.getTotal()
      }
    
  render() {
      const tax = (this.context.cartTotalAmount * 21 / 100).toFixed(2)
      const total = (this.context.cartTotalAmount + this.context.cartTotalAmount * 21/100).toFixed(2)
    return (
      <div>
          <h1 className='cart-name'>Cart</h1>
          <div className="cart-page">
              {this.context.cartItem.map(item => <CartItem rerender={this.rerender} item={item} key={item.id}/>)}
              <hr />
              <div key={this.state.counter} className='order'>
                <h1 className='tax'>Tax 21%: <b>{this.context.currencies[this.context.num].symbol}{tax}</b></h1>
                <h1 className='quantity'>Quantity: <b>{this.context.cartTotalQty}</b></h1>
                <h1 className='total'>Total: <b>{this.context.currencies[this.context.num].symbol}{total}</b></h1>
                <button className='order-button'>ORDER</button>
              </div>
          </div>
      </div>
    )
  }
}

Cart.contextType = Context