import React, { useState } from "react";
import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import './App.css';
import Products from './components/Products';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 👉 Agregar producto al carrito
  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  // 👉 Eliminar producto del carrito
  const handleRemoveFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  // 👉 Abrir y cerrar modal del carrito
  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  return (
    <div>
      <Header />
      <Nav cartCount={cart.length} onCartClick={handleOpenCart} />
      {/* <Main /> */}
      {/* <Gallery /> */}
      <Products onAddToCart={handleAddToCart} />

      {/* 🛒 Modal del carrito */}
      {isCartOpen && (
        <div className= "modaloverlay">
          <div className="modalcontent">
            <button className="btncarrito" onClick={handleCloseCart}>✖</button>
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

      <Footer />
    </div>
  );
}

export default App;




