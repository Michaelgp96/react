// App.jsx
import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

function App() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [items, setItems] = useState([]);

  // Función para crear un nuevo item en Firestore
  const agregarItem = async () => {
    try {
      await addDoc(collection(db, "items"), {
        nombre: nombre,
        descripcion: descripcion,
      });
      setNombre("");
      setDescripcion("");
      obtenerItems(); // Refresca la lista
    } catch (e) {
      console.error("Error agregando documento: ", e);
    }
  };

  // Función para obtener todos los items desde Firestore
  const obtenerItems = async () => {
    const querySnapshot = await getDocs(collection(db, "items"));
    const listaItems = [];
    querySnapshot.forEach((doc) => {
      listaItems.push({ id: doc.id, ...doc.data() });
    });
    setItems(listaItems);
  };

  // Función para actualizar un item en Firestore
  const actualizarItem = async (id, nuevoNombre, nuevaDescripcion) => {
    const itemRef = doc(db, "items", id);
    try {
      await updateDoc(itemRef, {
        nombre: nuevoNombre,
        descripcion: nuevaDescripcion,
      });
      obtenerItems(); // Refresca la lista
    } catch (e) {
      console.error("Error actualizando documento: ", e);
    }
  };

  // Función para eliminar un item de Firestore
  const eliminarItem = async (id) => {
    const itemRef = doc(db, "items", id);
    try {
      await deleteDoc(itemRef);
      obtenerItems(); // Refresca la lista
    } catch (e) {
      console.error("Error eliminando documento: ", e);
    }
  };

  // useEffect para cargar los items cuando el componente se monta
  useEffect(() => {
    obtenerItems();
  }, []);

  return (
    <div>
      <h1>Gestión de Items</h1>
      
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <button onClick={agregarItem}>Agregar Item</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.nombre}</strong>: {item.descripcion}
            <button onClick={() => actualizarItem(item.id, "Nuevo nombre", "Nueva descripción")}>Actualizar</button>
            <button onClick={() => eliminarItem(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
