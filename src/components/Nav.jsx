import React from 'react';

function Nav({ cartCount }) {
  return (
    <nav style={{ backgroundColor: "#333", color: "white", padding: "10px" }}>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          justifyContent: "space-around",
          margin: 0,
          padding: 0,
          alignItems: "center"
        }}
      >
        <li>
          <a href="#" style={{ color: "white", textDecoration: "none" }}>Inicio</a>
        </li>
        <li>
          <a href="#" style={{ color: "white", textDecoration: "none" }}>Acerca de</a>
        </li>
        <li>
          <a href="#" style={{ color: "white", textDecoration: "none" }}>Contacto</a>
        </li>
        <li style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          🛒
          {cartCount > 0 && (
            <span
              style={{
                background: "red",
                borderRadius: "50%",
                padding: "2px 8px",
                fontSize: "0.8rem",
                fontWeight: "bold",
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
