import React from "react";

function Login({ show, user, setUser, onLogin, onClose, error }) {
  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(e);
  };

  return (
    <div className="modaloverlay">
      <div className="modalcontent">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0">Iniciar sesión</h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Usuario */}
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              value={user.username}
              onChange={(e) =>
                setUser({ ...user, username: e.target.value })
              }
              required
            />
          </div>

          {/* Contraseña */}
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger py-2">{error}</div>
          )}

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-secondary">
              Ingresar
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Login;

