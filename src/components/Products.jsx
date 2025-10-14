import React, { useEffect, useState } from "react";

function Products({ onAddToCart, onViewDetail }) {
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
        setError("Error al cargar los productos");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px", padding: "20px" }}>
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "10px",
            textAlign: "center",
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "100px", height: "100px", objectFit: "contain" }}
          />
          <h4>{product.title}</h4>
          <p>${product.price}</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <button
              onClick={() => onViewDetail(product)}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "6px",
                cursor: "pointer",
              }}
            >
              Ver detalle
            </button>

            <button
              onClick={() => onAddToCart(product)}
              style={{
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "6px",
                cursor: "pointer",
              }}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;


