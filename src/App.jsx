import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import OrderHistory from "./pages/OrderHistory";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {

  return (

    <BrowserRouter>


      <Navbar />


      <Routes>
        <Route
  path="/register"
  element={<Register />}
/>
<Route
  path="/login"
  element={<Login />}
/>
        <Route
          path="/"
          element={<Home />}
        />


        <Route
          path="/products"
          element={<Products />}
        />


        <Route
          path="/product/:productName"
          element={<ProductDetails />}
        />


        <Route
          path="/cart"
          element={<Cart />}
        />


        <Route
          path="/checkout"
          element={<Checkout />}
        />

<Route
  path="/orders"
  element={<OrderHistory />}
/>
<Route
  path="/track-order"
  element={<OrderTracking />}
/>
      </Routes>


      <Footer />


    </BrowserRouter>

  );

}


export default App;