import React, { useState, useEffect } from "react";

function EditProductModal({ product, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });

  // Cargar los datos del producto cuando abre el modal
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.nombre,
        price: product.precio,
        description: product.descripcion,
        image: product.imagen,
      });
    }
  }, [product]);

  if (!product) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave({ ...product, ...formData });
    onClose();
  };

  return (
    <div className="modaloverlay">
      <div className="modalcontent">
        <button className="btncarrito" onClick={onClose}>
          ✖
        </button>

        <h2>Editar producto</h2>

        <label>Título</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label>Precio</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />

        <label>Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />

        <label>URL de imagen</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />

        <button
          onClick={handleSave}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          💾 Guardar cambios
        </button>
      </div>
    </div>
  );
}

export default EditProductModal;
