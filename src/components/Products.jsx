import React, { useEffect, useState } from "react";

function Products({ products, onAddToCart, onViewDetail, onEditProduct, onDeleteProduct, isLoggedIn, user }) {

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px",
        padding: "20px",
      }}
    >
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
            src={product.imagen}
            alt={product.nombre}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
            }}
          />

          <h4>{product.nombre}</h4>
          <p>${product.precio}</p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <button
              onClick={() => onViewDetail(product)}
              className="btn btn-secondary"
              
            >
              Ver detalle
            </button>

            <button
              onClick={() => onAddToCart(product)}
              className="btn btn-secondary"
            >
              Agregar al carrito
            </button>

            {/* ✔ Botón Editar solo para admin */}
            {isLoggedIn && user.username === "admin" && (
              <>
                <button
                  onClick={() => onEditProduct(product)}
                  className="btn btn-secondary"
                >
                  Editar
                </button>

                {/* 🗑 Eliminar */}
                <button
                  onClick={() => onDeleteProduct(product.id)}
                  className="btn btn-secondary"
                >
                  Eliminar
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;

