import React, {Component} from "react"
import Navbar from "./components/Navbar";
import {
  Routes,
  Route,
} from "react-router-dom";
import All from "./components/categories/All";
import Tech from "./components/categories/Tech";
import Clothes from "./components/categories/Clothes";
import Cart from "./components/Cart";
import ProductPage from "./components/ProductPage"
import { Context } from "./Context";

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
        cat:"all"
    }
}

handleCategory = (catt) => {
  this.setState({cat:catt})
}

  render() {
    return (
      <div className="App">
        <Navbar handleCategory={this.handleCategory} />
        <Routes>
          <Route path="all" element={<All handleCategory={this.handleCategory}/>} />
          <Route path="tech" element={<Tech handleCategory={this.handleCategory}/>} />
          <Route path="clothes" element={<Clothes handleCategory={this.handleCategory}/>} />
          <Route path="cart" element={<Cart />} />
          {this.context.product.map(prod => <Route key={prod.id} path={this.state.cat + "/" + prod.id} element={<ProductPage product={prod}/>} />)}
        </Routes>
      </div>
    );
  }
}

App.contextType = Context

export default App;
