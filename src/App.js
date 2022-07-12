import React, {Component} from "react"
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";


import Cart from "./components/Cart";
import ProductPage from "./components/ProductPage"
import { Context } from "./Context";
import Home from "./components/Home";
import Product from "./components/Product";

class App extends Component {  

  render() {
    return (
      <>
        <div className={this.context.toglleMiniCart ? "oppacity" : ""}/>
        <div className="App">
          <Navbar />
          <Routes >
            <Route exact path="/" element={<Home />}/>
            <Route  exact path={`/:cat`} element={<Product />}/>
            <Route path="cart" element={<Cart />} />
            <Route path="/:cat/:id" element={<ProductPage/>} />
          </Routes>
        </div>
      </>
    );
  }
}

App.contextType = Context

export default App;
