import { BrowserRouter as Router, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Home from "./components/Home";
import CatPage from "./components/CatPage";
import ProductContextProvider from "./contexts/PoductContext";


function App() {
  return (
    <ProductContextProvider>
      <Router>
        <Navbar />
        <br/>
        <Route path="/" exact component={Home} />
        <Route path="/cart" component={Cart} />
        <Route path="/CatPage" component={CatPage} />
      </Router>
    </ProductContextProvider>
  );
}

export default App;
