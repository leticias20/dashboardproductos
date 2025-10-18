import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { addProduct } from '../redux/actions/productActions';
import { fetchCategorias } from '../redux/actions/categoriaActions';


const AddProductForm = () => {
  const dispatch = useDispatch();
  const { categorias } = useSelector((state) => state.categorias);
  const [product, setProduct] = useState({
    precio: '',
    categoria: '',
    cantidad: ''
  });

    useEffect(() => {
    dispatch(fetchCategorias());
  }, [dispatch]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(product));
    setProduct({ nombre: '', precio: '', categoria: '' });
  };

  return (
   <form className="add-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '700px' }}>
      <input type="text" name="nombre" placeholder="Nombre del producto" value={product.nombre} onChange={handleChange} required />
      <input type="number" name="precio" placeholder="Precio" value={product.precio} onChange={handleChange} required />
      <input type="number" name="cantidad" placeholder="Cantidad" value={product.cantidad} onChange={handleChange} required />
      <select
        name="categoria"
        value={product.categoria}
        onChange={handleChange}
        required
      >
        <option value="">Selecciona una categoría</option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.nombre}</option>
        ))}
      </select>
      <button type="submit">Agregar Producto</button>
    </form>
  );
};

export default AddProductForm;
