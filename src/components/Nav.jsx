import { Link, useNavigate } from "react-router-dom";

function Nav({
  cartCount,
  onCartClick,
  isLoggedIn,
  user,
  onLogout,
  onLoginClick
}) {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    if (!isLoggedIn) {
      onLoginClick();
      return;
    }

    if (user.username !== "admin") {
      alert("Solo el administrador puede agregar productos");
      return;
    }

    navigate("/admin/nuevo-producto");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        MiTienda
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        {/* Izquierda */}
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Inicio
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/contacto">
              Contacto
            </Link>
          </li>

          {isLoggedIn && user.username === "admin" && (
            <li className="nav-item">
              <button
                className="nav-link btn btn-link text-white"
                onClick={handleAdminClick}
              >
                Agregar Producto
              </button>
            </li>
          )}
        </ul>

        {/* Derecha */}
        <ul className="navbar-nav align-items-center gap-2">
          <li className="nav-item">
            <button
              className="btn btn-outline-light position-relative"
              onClick={onCartClick}
            >
              🛒
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </button>
          </li>

          {!isLoggedIn ? (
            <li className="nav-item">
              <button
                className="btn btn-secondary"
                onClick={onLoginClick}
              >
                Login
              </button>
            </li>
          ) : (
            <li className="nav-item dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                👤 {user.username}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={onLogout}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
