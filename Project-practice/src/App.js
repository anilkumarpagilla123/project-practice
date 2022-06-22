import "./App.css";
import "./components/header/Header.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Contactus from "./components/Contactus";
import Userdashboard from "./components/userdashboard/Userdashboard";
import Userprofile from "./components/user-profile/Userprofile";
import Cart from "./components/cart/Cart";
import Products from "./components/view-products/ViewProducts";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/userdashboard" element={<Userdashboard />}>
          <Route path="profile" element={<Userprofile />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products" element={<Products />} />
          {/* Navigating to profile when child path is empty */}
          <Route path="" element={<Navigate to="profile" replace={true} />} />
        </Route>
      </Routes>
      <div className="footer">
        <Footer />  
      </div>
    </div>
  );
}

export default App;