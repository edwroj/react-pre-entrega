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

  // Función para agregar productos al carrito
  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div>
      <Header />
      <Nav />
      {/* <Main /> */}
      {/* <Gallery /> */}
      <Products onAddToCart={handleAddToCart} />

      {/* Mostrar carrito rápido */}
      <div className="cart">
        <h2>Carrito</h2>
        {cart.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.title} - ${item.price}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;

