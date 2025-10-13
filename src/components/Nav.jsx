import React from "react";

function Nav({ cartCount, onCartClick, onContactClick }) {
  return (
    <nav style={{ backgroundColor: "#333", color: "white", padding: "10px" }}>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          justifyContent: "space-around",
          margin: 0,
          padding: 0,
          alignItems: "center",
        }}
      >
        <li>
          <a href="#" style={{ color: "white", textDecoration: "none" }}>
            Inicio
          </a>
        </li>
        <li>
          <a href="#" style={{ color: "white", textDecoration: "none" }}>
            Acerca de
          </a>
        </li>
        <li>
          <a href="#" style={{ color: "white", textDecoration: "none" }}
            onClick={onContactClick}>
            Contacto
          </a>
        </li>

        {/* 🛒 Icono del carrito */}
        <li
          onClick={onCartClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
            position: "relative",
          }}
          title="Ver carrito"
        >
          🛒
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-10px",
                background: "red",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "0.8rem",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {cartCount}
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
