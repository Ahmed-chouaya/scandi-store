import React, { Component } from "react"
import { Fetch_CATEGORIES_LINKS, Fetch_CURRENCY } from "./components/queries"
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
          cartTotalAmount: 0
        }
        this.handleCurrency = this.handleCurrency.bind(this)
        this.priceArr = this.priceArr.bind(this)
        this.handleCartItem = this.handleCartItem.bind(this)
        this.minusItem = this.minusItem.bind(this)
        this.getTotal = this.getTotal.bind(this)
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


    minusItem(item) {
        const itemIndex = this.state.cartItem.findIndex((itmm) => itmm.id === item.id);
        if (this.state.cartItem[itemIndex].cartQty >= 1) {
            this.state.cartItem[itemIndex].cartQty -= 1
        }else {
            const Items = {...item, cartQty: 1}

            this.setState(prev => ({
                ...prev,
                cartItem: [...this.state.cartItem, Items]
            }))
        }
    }
    

    handleCartItem(item) {
        const itemIndex = this.state.cartItem.findIndex((itm) => itm.id === item.id);
        if (itemIndex >= 0) {
            this.state.cartItem[itemIndex].cartQty += 1
        }else {
            const Items = {...item, cartQty: 1}

            this.setState(prev => ({
                ...prev,
                cartItem: [...this.state.cartItem, Items]
            }))
        }
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
                cartTotalAmount: this.state.cartTotalAmount
            }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export {ContextProvider, Context}