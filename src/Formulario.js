import React, { useState } from 'react';
import supabase  from './supabaseClient';

const Formulario = () => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imagenUrl = null;

      // Subir la imagen al bucket de Supabase Storage
      if (imagen) {
        const fileName = `${Date.now()}-${imagen.name}`;
        const { data, error } = await supabase.storage
          .from('imagenes-form') // Cambia al nombre de tu bucket
          .upload(fileName, imagen);

        if (error) {
          throw error;
        }

        // Obtener la URL pública de la imagen
        const { publicURL } = supabase.storage
          .from('imagenes-form')
          .getPublicUrl(fileName);
        imagenUrl = publicURL;
      }

      // Guardar los datos en la tabla de la base de datos
      const { error: dbError } = await supabase
        .from('VolanteoJugete2025') // Cambia al nombre de tu tabla
        .insert([
          {
            nombre,
            edad,
            imagen: imagenUrl,
          },
        ]);

      if (dbError) {
        throw dbError;
      }

      alert('Datos guardados exitosamente.');
      setNombre('');
      setEdad('');
      setImagen(null);
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      alert('Hubo un error al guardar los datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Edad:
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Imagen:
          <input type="file" onChange={handleFileChange} accept="image/*" required />
        </label>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  );
};

export default Formulario;
