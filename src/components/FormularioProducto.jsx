import React, { useState } from 'react';

function FormularioProducto({ onAgregar }) {
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    imagen: '',
    descripcion: '',
  });

  const [errores, setErrores] = useState({});

  const manejarChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!producto.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
    }

    if (!producto.precio || parseFloat(producto.precio) <= 0) {
      nuevosErrores.precio = 'El precio debe ser mayor a 0.';
    }

    if (!producto.imagen.trim()) {
      nuevosErrores.imagen = 'La URL de la imagen es obligatoria.';
    }

    if (!producto.descripcion.trim() || producto.descripcion.length < 5) {
      nuevosErrores.descripcion = 'La descripción debe tener al menos 5 caracteres.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    onAgregar(producto);
    setProducto({ nombre: '', precio: '', imagen: '', descripcion: '' });
    setErrores({});
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Agregar Producto</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>

            {/* Nombre */}
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="nombre"
                className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
                value={producto.nombre}
                onChange={manejarChange}
              />
              {errores.nombre && (
                <div className="invalid-feedback">{errores.nombre}</div>
              )}
            </div>

            {/* Precio */}
            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input
                type="number"
                name="precio"
                className={`form-control ${errores.precio ? "is-invalid" : ""}`}
                value={producto.precio}
                onChange={manejarChange}
              />
              {errores.precio && (
                <div className="invalid-feedback">{errores.precio}</div>
              )}
            </div>

            {/* Imagen */}
            <div className="mb-3">
              <label className="form-label">URL de Imagen</label>
              <input
                type="text"
                name="imagen"
                className={`form-control ${errores.imagen ? "is-invalid" : ""}`}
                value={producto.imagen}
                onChange={manejarChange}
              />
              {errores.imagen && (
                <div className="invalid-feedback">{errores.imagen}</div>
              )}
            </div>

            {/* Descripción */}
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                name="descripcion"
                className={`form-control ${errores.descripcion ? "is-invalid" : ""}`}
                rows="3"
                value={producto.descripcion}
                onChange={manejarChange}
              />
              {errores.descripcion && (
                <div className="invalid-feedback">{errores.descripcion}</div>
              )}
            </div>

            {/* Botón */}
            <div className="text-end">
              <button type="submit" className="btn btn-success">
                Agregar Producto
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default FormularioProducto;
