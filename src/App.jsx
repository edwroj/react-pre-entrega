import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Products from "./components/Products";
import Contact from "./components/Contact";
import ProductDetail from "./components/ProductDetail";
import FormularioProducto from "./components/FormularioProducto";
import PrivateRoute from "./components/PrivateRoute";
import Admin from "./components/Admin";
import EditProductModal from "./components/EditProductModal";
import Login from "./components/Login";

import "./App.css";



function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState([]);


  // 👉 Crear producto
  const [showCreateModal, setShowCreateModal] = useState(false);

  // 👉 Editar producto
  const [selectedProductToEdit, setSelectedProductToEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // 👉 Notificación
  const [notification, setNotification] = useState("");

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }

    setCart([...cart, product]);
  };
  
  const handleAddProductClick = () => {
  if (!isLoggedIn) {
    setShowLogin(true);           // 
    return;
  }

  // Solo admin puede crear productos
  if (user.username !== "admin") {
    showNotification("Solo el administrador puede agregar productos");
    return;
  }

  navigate("/admin/nuevo-producto");
  
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
      setError("Credenciales incorrectas.");
    }
  };

  const handleLogout = () => {
  setIsLoggedIn(false);
  setUser({ username: "", password: "" });
  setShowLogin(false);
  setShowCreateModal(false);
  setShowEditModal(false);
  showNotification("Sesión cerrada");
};



  const handleEditProduct = (product) => {
    setSelectedProductToEdit(product);
    setShowEditModal(true);
  };

  const handleSaveEditedProduct = (updated) => {
    setShowEditModal(false);
    setSelectedProductToEdit(null);
    setSelectedProduct(null);
    showNotification("Producto editado correctamente");
  };

  const handleAddNewProduct = (nuevoProducto) => {
  setProducts(prev => [...prev, nuevoProducto]); // 
  setShowCreateModal(false);
  showNotification("Producto agregado con éxito ✔");
};

const handleDeleteProduct = (id) => {
  // Confirmación simple
  if (!window.confirm("¿Eliminar este producto?")) return;

  // Eliminar de la lista local
  setProducts(prev => prev.filter(p => p.id !== id));

  // Notificación
  showNotification("Producto eliminado");
};



// Cargar productos desde la API al iniciar
useEffect(() => {
  fetch("https://6920993931e684d7bfcd9c38.mockapi.io/product")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
    })
    .catch(() => console.log("Error al cargar productos"));
}, []);



  return (
    <Router>
      <Header />

      <Nav
        cartCount={cart.length}
        onCartClick={() => setIsCartOpen(true)}
        
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout} 
        onLoginClick={() => setShowLogin(true)}
      />

      <Routes>
        <Route
          path="/"
          element={

            <Products
                  products={products}                
                  onAddToCart={handleAddToCart}
                  onViewDetail={(product) => setSelectedProduct(product)}
                  onEditProduct={handleEditProduct}
                  onDeleteProduct={handleDeleteProduct}
                  isLoggedIn={isLoggedIn}
                  user={user}
            />

          }
        />

        <Route path="/contacto" element={<Contact />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Admin />
            </PrivateRoute>
          }
        />

        <Route
           path="/admin/nuevo-producto"
           element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
          {user.username === "admin" ? (
          <FormularioProducto onAgregar={handleAddNewProduct} />
          ) : (
          <p>No tienes permisos</p>
          )}
          </PrivateRoute>
         }
        />



      </Routes>

      {/* 🛒 Carrito */}
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
                    {item.nombre} – ${item.precio}
                    <button
                      onClick={() => handleRemoveFromCart(index)}
                      style={{
                        marginLeft: "10px",
                        background: "red",
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

      {/*Detalle del producto */}

      {selectedProduct && ( 
      <ProductDetail
           product={selectedProduct}
           onClose={() => setSelectedProduct(null)}
           onAddToCart={handleAddToCart}
           onEditProduct={handleEditProduct}
           isLoggedIn={isLoggedIn}          // 
           user={user}                      // 
      />
      )}


      

      {/* Modal Editar */}
      {showEditModal && (
        <div className="modaloverlay">
          <div className="modalcontent">
            <button
              className="btncarrito"
              onClick={() => setShowEditModal(false)}
            >
              ✖
            </button>

            <FormularioProducto
              producto={selectedProductToEdit}
              onSave={handleSaveEditedProduct}
            />
          </div>
        </div>
      )}

      {/* Modal Crear Producto 
      {showCreateModal && (
        <div className="modaloverlay">
          <div className="modalcontent">
            <button
              className="btncarrito"
              onClick={() => setShowCreateModal(false)}
            >
              ✖
            </button>

            <FormularioProducto onAgregar={handleAddNewProduct} />
          </div>
        </div>
      )}
      */}  

      {/* Login 
      {showLogin && (
        <div className="modaloverlay">
          <div className="modalcontent">
            <button className="btncarrito" onClick={() => setShowLogin(false)}>
              ✖
            </button>

            <h2>Iniciar sesión</h2>

            <form onSubmit={handleLogin}>
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
        */}

      {/* 🔔 Notificación */}
      {notification && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: "#333",
            color: "white",
            padding: "12px 18px",
            borderRadius: "8px",
            fontSize: "14px",
          }}
        >
          {notification}
        </div>
      )}

      <Login
         show={showLogin}
         user={user}
         setUser={setUser}
         onLogin={handleLogin}
         onClose={() => setShowLogin(false)}
         error={error}
      />


      <Footer />
    </Router>
  );
}

export default App;

