import React, {Component} from "react"
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";


import Cart from "./components/Cart";
import ProductPage from "./components/ProductPage"
import { Context } from "./Context";
import Home from "./components/Home";
import Product from "./components/Product";

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
        cat:localStorage.getItem("cat") || "",
    }
} 

  

handleCategory = (catt) => {
  localStorage.setItem("cat", catt)
  this.setState(prev => ({
    ...prev,
    cat:catt
  }))
}

  render() {
    const item = this.context.product.findIndex(item => item.id === this.context.prod.id)
    return (
      <>
        <div className={this.context.toglleMiniCart ? "oppacity" : ""}/>
        <div className="App">
          <Navbar  handleCategory={this.handleCategory} />
          <Routes >
            <Route exact path="/" element={<Home />}/>
            <Route  exact path={`/:cat`} element={<Product cat={this.state.cat}/>}/>
            <Route path="cart" element={<Cart />} />
            <Route path={`/pdp/:id`} element={<ProductPage product={this.context.product[item]}/>} />
          </Routes>
        </div>
      </>
    );
  }
}

App.contextType = Context

export default App;
