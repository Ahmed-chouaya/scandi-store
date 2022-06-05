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
          <Route path="all" element={<All />} />
          <Route path="tech" element={<Tech />} />
          <Route path="clothes" element={<Clothes />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </div>
    );
  }
}

export default App;
