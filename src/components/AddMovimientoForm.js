import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMovimiento, fetchMovimientos } from '../redux/actions/movimientoActions';
import { fetchProducts } from '../redux/actions/productActions'; // importa fetchProducts


const AddMovimientoForm = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products); // <-- obtén productos del store
  const [nuevoMovimiento, setNuevoMovimiento] = useState({
    id_producto: '',
    tipo: '',
    fecha: '',
    cantidad: ''
  });

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

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
    <form className="add-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '3px', width: '1000px' }}>
   <select
        name="id_producto"
        value={nuevoMovimiento.id_producto}
        onChange={handleChange}
        required
      >
        <option value="">Selecciona producto</option>
        {products.map((product) => (
          <option key={product.idProducto} value={product.idProducto}>
            {product.nombre}
          </option>
        ))}
      </select>
      <select
      name="tipo"
      value={nuevoMovimiento.tipo}
      onChange={handleChange}
      required
>
      <option value="">Selecciona tipo</option>
      <option value="entrada">Entrada</option>
      <option value="salida">Salida</option>
      </select>
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