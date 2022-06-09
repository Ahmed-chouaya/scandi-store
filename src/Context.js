import React, { Component } from "react"
import { Fetch_CATEGORIES, Fetch_CATEGORIES_LINKS, Fetch_CURRENCY } from "./components/queries"
const Context = React.createContext()
 
class ContextProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
          cat: [],
          currencies: [],
          currency: "usd",
          num: 0,
          cartItem: [],
          cartTotalQty: 0,
          cartTotalAmount: 0,
          product: [],
          toglleMiniCart: false
        }
        this.handleCurrency = this.handleCurrency.bind(this)
        this.priceArr = this.priceArr.bind(this)
        this.handleCartItem = this.handleCartItem.bind(this)
        this.minusItem = this.minusItem.bind(this)
        this.getTotal = this.getTotal.bind(this)
        this.handleOrder = this.handleOrder.bind(this)
        this.handleMiniCart = this.handleMiniCart.bind(this)
    }

    handleMiniCart() {
        this.setState(prev => ({
            ...prev,
            toglleMiniCart: !prev.toglleMiniCart
        }))
      }

    handleOrder() {
        this.setState(prev => ({
            ...prev,
            cartItem: [],
            cartTotalQty: 0,
            cartTotalAmount: 0,
            toglleMiniCart: false
        }))
    }

    
    
    minusItem(item) {
        const itemIndex = this.state.cartItem.findIndex((itmm) => itmm.id === item.id);
        if (this.state.cartItem[itemIndex].cartQty >= 1) {
            this.state.cartItem[itemIndex].cartQty -= 1
        }
        this.getTotal()
    }
    
    
    handleCartItem(item) {
        const Items = {...item, cartQty: 1}
        const itemIndex = this.state.cartItem.findIndex((itm) => itm.id === item.id);
        if (itemIndex >= 0) {
            this.state.cartItem[itemIndex].cartQty += 1
        }else {
            this.state.cartItem = [...this.state.cartItem, Items]
        }
        this.getTotal()
    }
    getTotal() {
        let { total, quantity } = this.state.cartItem.reduce((cartTotal, cartItems) => {
            const { prices, cartQty } = cartItems;
            const itemTotal = prices[this.state.num].amount * cartQty;

            cartTotal.total += itemTotal
            cartTotal.quantity += cartQty

            return cartTotal
        },
        {
            total: 0,
            quantity: 0,
        }) 
        this.setState(prev => ({
            ...prev,
            cartTotalQty: quantity,
            cartTotalAmount: total
        }))
    }

    priceArr(cur) {
       switch(cur) {
            case "USD":
                this.setState(prev => ({...prev,num:0}))
            break;
            case "GBP":
                this.setState(prev => ({...prev,num:1}))
            break;
            case "AUD":
                this.setState(prev => ({...prev,num:2}))
            break;
            case "JPY":
                this.setState(prev => ({...prev,num:3}))
            break;
            case "RUB":
                this.setState(prev => ({...prev,num:4}))
            break;
            default:
                this.setState(prev => ({...prev,num:0}))
       }
      }

    handleCurrency(e) {
        this.priceArr(e.target.value)
        this.setState(prev => ({
            ...prev,
            currency: e.target.value
        }))
      }
          
    
      componentDidMount() {
        Fetch_CATEGORIES_LINKS
        .then(r => this.setState(prev => ({
            ...prev,
            cat:r.data.categories
        })))
        Fetch_CURRENCY
        .then(r => this.setState(prev => ({
            ...prev,
            currencies: r.data.currencies
        })))
        Fetch_CATEGORIES("all")
        .then(res => this.setState(prev => ({
        ...prev,
        product : res.data.category.products
        })))
      }

    render(){
        return(
            <Context.Provider value={{
                cat: this.state.cat,
                currencies: this.state.currencies,
                handleCurrency: this.handleCurrency,
                currency: this.state.currency,
                num: this.state.num,
                handleCartItem: this.handleCartItem,
                cartItem: this.state.cartItem,
                minusItem: this.minusItem,
                getTotal: this.getTotal,
                cartTotalQty: this.state.cartTotalQty,
                cartTotalAmount: this.state.cartTotalAmount,
                product: this.state.product,
                handleOrder: this.handleOrder,
                toglleMiniCart: this.state.toglleMiniCart,
                handleMiniCart: this.handleMiniCart
            }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export {ContextProvider, Context}