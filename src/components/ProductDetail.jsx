import React from "react";

function ProductDetail({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div className="modaloverlay">
      <div className="modalcontent">
        <button className="btncarrito" onClick={onClose}>
          ✖
        </button>

        <h2>{product.title}</h2>
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "150px", height: "150px", objectFit: "contain" }}
        />
        <p>{product.description}</p>
        <h3>${product.price}</h3>

        <button
          onClick={() => {
            onAddToCart(product);
            onClose();
          }}
          style={{
            backgroundColor: "#333",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          🛒 Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
