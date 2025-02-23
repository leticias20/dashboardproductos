import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../redux/actions/productActions';
import AddProductForm from './AddProductForm';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

 const handleDelete = async (productId) => {
   if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
     await dispatch(deleteProduct(productId));
     dispatch(fetchProducts()); // 🔄 Refresca la lista después de eliminar
   }
 };

  return (
    <div>
      <h1>Dashboard de Productos</h1>
      <AddProductForm />

      {loading && <p>Cargando productos...</p>}
      {error && <p>Error: {error}</p>}

      <ul>
        {products.map((product) => (
          <li key={product.idProducto}>
            <h3>{product.nombre}</h3>
            <p>Precio: ${product.precio}</p>
            <button onClick={() => handleDelete(product.idProducto)} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
                          Eliminar
                        </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
