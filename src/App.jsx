import React, { useState } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Main from "./components/Main";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import "./App.css";
import Products from "./components/Products";
import Contact from "./components/Contact";

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 👈 Estado de login
  const [showLogin, setShowLogin] = useState(false); // 👈 Controla si se muestra el modal de login
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  // 👉 Agregar producto al carrito
  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      setShowLogin(true); // Mostrar login si no está logueado
      return;
    }
    setCart([...cart, product]);
  };

  // 👉 Eliminar producto del carrito
  const handleRemoveFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  // 👉 Abrir y cerrar modal del carrito
  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  // 👉 Mostrar contactos
  const handleShowContacts = () => setShowContacts(true);

  // 👉 Manejar login
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

  // 👉 Cerrar modal de login
  const handleCloseLogin = () => {
    setShowLogin(false);
    setError("");
  };

  return (
    <div>
      <Header />
      <Nav
        cartCount={cart.length}
        onCartClick={handleOpenCart}
        onContactClick={handleShowContacts}
      />

      <Products onAddToCart={handleAddToCart} />

      {/* 🛒 Modal del carrito */}
      {isCartOpen && (
        <div className="modaloverlay">
          <div className="modalcontent">
            <button className="btncarrito" onClick={handleCloseCart}>
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

      {/* 📞 Pantalla de Contacto */}
      {showContacts && <Contact />}

      {/* 🔐 Modal de Login */}
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
    </div>
  );
}

export default App;


