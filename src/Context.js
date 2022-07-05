import React, { Component } from "react"
import {Fetch_CATEGORIES, Fetch_CATEGORIES_LINKS, Fetch_CURRENCY } from "./components/queries"
const Context = React.createContext()
 
class ContextProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
          cat: [],
          currencies: [],
          currency: "",
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
        this.handleProductPDP = this.handleProductPDP.bind(this)  
        this.closeMiniCart = this.closeMiniCart.bind(this)
        this.plusItem = this.plusItem.bind(this)
        this.fastAddToCart = this.fastAddToCart.bind(this)
    }


    handleMiniCart() {
        this.setState(prev => ({
            ...prev,
            toglleMiniCart: !prev.toglleMiniCart
        }))
      }

      closeMiniCart() {
        this.setState(prev => ({
            ...prev,
            toglleMiniCart: false
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

   handleProductPDP(prod) {
        const itemIndex = this.state.product.findIndex((itmm) => itmm.id === prod.id);
        const pro = this.state.product
        if(itemIndex < 0) {
            pro.push(prod)
        this.setState(prev => ({
            ...prev,
            product: pro
        }))
      }
    }

    
    
    minusItem(item) {
        const itemIndex = this.state.cartItem.findIndex((itmm) => itmm === item);
        if (this.state.cartItem[itemIndex].cartQty >= 0) {
            let items = this.state.cartItem
            items[itemIndex].cartQty -= 1
            this.setState(prev => ({
                ...prev,
                cartItem: items
            }))
        }
        this.getTotal()
    }

    plusItem(item) {
        const itemIndex = this.state.cartItem.findIndex((itmm) => itmm === item);
        if (this.state.cartItem[itemIndex].cartQty >= 1) {
            let items = this.state.cartItem
            items[itemIndex].cartQty += 1
            this.setState(prev => ({
                ...prev,
                cartItem: items
            }))
        }
        this.getTotal()
    }

        
    handleAttPDP(attri, item) {
        const itemIndex = this.state.product.findIndex((itm) => itm.id === item.id);
            let prod = this.state.product
            prod[itemIndex].attr = attri
            this.setState(prev => ({
            ...prev,
            product: prod
            }))
        this.forceUpdate()
        this.getTotal()
    }

    fastAddToCart(item) {
        const itemIndex = this.state.cartItem.findIndex((itm) => itm.id === item.id);
        if (itemIndex >= 0) {
            let items = this.state.cartItem
            items[itemIndex].cartQty += 1
            this.setState(prev => ({
                ...prev,
                cartItem: items
            }))
        }else {
            const Items = {...item, cartQty: 1}
            /*this.setState(prev => ({
                ...prev,
                cartItem: [...prev.cartItem, Items]
            }))*/
            this.state.cartItem.push(Items)
        }
        this.getTotal()
    }
    
    handleAtt(attri, item) {
        const itemIndex = this.state.cartItem.findIndex((itm) => itm === item);
        if(itemIndex >= 0) {
            let items = this.state.cartItem
            items[itemIndex].attr = attri
            this.setState(prev => ({
                ...prev,
                cartItem: items
            }))
        }
        this.forceUpdate()
    }
    
    handleCartItem(item) {
        const itemIndex = this.state.cartItem.findIndex((itm) => itm.attr === item.attr);
        if (itemIndex >= 0) {
            let items = this.state.cartItem
            items[itemIndex].cartQty += 1
            this.setState(prev => ({
                ...prev,
                cartItem: items
            }))
        }else if(itemIndex < 0 && Object.keys(item.attr).length===item.attributes.length ){
            const Items = {...item, cartQty: 1}
            /*this.setState(prev => ({
                ...prev,
                cartItem: [...prev.cartItem, Items]
            }))*/
            this.state.cartItem.push(Items)
        }else {
            alert("please choose an attribute")
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
       this.state.currencies.map(curr => {
        if(cur === curr.symbol) {
            this.setState(prev => ({...prev, num:this.state.currencies.indexOf(curr)}))
         }
         return console.log("currency changed")
       })
      }

    handleCurrency(e) {
        this.priceArr(e)
        this.setState(prev => ({
            ...prev,
            currency: e
        }))
        this.getTotal()
      }
    
    
      componentDidMount() {
        Fetch_CATEGORIES_LINKS
        .then(r => {
            this.setState(prev => ({
                ...prev,
                cat:r.data.categories
            }))
            Fetch_CATEGORIES(r.data.categories[0].name)
            .then(pro => this.handlePro(pro.data.category.products))
        })
        Fetch_CURRENCY
        .then(r => this.setState(prev => ({
            ...prev,
            currencies: r.data.currencies,
            currency: r.data.currencies[0].symbol
        })))
      }

      handlePro(prod) {
        let arr = []
        prod.map(pro => {
          arr.push({...pro, attr:{}})
          return arr
        })
        this.setState(prev => ({
          ...prev,
          product: arr
        }))
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
                handleAttPDP: this.handleAttPDP,
                handleProductPDP: this.handleProductPDP,
                closeMiniCart: this.closeMiniCart,
                plusItem: this.plusItem,
                handlePDPproduct: this.handlePDPproduct,
                fastAddToCart: this.fastAddToCart
            }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export {ContextProvider, Context}