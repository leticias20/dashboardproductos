import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchProductById, deleteProduct, updateProduct } from '../redux/actions/productActions';
import AddProductForm from './AddProductForm';
import HamburgerMenu from './HamburgerMenu';
import { Link } from 'react-router-dom';
import '../App.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  // Estado para edición
  const [editingProduct, setEditingProduct] = useState(null);
  const [editNombre, setEditNombre] = useState('');
  const [editPrecio, setEditPrecio] = useState('');
  const [editCantidad, setEditCantidad] = useState('');
  const [searchId, setSearchId] = useState('');

useEffect(() => {
  if (searchId.trim() === '') {
    dispatch(fetchProducts());
  } else {
    dispatch(fetchProductById(searchId));
  }
}, [dispatch, searchId]);

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
    setEditCantidad(product.cantidad);
  };

  // Guardar cambios
  const handleEditSave = async (e) => {
    e.preventDefault();
    await dispatch(updateProduct(editingProduct, { nombre: editNombre, precio: editPrecio, cantidad: editCantidad }));
    setEditingProduct(null);
    dispatch(fetchProducts());
  };

  // Cancelar edición
  const handleEditCancel = () => {
    setEditingProduct(null);
  };

   // resumen simple para estadisticas
  const totalProductos = products ? products.length : 0;
  const totalStock = products ? products.reduce((s,p) => s + Number(p.cantidad || 0), 0) : 0;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header" style={{ alignItems: 'flex-start' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <HamburgerMenu>
            <ul style={{ listStyle: 'none', padding: 8, margin: 0 }}>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/productos">Dashboard de Productos</Link></li>
              <li><Link to="/movimientos">Dashboard de Movimientos</Link></li>
            </ul>
          </HamburgerMenu>

          <div className="dashboard-title">
            <h1>Dashboard de Productos</h1>
            <span className="badge">Inventario</span>
          </div>
        </div>
       
        <div className="header-controls">
         
          <AddProductForm /> {/* mantener el formulario pequeño o convertir en modal */}
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="label">Productos</div>
          <div className="value">{totalProductos}</div>
        </div>
        <div className="stat">
          <div className="label">Stock total</div>
          <div className="value">{totalStock}</div>
        </div>
      </div>

      {loading && <p>Cargando productos...</p>}
      {error && <p style={{ color:'red' }}>Error: {error}</p>}

      <ul className="card-list">
        {products.map((product) => (
          <li key={product.idProducto} className="card">
            {editingProduct === product.idProducto ? (
              <form onSubmit={handleEditSave} className="form-inline">
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
                <input
                  type="number"
                  value={editCantidad}
                  readOnly
                />
                <div style={{ marginTop:8 }}>
                  <button className="btn btn-edit" type="submit">Guardar</button>
                  <button className="btn" type="button" onClick={handleEditCancel}>Cancelar</button>
                </div>
              </form>
            ) : (
              <>
                <h3>{product.nombre}</h3>
                <div className="meta">
                  <div className="badge">${product.precio}</div>
                  <div className="qty">Cantidad: {product.cantidad}</div>
                  {product.categoria && <div style={{ color: 'var(--muted)' }}>{product.categoria}</div>}
                </div>

                <div className="card-actions">
                  <button className="btn btn-edit" onClick={() => handleEditClick(product)}>Editar</button>
                  <button className="btn btn-delete" onClick={() => handleDelete(product.idProducto)}>Eliminar</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
