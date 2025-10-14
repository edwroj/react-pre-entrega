import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import "./App.css";
import Products from "./components/Products";
import Contact from "./components/Contact";
import ProductDetail from "./components/ProductDetail";

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (user.username === "admin" && user.password === "1234") {
      setIsLoggedIn(true);
      setShowLogin(false);
      setError("");
    } else {
      setError("Credenciales incorrectas. Intenta nuevamente.");
    }
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
    setError("");
  };

  return (
    <Router>
      <Header />
      <Nav
        cartCount={cart.length}
        onCartClick={() => setIsCartOpen(true)}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Products
              onAddToCart={handleAddToCart}
              onViewDetail={(product) => setSelectedProduct(product)}
            />
          }
        />
        <Route path="/contacto" element={<Contact />} />
      </Routes>

      {/* 🛒 Modal del carrito */}
      {isCartOpen && (
        <div className="modaloverlay">
          <div className="modalcontent">
            <button className="btncarrito" onClick={() => setIsCartOpen(false)}>
              ✖
            </button>
            <h2>Carrito</h2>
            {cart.length === 0 ? (
              <p>Tu carrito está vacío</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {cart.map((item, index) => (
                  <li key={index} style={{ marginBottom: "10px" }}>
                    {item.title} - ${item.price}
                    <button
                      onClick={() => handleRemoveFromCart(index)}
                      style={{
                        marginLeft: "10px",
                        background: "#ff4444",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        padding: "4px 8px",
                        cursor: "pointer",
                      }}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* 📦 Detalle del producto */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* 🔐 Modal de login */}
      {showLogin && (
        <div className="modaloverlay">
          <div className="modalcontent">
            <button className="btncarrito" onClick={handleCloseLogin}>
              ✖
            </button>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin} className="login-form">
              <input
                type="text"
                placeholder="Usuario"
                value={user.username}
                onChange={(e) =>
                  setUser({ ...user, username: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={user.password}
                onChange={(e) =>
                  setUser({ ...user, password: e.target.value })
                }
              />
              <button type="submit">Ingresar</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>
      )}

      <Footer />
    </Router>
  );
}

export default App;

