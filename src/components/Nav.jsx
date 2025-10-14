import React from "react";
import { Link } from "react-router-dom"; // 👈 Importamos Link para navegación interna

function Nav({ cartCount, onCartClick }) {
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
        {/* 🏠 Inicio */}
        <li>
          <Link
            to="/"
            style={{ color: "white", textDecoration: "none" }}
          >
            Inicio
          </Link>
        </li>

        {/* ℹ️ Acerca de (por ahora puede ser un link vacío o futura ruta) */}
        <li>
          <Link
            to="#"
            style={{ color: "white", textDecoration: "none" }}
          >
            Acerca de
          </Link>
        </li>

        {/* 📞 Contacto */}
        <li>
          <Link
            to="/contacto"
            style={{ color: "white", textDecoration: "none" }}
          >
            Contacto
          </Link>
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

