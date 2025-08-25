import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMovimiento, fetchMovimientos } from '../redux/actions/movimientoActions';

const AddMovimientoForm = () => {
  const dispatch = useDispatch();
  const [nuevoMovimiento, setNuevoMovimiento] = useState({
    id_producto: '',
    tipo: '',
    fecha: '',
    cantidad: ''
  });

  const handleChange = (e) => {
    setNuevoMovimiento({
      ...nuevoMovimiento,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addMovimiento(nuevoMovimiento));
    setNuevoMovimiento({ id_producto: '', tipo: '', fecha: '', cantidad: '' });
    dispatch(fetchMovimientos());
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
      <input
        type="text"
        name="id_producto"
        placeholder="ID Producto"
        value={nuevoMovimiento.id_producto}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="tipo"
        placeholder="Tipo"
        value={nuevoMovimiento.tipo}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="fecha"
        placeholder="Fecha"
        value={nuevoMovimiento.fecha}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="cantidad"
        placeholder="Cantidad"
        value={nuevoMovimiento.cantidad}
        onChange={handleChange}
        required
      />
      <button type="submit">Agregar Movimiento</button>
    </form>
  );
};

export default AddMovimientoForm;