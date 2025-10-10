import React, { useEffect, useState } from "react";

function Products({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar productos");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="products">
      <h2>Lista de Productos</h2>
      <div className="products-grid">
        {products.map((prod) => (
          <div key={prod.id} className="product-card">
            <img src={prod.image} alt={prod.title} width="100" />
            <h3>{prod.title}</h3>
            <p>${prod.price}</p>
            <button onClick={() => onAddToCart(prod)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;

