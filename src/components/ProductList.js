import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import AddProductForm from './AddProductForm';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Dashboard de Productos</h1>
      <AddProductForm />

      {loading && <p>Cargando productos...</p>}
      {error && <p>Error: {error}</p>}

      <ul>
        {products.map((product) => (
          <li key={product.i_producto}>
            <h3>{product.nombre}</h3>
            <p>Precio: ${product.precio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
