import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/actions/productActions';

const AddProductForm = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    nombre: '',
    precio: '',
    categoria: '',
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(product));
    setProduct({ nombre: '', precio: '', categoria: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
      <input type="text" name="nombre" placeholder="Nombre del producto" value={product.nombre} onChange={handleChange} required />
      <input type="number" name="precio" placeholder="Precio" value={product.precio} onChange={handleChange} required />
      <input type="text" name="categoria" placeholder="Categoría" value={product.categoria} onChange={handleChange} required />
      <button type="submit">Agregar Producto</button>
    </form>
  );
};

export default AddProductForm;
