import React from "react";

function Contact() {
  const contacts = [
    { name: "Juan Pérez", email: "juan@example.com", phone: "123-456-789" },
    { name: "María López", email: "maria@example.com", phone: "987-654-321" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Contactos</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {contacts.map((contact, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <strong>{contact.name}</strong> <br />
            Email: {contact.email} <br />
            Teléfono: {contact.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contact;
