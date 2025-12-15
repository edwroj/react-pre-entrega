import FormularioProducto from "./FormularioProducto";

const Admin =() => {
    const API = "https://6920993931e684d7bfcd9c38.mockapi.io/product";

    const agregarProducto = async (producto) => {
        try {
            const respuesta = await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(producto)
            });
            if(!respuesta.ok) throw new Error("Error al agregar producto");
            const dato = await respuesta.json();
            console.log("Producto agregado: ", dato);
            alert("Producto agregado correctamente");

        } catch(error){
                console.error(error.message);
                alert("Hubo un error al agregar producto");
            }
        };
    
        return(
            <div>
                <h1>Gestion de Productos</h1>
                <FormularioProducto onAgregar={agregarProducto} />
            </div>
        );
    };    

export default Admin;

    


