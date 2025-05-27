import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct, updateProduct } from '../redux/actions/productActions';
import AddProductForm from './AddProductForm';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  // Estado para edición
  const [editingProduct, setEditingProduct] = useState(null);
  const [editNombre, setEditNombre] = useState('');
  const [editPrecio, setEditPrecio] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (productId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      await dispatch(deleteProduct(productId));
      dispatch(fetchProducts());
    }
  };

  // Iniciar edición
  const handleEditClick = (product) => {
    setEditingProduct(product.idProducto);
    setEditNombre(product.nombre);
    setEditPrecio(product.precio);
  };

  // Guardar cambios
  const handleEditSave = async (e) => {
    e.preventDefault();
    await dispatch(updateProduct(editingProduct, { nombre: editNombre, precio: editPrecio }));
    setEditingProduct(null);
    dispatch(fetchProducts());
  };

  // Cancelar edición
  const handleEditCancel = () => {
    setEditingProduct(null);
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
            {editingProduct === product.idProducto ? (
              <form onSubmit={handleEditSave} style={{ display: 'inline' }}>
                <input
                  type="text"
                  value={editNombre}
                  onChange={(e) => setEditNombre(e.target.value)}
                  required
                />
                <input
                  type="number"
                  value={editPrecio}
                  onChange={(e) => setEditPrecio(e.target.value)}
                  required
                />
                <button type="submit">Guardar</button>
                <button type="button" onClick={handleEditCancel}>Cancelar</button>
              </form>
            ) : (
              <>
                <h3>{product.nombre}</h3>
                <p>Precio: ${product.precio}</p>
                <button onClick={() => handleEditClick(product)} style={{ marginRight: '10px' }}>
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.idProducto)}
                  style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
                >
                  Eliminar
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
