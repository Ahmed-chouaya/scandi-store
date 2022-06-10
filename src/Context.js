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
        this.handleAtt = this.handleAtt.bind(this)
        this.handleAttPDP = this.handleAttPDP.bind(this)
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

    handleAttPDP(attName, value, item) {
        const itemIndex = this.state.product.findIndex((itm) => itm.id === item.id);
        if(itemIndex >= 0 && attName === "Size") {
            this.state.product[itemIndex].size = value
        }else if(itemIndex >= 0 && attName === "Color") {
            this.state.product[itemIndex].color = value
        }else if(itemIndex >= 0 && attName === "Capacity") {
            this.state.product[itemIndex].capacity = value
        }else if(itemIndex >= 0 && attName === "With USB 3 ports") {
            this.state.product[itemIndex].usb = value
        }else if(itemIndex >= 0 && attName === "Touch ID in keyboard") {
            this.state.product[itemIndex].touch = value
        }
        this.forceUpdate()
    }
    
    handleAtt(attName, value, item) {
        const itemIndex = this.state.cartItem.findIndex((itm) => itm.id === item.id);
        if(itemIndex >= 0 && attName === "Size") {
            this.state.cartItem[itemIndex].size = value
        }else if(itemIndex >= 0 && attName === "Color") {
            this.state.cartItem[itemIndex].color = value
        }else if(itemIndex >= 0 && attName === "Capacity") {
            this.state.cartItem[itemIndex].capacity = value
        }else if(itemIndex >= 0 && attName === "With USB 3 ports") {
            this.state.cartItem[itemIndex].usb = value
        }else if(itemIndex >= 0 && attName === "Touch ID in keyboard") {
            this.state.cartItem[itemIndex].touch = value
        }else if(!this.state.cartItem[itemIndex].size && itemIndex >= 0 && attName === "Size") {
            this.state.cartItem = [...this.state.cartItem, {...item, size: value}]
        }else if(!this.state.cartItem[itemIndex].color && itemIndex >= 0 && attName === "Color") {
            this.state.cartItem = [...this.state.cartItem, {...item, color: value}]
        }else if(!this.state.cartItem[itemIndex].capacity && itemIndex >= 0 && attName === "Capacity") {
            this.state.cartItem = [...this.state.cartItem, {...item, capacity: value}]
        }else if(!this.state.cartItem[itemIndex].usb && itemIndex >= 0 && attName === "With USB 3 ports") {
            this.state.cartItem = [...this.state.cartItem, {...item, usb: value}]
        }else if(!this.state.cartItem[itemIndex].touch && itemIndex >= 0 && attName === "Touch ID in keyboard") {
            this.state.cartItem = [...this.state.cartItem, {...item, touch: value}]
        }
        this.forceUpdate()
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
        this.getTotal()
        this.forceUpdate()
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
        product : this.handleProduct(res.data.category.products)
        })))

      }

      removeDuplicates(arr) {
        return arr.filter((item,
            index) => arr.indexOf(item) === index);
        }

      handleProduct(ar) {
        let arr = []
        ar.map(pro => arr.push({
          ...pro,
          size: "",
          color: "",
          capacity: "",
          usb: "",
          touch: ""
        }))
        return this.removeDuplicates(arr)
      }
    render(){
        console.log(this.state.product)
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
                handleMiniCart: this.handleMiniCart,
                handleAtt: this.handleAtt,
                handleAttPDP: this.handleAttPDP
            }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export {ContextProvider, Context}